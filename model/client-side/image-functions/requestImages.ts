import { QrCode } from "@mui/icons-material";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import {
  FirstDegreeCategory,
  secondDegArray,
  SecondDegreeCategory,
  ThirdDegreeCategory,
  valid_image_fields,
} from "../../../typings/image-types/ImageTypes";
import {
  secondDegCat_schema,
  valid_image_fields_schema,
} from "../../../typings/image-types/imageZodSchemas";

/**
 * Does a request to the backend for the specified images
 * @param {'number'} rowRequested used to calculate the part of the array that's sent back. The array that's sent is 15 elements. if it's 0 then 0-14 will be sent, if it's 1 then 15-29 etc.
 * @param {'graphic designs | advertisement-images'} category the category of images
 * @param {SecondDegreeCategory} subCat the subcategory of the images
 * @param {ParsedUrlQuery} queryData The query parameters that are sent down
 * @returns {ImgDoc[] | string }
 */
export const requestImageDocs = async (
  rowRequested: number = 0,
  firstDegreeCategory: FirstDegreeCategory,
  secondDegreeCategory: SecondDegreeCategory,
  thirdDegreeCategory: ThirdDegreeCategory | "no-third-category",
  queryData: ParsedUrlQuery
): Promise<null | any> => {
  //check if the queried data is one that can actually be found in the image docs, thus being valid
  if (!secondDegCat_schema.safeParse(secondDegreeCategory).success) return null;

  const isValidQuery = Object.keys(queryData).every((param) => {
    return valid_image_fields_schema.safeParse(param).success;
  });
  if (!isValidQuery) return null;
  const res: Response = await fetch(
    `${
      process.env.NEXT_PUBLIC_server
    }/api/products/images/commercial-images?${new URLSearchParams({
      firstDegreeCategory,
      secondDegreeCategory,
      thirdDegreeCategory,
      rowRequested: rowRequested === null ? `0` : rowRequested.toString(),
      ...queryData,
    })}`
  );
  return res.json();
};
