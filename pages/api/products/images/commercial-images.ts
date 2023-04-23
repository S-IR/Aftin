import axios, { AxiosResponse } from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
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
) => {
  //create an intermediate array that will be modified
  let filteredData: ImgDoc[] | [] = data;
  //filter based on the third degree category
  filteredData = filteredData.filter(
    (imgDoc) => imgDoc.thirdDegreeCategory === thirdDegreeCategory
  );

  //if there are no more queries stop
  if (queries === undefined) return filteredData;

  // get the filter names
  const filtersArray = Object.keys(queries) as unknown as Array<
    keyof queryType
  >;
  // go through each one of the filters
  filtersArray.forEach((filter) => {
    //if the filter is a color
    if (filter === `color`) {
      // get the R G B values in this array
      const rgbQueryArr = queries.color?.split("-");
      if (!rgbQueryArr) return;
      //sort the data by
      return (filteredData = filteredData.sort((a, b) => {
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
      }));
    }

    //ignore ts
    if (filter === `description`) {
      return (filteredData = filteredData.filter((imgDoc) =>
        imgDoc[filter].toLowerCase().includes(queries[filter].toLowerCase())
      ));
    }
    //ignore ts
    const paramsArr = queries[filter].toLowerCase().split(";");
    if (data[0][filter] === undefined || typeof data[0][filter] === `string`) {
      //if the query params is just a string, meaning it's just one, then find the imgDocs d that exactly matches that query params
      return (filteredData = filteredData.filter(
        (imgField) => imgField[filter] === paramsArr[0]
      ));
    } else if (Array.isArray(data[0][filter])) {
      //else if it's an array, check that every element of that paramsArr to be included in the imgField doc
      return (filteredData = filteredData.filter((imgFied) =>
        paramsArr.every((arrElem) => imgFied[filter].includes(arrElem))
      ));
    }

    return filteredData;
  });
  return filteredData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    return res.status(422).send({ message: "invalid request" });
  }

  //save them in an array
  const firebaseAPIResponse = await fetch(
    `${
      process.env.NEXT_PUBLIC_server
    }/api//products/images/firebase-commercial-images?${new URLSearchParams({
      firstDegreeCategory: firstDegreeCategory as string,
      secondDegreeCategory: secondDegreeCategory as string,
    })}`
  );

  let docsArray: ImgDoc[] = await firebaseAPIResponse.json();

  // calculate what part of the array should be sent back
  const slicingStart = 0 + 15 * Number(rowRequested);
  const slicingEnd = 14 + 15 * Number(rowRequested);

  // if there are parameters being sent filter the docsArray an slice it
  if (
    thirdDegreeCategory !== "no-third-category" &&
    thirdDegreeCategory !== undefined
  ) {
    console.log("thirdDegreeCategory is something");
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

  console.log("docsArray");

  return res.status(200).send({ docsArray, hasNextPage });
}
