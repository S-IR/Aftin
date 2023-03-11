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

/**
 * Requests images for the website gallery component
 * @param url The url the request is coming from
 * @param params URl params
 * @returns
 */
export const queryImagesServerSide = async (
  url: IncomingMessage[`url`],
  params: ParsedUrlQuery
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
      },
    },
  });

  let firstDegreeCategory: FirstDegreeCategory = url.includes(
    "advertisement-images"
  )
    ? "advertisement-images"
    : "graphic-designs";
  const { imageCategory, ...queryParams } = params;
  const secondDegreeCategory = params.imageCategory[0] as SecondDegreeCategory;
  const thirdDegreeCategory =
    params.imageCategory?.length > 0
      ? (params.imageCategory[1] as ThirdDegreeCategory)
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
  queryClient.setQueryData(`${secondDegreeCategory}`, (data) => ({
    ...data,
    pageParams: [],
  }));
  return JSON.parse(JSON.stringify(dehydrate(queryClient)));
};
