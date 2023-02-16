//This API requests all of the  images of a specific category and subcategory from the firebase docs without any query params. It is meant to be cached.

import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import {
  GrahicDesignsOptions,
  ImgDoc,
  Valid_image_fields,
} from "../../typings/image-types/ImageTypes";
import { valid_image_fields } from "../../typings/image-types/ImageTypes";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category, subCat } = req.query;
  if (!category || !subCat)
    return res.status(406).send(`not acceptable criteria`);
  const subCatRef = collection(db, `/${category}/${subCat}/Images`);
  let querySnapshot;
  querySnapshot = await getDocs(subCatRef);

  let docsArray: ImgDoc[] = [];
  querySnapshot.docs.forEach((doc) =>
    docsArray.push({ ...(doc.data() as ImgDoc) })
  );

  // the response will be cached for 7200 seconds

  return res
    .setHeader("Cache-Control", "public, max-age=7200, s-maxage=7200")
    .status(200)
    .send(docsArray);
}
