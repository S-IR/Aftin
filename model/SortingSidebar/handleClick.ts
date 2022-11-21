import { NextRouter } from "next/router"

export const handleOptionClick = (
  value: string,
  modified_value: string,
  router: NextRouter,) => {
  const { [`subCat`]: remove, ...queryParams} = router.query
  const pathname = router.route.replace(`[subCat]`, router.query.subCat as string)
  return router.replace({
    pathname,
    query: {
      ...queryParams,
      [modified_value]: value
    }
  })
}