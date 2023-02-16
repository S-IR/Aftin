import { QrCode } from "@mui/icons-material";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import {
  subCats_array,
  valid_image_fields,
} from "../../../typings/image-types/ImageTypes";

/**
 * Does a request to the backend for the specified images
 * @param {'number'} rowRequested used to calculate the part of the array that's sent back. The array that's sent is 15 elements. if it's 0 then 0-14 will be sent, if it's 1 then 15-29 etc.
 * @param {'graphic designs | advertisement-images'} category the category of images
 * @param {SMALL_CATEGORY_OF_IMG} subCat the subcategory of the images
 * @param {ParsedUrlQuery} queryData The query parameters that are sent down
 * @returns {ImgDoc[] | string }
 */
export const requestImageDocs = async (
  rowRequested: number = 0,
  category: `graphic-designs` | `advertisement-images` | null,
  subCat: string | undefined,
  queryData: ParsedUrlQuery
) => {
  //check if the queried data is one that can actually be found in the image docs, thus being valid
  if (!category) return;
  if (!subCat || !subCats_array.includes(subCat)) return null;
  const isValidQuery = Object.keys(queryData).every((param) => {
    return valid_image_fields.includes(param);
  });

  if (isValidQuery) {
    const res: Response = await fetch(
      `${
        process.env.NEXT_PUBLIC_server
      }/api/requestImagesAPI?${new URLSearchParams({
        category,
        subCat,
        rowRequested: rowRequested.toString(),
        ...queryData,
      })}`
    );
    return res.json();
  } else {
    return null;
  }
};
