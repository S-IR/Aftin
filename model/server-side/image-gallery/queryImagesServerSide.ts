import { IncomingMessage } from "http";
import { ParsedUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { ParsedUrlQuery } from "querystring";
import { dehydrate, QueryClient } from "react-query";
import {
  FirstDegreeCategory,
  ImgDoc,
  SecondDegreeCategory,
  ThirdDegreeCategory,
} from "../../../typings/image-types/ImageTypes";
import { requestImageDocs } from "../../client-side/image-functions/requestImages";
import { LoginStatus } from "../../../typings/typings";
import * as v8Profiler from "v8-profiler-next";

/**
 * Requests images server side for the website gallery component
 * @param url The url the request is coming from
 * @param params URl params
 * @param idToken the firebase ID token for the user
 *
 * @returns dehydrated state of query client
 */
export const queryImagesServerSide = async (
  url: IncomingMessage[`url`],
  params: ParsedUrlQuery
) => {
  //sets the react query client object
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
      },
    },
  });

  // gets the first, second and third degree categories
  if (url === undefined) return undefined;
  let firstDegreeCategory: FirstDegreeCategory = url.includes(
    "advertisement-images"
  )
    ? "advertisement-images"
    : "graphic-designs";

  const { imageCategory, ...queryParams } = params;
  if (imageCategory === undefined) return undefined;
  const secondDegreeCategory = imageCategory[0] as SecondDegreeCategory;

  const thirdDegreeCategory =
    Array.isArray(imageCategory) && imageCategory?.length > 1
      ? (imageCategory[1] as ThirdDegreeCategory)
      : "no-third-category";

  const cacheName =
    thirdDegreeCategory === "no-third-category"
      ? secondDegreeCategory
      : `${secondDegreeCategory}/${thirdDegreeCategory}`;
  await queryClient.prefetchInfiniteQuery<
    { docsArray: ImgDoc[]; hasNextPage: boolean },
    Error
  >(
    cacheName,
    ({ pageParam = 0 }) =>
      requestImageDocs(
        pageParam,
        firstDegreeCategory,
        secondDegreeCategory,
        thirdDegreeCategory,
        queryParams
      ),
    {
      getNextPageParam: (lastRow, allRows) => {
        if (lastRow && lastRow.hasNextPage) {
          return allRows.length;
        }
      },
      structuralSharing: true,
    }
  );
  queryClient.setQueryData(`${secondDegreeCategory}`, (data: any) => ({
    ...data,
    pageParams: [],
  }));
  return JSON.parse(JSON.stringify(dehydrate(queryClient)));
};
