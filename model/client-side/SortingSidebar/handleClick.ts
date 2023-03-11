import { NextRouter } from "next/router";
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
  router: NextRouter,
  isThirdDegreeCategory?: true
) => {
  if (thirdDegreeCategory) return;

  const { [`subCat`]: remove, ...queryParams } = router.query;

  const pathname = router.route.replace(
    `[subCat]`,
    router.query.subCat as string
  );

  if (modified_value === `description` || modified_value === `color`) {
    return router.replace({
      pathname,
      query: {
        ...queryParams,
        [modified_value]: value,
      },
    });
  }

  // if there is no query value for that field, you put the value in
  if (router.query[modified_value] === undefined) {
    return router.replace({
      pathname,
      query: {
        ...queryParams,
        [modified_value]: value,
      },
    });
  }
  //if he is modifying the description or color just modify it directly

  //if the value is different from the current params, concat the two strings and put ; between them
  if (!router.query[modified_value]?.includes(value)) {
    const newValue = `${router.query[modified_value]};${value}`;
    return router.replace({
      pathname,
      query: {
        ...queryParams,
        [modified_value]: newValue,
      },
    });
    // else if the value IS INCLUDED in the current params
  } else {
    //if the value is identical to the current value, remove the param
    if (router.query[modified_value] === value) {
      const { [modified_value]: remove, ...otherQueryParams } = queryParams;
      return router.replace({
        pathname,
        query: {
          ...otherQueryParams,
        },
      });
    }
    //if the value is at the start
    if (router.query[modified_value]?.startsWith(value)) {
      //replace the value and the ; at the end
      const newValue = router.query[modified_value]?.replace(`${value};`, "");
      return router.replace({
        pathname,
        query: {
          ...queryParams,
          [modified_value]: newValue,
        },
      });
    } else {
      const newValue = router.query[modified_value]?.replace(`;${value}`, "");
      return router.replace({
        pathname,
        query: {
          ...queryParams,
          [modified_value]: newValue,
        },
      });
    }
  }
};
