import { Router, useRouter } from "next/router";
/**
 * Changes the URL query parameter to your desired value
 * @param {string} modified_value the query parameter you want to modify
 * @param {string} value the value you want to modify it with
 * @returns {Router.replace}
 */
export default function useNextQuery(modified_value: string, value: string) {
  const router = useRouter()
  const pathname = router.route.replace(`[subCat]`, router.query.subCat as string)
  return router.replace({
    pathname,
    query: {
      ...router.query,
      [modified_value]: value
    }
  })
}