import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { ParsedUrlQuery } from "querystring";
import { db } from "../../../../firebase";
import {
  FirstDegreeCategory,
  GraphicDesignsOptions,
  ImgDoc,
  SecondDegreeCategory,
  ThirdDegreeCategory,
  Valid_image_fields,
} from "../../../../typings/image-types/ImageTypes";
import { valid_image_fields } from "../../../../typings/image-types/ImageTypes";
import {
  firstDegCat_schema,
  secondDegCat_schema,
  thirdDegCat_schema,
  valid_image_fields_schema,
} from "../../../../typings/image-types/imageZodSchemas";
import { queryType } from "../../../../typings/image-types/queryTypes";
import admin, { getUserTier } from "../../../../firebaseAdmin";
import { LoginStatus } from "../../../../typings/typings";

// Utility function to iterate over object keys and values with proper types
function typedEntries<T>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
/**
 * Filters the data sent by Firebase depending on the user's URL request or
 * @param data firebase data document
 * @param thirdDegreeCategory the name of the third degree category
 * @param queries the queries that are to be done
 * @returns
 */
const filterData = (
  data: ImgDoc[],
  thirdDegreeCategory: ThirdDegreeCategory,
  queries: queryType | undefined
): ImgDoc[] => {
  const filteredData = data.filter((imgDoc) => {
    if (queries === undefined) return true;
    if (imgDoc.thirdDegreeCategory !== thirdDegreeCategory) return false;

    // go through each one of the filters
    for (const [filter, filterValue] of typedEntries(queries)) {
      if (filter === "color") continue;
      if (imgDoc[filter] === undefined) return false;
      if (filterValue === undefined) continue;
      //if the filter is a color

      if (filter === `description`) {
        return imgDoc[filter].toLowerCase().includes(filterValue.toLowerCase());
      }
      //ignore ts
      const paramsArr = filterValue.toLowerCase().split(";");
      if (typeof data[0][filter] === `string`) {
        //if the query params is just a string, meaning it's just one, then find the imgDoc that exactly matches that query param
        return imgDoc[filter] === paramsArr[0];
      } else if (Array.isArray(data[0][filter])) {
        //else if it's an array, check that every element of that paramsArr to be included in the imgField doc
        paramsArr.every((arrElem: any) => imgDoc[filter].includes(arrElem));
      }
    }
  });
  if (queries?.color === undefined) {
    return filteredData;
  } else {
    {
      // get the R G B values in this array
      const rgbQueryArr = queries.color?.split("-");
      if (!rgbQueryArr) return filteredData;
      //sort the data by
      return filteredData.sort((a, b) => {
        // first declare 2 variables that are meant to represent the proximity of this image's colors to that of the query
        let aProximity: number = 0;
        let bProximity: number = 0;
        //for each element in the color array of that image calculate how close it is to the real value and then add it to the proximity variable
        a.color?.forEach((rgbObj) => {
          const oneColorProximity =
            Math.abs(rgbObj.r - parseInt(rgbQueryArr[0])) +
            Math.abs(rgbObj.g - parseInt(rgbQueryArr[1])) +
            Math.abs(rgbObj.b - parseInt(rgbQueryArr[2]));
          return (aProximity += oneColorProximity);
        });
        b.color?.forEach((rgbObj) => {
          const oneColorProximity =
            Math.abs(rgbObj.r - parseInt(rgbQueryArr[0])) +
            Math.abs(rgbObj.g - parseInt(rgbQueryArr[1])) +
            Math.abs(rgbObj.b - parseInt(rgbQueryArr[2]));
          return (bProximity += oneColorProximity);
        });
        //then sort them by descending order
        return aProximity - bProximity;
      });
    }
  }
};

const changeUrlBasedOnTier = (
  docsArray: ImgDoc[],
  tier: LoginStatus
): ImgDoc[] => {
  if (tier === "silver") {
    docsArray.forEach((doc) => {
      if (doc.tier === "silver") {
        doc.url = doc.real_url;
        const { [`real_url`]: _, ...newObj } = doc;
        return newObj;
      } else {
        return doc;
      }
    });
  }
  if (tier === "gold") {
    docsArray.forEach((doc) => {
      if (doc.tier === "silver" || doc.tier === "gold") {
        doc.url = doc.real_url;
        const { [`real_url`]: _, ...newObj } = doc;
        return newObj;
      } else {
        return doc;
      }
    });
  }
  return docsArray;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("api reached");

  // get all of the image docs of that subcategory
  const {
    firstDegreeCategory,
    secondDegreeCategory,
    thirdDegreeCategory,
    rowRequested,
    ...queryParams
  } = req.query as unknown as {
    firstDegreeCategory: FirstDegreeCategory | undefined;
    secondDegreeCategory: SecondDegreeCategory | undefined;
    thirdDegreeCategory: ThirdDegreeCategory | undefined | "no-third-category";
    //row requested is a number in the form of a string due to it being a req param
    rowRequested: string;
    queryParams: ParsedUrlQuery | undefined;
  };
  if (
    firstDegreeCategory === undefined ||
    secondDegreeCategory === undefined ||
    !firstDegCat_schema.safeParse(firstDegreeCategory) ||
    !secondDegCat_schema.safeParse(secondDegCat_schema) ||
    (thirdDegreeCategory !== undefined &&
      !thirdDegCat_schema.safeParse(thirdDegreeCategory)) ||
    rowRequested === undefined ||
    (Object.keys(queryParams).length !== 0 &&
      !Object.keys(queryParams).every((queryParam) =>
        valid_image_fields_schema.safeParse(queryParam)
      ))
  ) {
    // I do wonder if status code 422 is correct. Seems like stack overflow agrees in terms of upvote numbers
    res.status(422).send({ message: "invalid request" });
    return;
  }

  const session = req.cookies.session;
  let loginStatus: LoginStatus = "bronze";
  if (session) {
    const decodedClaims = await admin.auth().verifySessionCookie(session);
    loginStatus = decodedClaims.tier;
  }
  console.log("loginStatus from commercial images", loginStatus);

  let firebaseRouteRes = await fetch(
    `${
      process.env.NEXT_PUBLIC_server
    }/api/products/images/firebase-commercial-images?${new URLSearchParams({
      firstDegreeCategory: firstDegreeCategory as string,
      secondDegreeCategory: secondDegreeCategory as string,
    })}`
  );
  let docsArray: ImgDoc[] = await firebaseRouteRes.json();

  docsArray = changeUrlBasedOnTier(docsArray, loginStatus);

  // calculate what part of the array should be sent back
  const slicingStart = 0 + 15 * Number(rowRequested);
  const slicingEnd = 14 + 15 * Number(rowRequested);

  // if there are parameters being sent filter the docsArray an slice it
  if (
    thirdDegreeCategory !== "no-third-category" &&
    thirdDegreeCategory !== undefined
  ) {
    docsArray = filterData(
      docsArray,
      thirdDegreeCategory,
      queryParams as unknown as queryType | undefined
    );
  }
  const hasNextPage =
    docsArray.slice(slicingStart + 15, slicingEnd + 15).length !== 0;
  docsArray = docsArray.slice(slicingStart, slicingEnd);

  res.setHeader("Cache-Control", "s-maxage=10800");

  return res.status(200).send({ docsArray, hasNextPage });
}
