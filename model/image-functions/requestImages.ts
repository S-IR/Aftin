import axios from "axios"
import { ParsedUrlQuery } from "querystring"
import { GrahicDesignsOptions, GraphicDesignType, ImgFields, StockImagesOptions, StockImageType, subCats_array, valid_image_fields } from "../../typings/image-types/ImageTypes"

/**
 * Does a request to the backend for the specified images
 * @param {ParsedUrlQuery} queryData The query parameters that are sent down
 * @returns {ImgFields[] | string } 
 */
export const requestImageDocs = async (queryData: ParsedUrlQuery) => {
  const {subCat, ...queryParams} = queryData
  console.log(queryData)

  //check if the queried data is one that can actually be found in the image docs, thus being valid
  if(!subCat || !subCats_array.includes(subCat)) return null

  const isValidQuery = Object.keys(queryParams).every((param) => {
    return valid_image_fields.includes(param)
  })
  // if it is do the request, if not don't bother
  if(isValidQuery) {
    const res = await axios({
      method: `get`,
      url: `/api/getImages`,
      headers: {},
      params:{
        ...queryData
      }
    })
    console.log(res)
    
    return res.data.docsArray as ImgFields[]
  } else {
    return null
  }

}