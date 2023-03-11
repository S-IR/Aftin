import { NextRouter } from "next/router";
import {
  FirstDegreeCategory,
  SecondDegreeCategory,
  ThirdDegreeCategory,
} from "../../../typings/image-types/ImageTypes";

export const getImageQueryParams = (
  router: NextRouter
): {
  firstDegreeCategory: FirstDegreeCategory;
  secondDegreeCategory: SecondDegreeCategory;
  thirdDegreeCategory: ThirdDegreeCategory | "no-third-category";
  queryParams: { [key: string]: string | string[] | undefined };
} => {
  const { imageCategory, ...queryParams } = router.query;
  let firstDegreeCategory: "advertisement-images" | "graphic-designs" =
    router.pathname.includes("advertisement-images")
      ? "advertisement-images"
      : "graphic-designs";
  // ignore this TS error, if it's not defined this page should not appear
  let secondDegreeCategory = imageCategory[0] as SecondDegreeCategory;
  let thirdDegreeCategory: ThirdDegreeCategory | "no-third-category" =
    imageCategory?.length > 1
      ? (imageCategory[1] as ThirdDegreeCategory)
      : "no-third-category";

  return {
    firstDegreeCategory,
    secondDegreeCategory,
    thirdDegreeCategory,
    queryParams,
  };
};
