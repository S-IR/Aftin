import axios, { AxiosResponse } from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { ParsedUrlQuery } from "querystring";
import { db } from "../../firebase";
import {
  FirstDegreeCategory,
  GraphicDesignsOptions,
  ImgDoc,
  SecondDegreeCategory,
  ThirdDegreeCategory,
  Valid_image_fields,
} from "../../typings/image-types/ImageTypes";
import { valid_image_fields } from "../../typings/image-types/ImageTypes";
import {
  firstDegCat_schema,
  secondDegCat_schema,
  thirdDegCat_schema,
  valid_image_fields_schema,
} from "../../typings/image-types/imageZodSchemas";
import { queryType } from "../../typings/image-types/queryTypes";

const determineQuery = (
  data: ImgDoc[],
  thirdDegreeCategory: ThirdDegreeCategory,
  queries: queryType | undefined
) => {
  // get the filter names
  const filtersArray = Object.keys(queries) as unknown as Array<
    keyof queryType
  >;
  //create an intermediate array that will be modified
  let filteredData: ImgDoc[] | [] = data;
  // go through each one of the filters

  filteredData = filteredData.filter(
    (imgDoc) => imgDoc.thirdDegreeCategory === thirdDegreeCategory
  );

  if (queries === undefined) return filteredData;
  filtersArray.forEach((filter) => {
    //if the filter is a color
    if (filter === `color`) {
      // get the R G B values in this array
      const rgbQueryArr = queries.color?.split("-");
      if (!rgbQueryArr) return;
      //sort the data by
      return (filteredData = filteredData.sort((a, b) => {
        // first declare 2 variables that are meant to be the proximity of this image's colors to that of the query
        let aProximity: number = 0;
        let bProximity: number = 0;
        //for each element in the color array of that image calculate how close it is to the real value and then add it to the proximity variable
        a.color?.forEach((rgbObj) => {
          const oneColorProximity = Math.abs(
            rgbObj.r +
              rgbObj.g +
              rgbObj.b -
              parseInt(rgbQueryArr[0]) -
              parseInt(rgbQueryArr[1]) -
              parseInt(rgbQueryArr[2])
          );
          return (aProximity += oneColorProximity);
        });
        b.color?.forEach((rgbObj) => {
          const oneColorProximity = Math.abs(
            rgbObj.r +
              rgbObj.g +
              rgbObj.b -
              parseInt(rgbQueryArr[0]) -
              parseInt(rgbQueryArr[1]) -
              parseInt(rgbQueryArr[2])
          );
          return (bProximity += oneColorProximity);
        });
        //then sort them by descending order
        return aProximity - bProximity;
      }));
    }

    if (filter === `description`) {
      return (filteredData = filteredData.filter((imgDoc) =>
        imgDoc[filter].toLowerCase().includes(queries[filter].toLowerCase())
      ));
    }

    const paramsArr = queries[filter].toLowerCase().split(";");
    if (data[0][filter] === undefined || typeof data[0][filter] === `string`) {
      return (filteredData = filteredData.filter(
        (imgField) => imgField[filter] === paramsArr[0]
      ));
    } else if (Array.isArray(data[0][filter])) {
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
  console.log("fetch request came in");

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
    rowRequested: number;
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
    console.log("invalid request parameters");
    return res.status(406).send({ message: "invalid request" });
  }

  //save them in an array
  //ignore TS
  const firebaseAPIResponse = await fetch(
    `${
      process.env.NEXT_PUBLIC_server
    }/api/getFirebaseImageDocs?${new URLSearchParams({
      firstDegreeCategory,
      secondDegreeCategory,
    })}`
  );
  let docsArray: ImgDoc[] = await firebaseAPIResponse.json();
  // calculate what part of the array should be sent back
  const slicingStart = 0 + 15 * Number(rowRequested);
  const slicingEnd = 14 + 15 * Number(rowRequested);

  // if there are parameters being sent filter the docsArray an slice it
  //ignore ts
  if (
    thirdDegreeCategory !== "no-third-category" ||
    thirdDegreeCategory === undefined
  ) {
    docsArray = await determineQuery(
      docsArray,
      thirdDegreeCategory,
      queryParams as unknown as queryType
    );
  }
  const hasNextPage =
    docsArray.slice(slicingStart + 15, slicingEnd + 15).length !== 0;
  docsArray = docsArray.slice(slicingStart, slicingEnd);

  res.setHeader("Cache-Control", "s-maxage=10800");

  return res
    .status(200)
    .send({ docsArray: docsArray, hasNextPage: hasNextPage });
}
