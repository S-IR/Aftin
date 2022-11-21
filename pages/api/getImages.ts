import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { GrahicDesignsOptions, ImgFields, StockImagesOptions } from "../../typings/image-types/ImageTypes";

const determineQuery = () => {

}
export default async function handler (req: NextApiRequest, res: NextApiResponse){


  // get the subCategory of the image . If the image is not of a category listed you reject the request
  console.log(`REQUEST PARAMS:`,req.query);
  
  const {subCat, ...queryParams} = req.query
  const subCatRef = collection(db, `/graphic-designs/${subCat}/Images`)
  let querySnapshot
  const banner_type = req.query.banner_type
  if (Object.keys(queryParams).length === 0) {
    querySnapshot = await getDocs(subCatRef)
  } else {
    const q = query(subCatRef, where("banner_type", "array-contains", banner_type))
    querySnapshot = await getDocs(q)
  }
  let docsArray: ImgFields[] = []
  querySnapshot.docs.forEach((doc) =>
    docsArray.push({ ...doc.data() as ImgFields })
  )
  return res.status(200).json({docsArray})
}