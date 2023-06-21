import { type } from "os";
import { Color } from "react-color";
import { HTMLHexColor } from "../typings";
import {
  banner_type_array,
  cutlery_type,
  drinks_array,
  fast_foods_array,
  gr_des_style_array,
  ImgDoc,
  ingredients_array,
  main_dish_array,
  shape_array,
  size_array,
  soups_array,
  stickers_and_cliparts_categories,
  surr_env_array,
  sweets_and_desserts_array,
  ThirdDegreeCategory,
  tier_array,
} from "./ImageTypes";

export type queryType = {
  tier?: typeof tier_array;
  size?: typeof size_array | typeof banner_type_array;
  description?: string;
  color?: `${number}-${number}-${number}`;
  color_scheme?: string;
  surr_env?: typeof surr_env_array;
  thirdDegreeCategory: ThirdDegreeCategory;
  material?: typeof cutlery_type;
  banner_type?: typeof banner_type_array;
  shape?: typeof shape_array;
};
export type queryField = keyof ImgDoc;
