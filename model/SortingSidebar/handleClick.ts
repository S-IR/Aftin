import { NextRouter } from "next/router"
/**
 * Handles the changing of a sort option
 * @param value the value that you want the sort to change into
 * @param modified_value the sort category that you want to change 
 * @param router react router. Used to change the query string
 * @returns 
 */
export const handleOptionClick = (
  value: string,
  modified_value: string,
  router: NextRouter,) => {
  const { [`subCat`]: remove, ...queryParams } = router.query
  const pathname = router.route.replace(`[subCat]`, router.query.subCat as string)
  console.log(`value`, value, `colorType`, typeof(value));
  
  if (modified_value === `description` || modified_value === `color`) {    
    return router.replace({
      pathname,
      query: {
        ...queryParams,
        [modified_value]: value
      }
    })
  }

  // if there is no query value for that field, you put the value in
  if (router.query[modified_value] === undefined) {
    return router.replace({
      pathname,
      query: {
        ...queryParams,
        [modified_value]: value
      }
    })
  }
  //if he is modifying the description or color just modify it directly


  //if there's 1 query value for that field
  if (!Array.isArray(router.query[modified_value])) {
    // and value is the same as the query value 
    if (router.query[modified_value] === value) {
      // remove that query
      const { [modified_value]: remove, ...otherQueryParams } = queryParams
      return router.replace({
        pathname,
        query: {
          ...otherQueryParams,
        }
      })
      //and the value is NOT the same as the query value
    } else if (router.query[modified_value] !== value) {
      //make an array and put it as the query params
      const paramArrayOfTwo = [router.query[modified_value] as string, value]
      return router.replace({
        pathname,
        query: {
          ...queryParams,
          [modified_value]: paramArrayOfTwo
        }
      })
    }
  } else if (Array.isArray(router.query[modified_value])) {
    //if there are more than 1 query params
    let paramsArray = router.query[modified_value] as string[]
    // and value IS one of the query params
    if (paramsArray?.includes(value)) {
      //remove that value from the array
      const valueIndex = paramsArray.indexOf(value)
      paramsArray.splice(valueIndex, 1)
      return router.replace({
        pathname,
        query: {
          ...queryParams,
          [modified_value]: paramsArray
        }
      })
    } else if (!paramsArray?.includes(value)) {
      paramsArray.push(value)
      return router.replace({
        pathname,
        query: {
          ...queryParams,
          [modified_value]: paramsArray
        }
      })
    }
  }


}

