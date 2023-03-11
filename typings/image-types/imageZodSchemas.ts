import { z } from "zod";
import {
  AdvertImagesOptions,
  appetizers_array,
  cutleries_and_plates_array,
  cutlery_type,
  drinks_array,
  fast_foods_array,
  fistDegArray,
  GraphicDesignsOptions,
  gr_des_style_array,
  ingredients_array,
  main_dish_array,
  secondDegArray,
  shape_array,
  soups_array,
  stickers_and_cliparts_categories,
  surr_env_array,
  sweets_and_desserts_array,
  tables_arr,
  thirdDegArr,
  valid_image_fields,
} from "./ImageTypes";

export const firstDegCat_schema = z.enum(fistDegArray);
export const secondDegCat_schema = z.enum(secondDegArray);
export const thirdDegCat_schema = z.enum(thirdDegArr);
export const AdvertImagesOptionsSchema = z.enum(AdvertImagesOptions);
export const GraphicDesignsOptionsSchema = z.enum(GraphicDesignsOptions);
export const soups_schema = z.enum(soups_array);
export const appetizers_schema = z.enum(appetizers_array);
export const sweets_and_desserts_schema = z.enum(sweets_and_desserts_array);
export const main_dish_schema = z.enum(main_dish_array);
export const fast_foods_schema = z.enum(fast_foods_array);
export const drinks_schema = z.enum(drinks_array);
export const cutleries_and_plates_schema = z.enum(cutleries_and_plates_array);
export const ingredients_schema = z.enum(ingredients_array);
export const tables_schema = z.enum(tables_arr);

export const stickers_and_cliparts_schema = z.enum(
  stickers_and_cliparts_categories
);
export const gr_des_style_schema = z.enum(gr_des_style_array);
export const valid_image_fields_schema = z.enum(valid_image_fields);

export const surr_env_schema = z.enum(surr_env_array);
export const cutlery_type_schema = z.enum(cutlery_type);
export const shape_schema = z.enum(shape_array);
