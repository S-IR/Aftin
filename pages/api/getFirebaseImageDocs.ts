//This API requests all of the  images of a specific category and subcategory from the firebase docs without any query params. It is meant to be cached.

import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import {
  GraphicDesignsOptions,
  ImgDoc,
  Valid_image_fields,
} from "../../typings/image-types/ImageTypes";
import { valid_image_fields } from "../../typings/image-types/ImageTypes";
import {
  firstDegCat_schema,
  secondDegCat_schema,
} from "../../typings/image-types/imageZodSchemas";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstDegreeCategory, secondDegreeCategory } = req.query as {
    firstDegreeCategory: string;
    secondDegreeCategory: string;
  };
  if (
    !firstDegCat_schema.safeParse(firstDegreeCategory) ||
    !secondDegCat_schema.safeParse(secondDegreeCategory)
  ) {
    console.log("invalid params");
    return res.status(406).send(`not acceptable criteria`);
  }

  const subCatRef = collection(
    db,
    `/${firstDegreeCategory}/${secondDegreeCategory}/Images`
  );
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
