import axios, { AxiosResponse } from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { GrahicDesignsOptions, ImgDoc, StockImagesOptions, Valid_image_fields } from "../../typings/image-types/ImageTypes";
import { valid_image_fields } from "../../typings/image-types/ImageTypes"
import { queryType } from "../../typings/image-types/queryTypes";

const determineQuery = (data: ImgDoc[], queries: queryType) => {
  // get the filter names
  const filtersArray = Object.keys(queries) as unknown as Array<keyof queryType>
  //create an intermediate array that will be modified
  let filteredData: ImgDoc[] | [] = []
  // go through each one of the filters

  filtersArray.forEach((filter: keyof queryType) => {
    //if the filter is a color
    if (filter === `color`) {
      // get the R G B values in this array
      const rgbQueryArr = queries.color?.split('-')
      if(!rgbQueryArr) return
      //sort the data by
      return filteredData = data.sort((a, b) => {
        // first declare 2 variables that are meant to be the proximity of this image's colors to that of the query
        let aProximity: number = 0
        let bProximity: number = 0
        //for each element in the color array of that image calculate how close it is to the real value and then add it to the proximity variable
        a.color?.forEach((rgbObj) => {
          const oneColorProximity = Math.abs(rgbObj.r + rgbObj.g + rgbObj.b - parseInt(rgbQueryArr[0]) - parseInt(rgbQueryArr[1]) - parseInt(rgbQueryArr[2]))
          return aProximity += oneColorProximity
        })
        b.color?.forEach((rgbObj) => {
          const oneColorProximity = Math.abs(rgbObj.r + rgbObj.g + rgbObj.b - parseInt(rgbQueryArr[0]) - parseInt(rgbQueryArr[1]) - parseInt(rgbQueryArr[2]))
          return bProximity += oneColorProximity
        })
        //then sort them by descending order
        return aProximity - bProximity
      })
    }

    if (filter === `description`) {
      return filteredData = data.filter(imgField => imgField[filter].toLowerCase().includes(queries[filter].toLowerCase()))
    }

    // FILTER = STRING  & DATA OF FILTER = STRING , compare strings
    if (typeof (queries[filter]) === `string` && typeof (data[0][filter]) === `string`) {
      return filteredData = data.filter(imgField => imgField[filter] === queries[filter])
    }

    // if FILTER = ARRAY & DATA OF FILTER = STRING, check if the filter array includes the DATA string
    if (Array.isArray(queries[filter]) && typeof (data[0][filter] === `string`)) {
      return filteredData = data.filter(imgField => queries[filter]?.includes(imgField[filter]))
    }

    // if FILTER = STRING & DATA OF FILTER = ARRAY, check if data array INCLUDES the filter string
    if (typeof (queries[filter]) === `string` && Array.isArray(data[0][filter])) {
      filteredData = data.filter(imgField => imgField[filter]?.includes(queries[filter]))
      return filteredData

    }

    // if BOTH ARE ARRAYS, check if the data array is a subset of the filter array
    return filteredData = data.filter(imgField => imgField[filter].every((val: string) => queries[filter]?.includes(val)))
  })
  return filteredData
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  // get all of the image docs of that subcategory
  const { category, subCat, rowRequested, ...queryParams } = req.query
  
  //save them in an array
  const firebaseAPIResponse = await fetch(`${process.env.NEXT_PUBLIC_server}/api/getFirebaseImageDocs?${new URLSearchParams({
    category: category as string,
    subCat: subCat as string,
  })}`
  )
  let docsArray: ImgDoc[] = await firebaseAPIResponse.json()
  // calculate what part of the array should be sent back
  const slicingStart = 0+ 15* Number(rowRequested)
  const slicingEnd = 14+ 15* Number(rowRequested)
  
  // if there are parameters being sent filter the docsArray an slice it
  if (Object.keys(queryParams).length !== 0) {
   docsArray = await determineQuery(docsArray, queryParams as unknown as queryType)
  }
  const hasNextPage = docsArray.slice(slicingStart + 15, slicingEnd+ 15).length !== 0
  docsArray = docsArray.slice(slicingStart, slicingEnd)

  
  res.setHeader('Cache-Control', 's-maxage=10800');

  return res.status(200).send({docsArray : docsArray, hasNextPage: hasNextPage})

}