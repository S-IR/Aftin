//this function determines the input fields that are going to be needed when uploading an image
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

import { z } from "zod";
import {
  appetizers_array,
  drinks_array,
  fast_foods_array,
  gr_des_style_array,
  ingredients_array,
  FirstDegreeCategory,
  main_dish_array,
  cutlery_type,
  menu_size_array,
  shape_array,
  size_array,
  SecondDegreeCategory,
  soups_array,
  stickers_and_cliparts_categories,
  surr_env_array,
  sweets_and_desserts_array,
  tier_array,
  cutleries_and_plates_array,
  business_card_styles_array,
  thirdDegArr,
} from "../../../typings/image-types/ImageTypes";
import { thirdDegCat_schema } from "../../../typings/image-types/imageZodSchemas";

export const uploadImageSchema = z.object({
  files: z.any().refine((files) => files?.length > 0, "Image is required."),
  tier: z.enum(tier_array),
  thirdDegreeCategory: thirdDegCat_schema,
  material: z.enum(cutlery_type).optional(),
  menu_size: z.enum(menu_size_array).optional(),
  shape: z.enum(shape_array).optional(),
  real_files: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
  lim_edition_expiration_date: z
    .preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date().optional())
    .optional(),
});
export type UploadImgInputs = z.infer<typeof uploadImageSchema>;

/**
 * Determines the categories that can be chosen when an image is uploaded
 * @param {FirstDegreeCategory}FirstDegreeCategory The large category of the image
 * @param {SecondDegreeCategory}SecondDegreeCategory The small category of the image
 * @returns Array of objects with the possible categories
 */
export const determineInputs = (
  FirstDegreeCategory: FirstDegreeCategory,
  SecondDegreeCategory: SecondDegreeCategory
): [string | object] => {
  //this array will be modified with each input that will need to be added
  const Array = [];
  Array.push({ color_scheme: `` }, { description: `` }, { tier: tier_array });

  switch (FirstDegreeCategory) {
    case `graphic-designs`:
      // I have no clue what this error is
      if (SecondDegreeCategory === "stickers-and-cliparts")
        return Array.push({
          thirdDegreeCategory: stickers_and_cliparts_categories,
        });
      Array.push({ thirdDegreeCategory: gr_des_style_array });
      break;
  }
  //check for each type of category and push the necessary objects
  switch (SecondDegreeCategory) {
    case `appetizers`:
      Array.push({ thirdDegreeCategory: appetizers_array });
      break;
    case `soups`:
      Array.push({ thirdDegreeCategory: soups_array });
      break;
    case `main-dishes`:
      Array.push({ thirdDegreeCategory: main_dish_array });
      break;
    case `sweets-and-desserts`:
      Array.push({ thirdDegreeCategory: sweets_and_desserts_array });
      break;
    case `fast-foods`:
      Array.push({ thirdDegreeCategory: fast_foods_array });
      break;
    case `drinks`:
      Array.push({ thirdDegreeCategory: drinks_array });
      break;
    case `cutleries-and-plates`:
      Array.push({ thirdDegreeCategory: cutleries_and_plates_array });
      break;
    case `ingredients`:
      Array.push({ thirdDegreeCategory: ingredients_array });
      break;
    case `menus`:
      break;
    case `banners`:
      //TODO
      break;
  }

  return Array as [string | object];
};
