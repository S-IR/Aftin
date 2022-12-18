import { type } from "os"
import { Color } from "react-color"
import { HTMLHexColor } from "../typings"
import { artwork_styles_array, banner_type_array, drinks_array, fast_foods_array, gr_des_style_array, ingredients_array, main_dish_array, material_type, shape_array, size_array, soups_array, stickers_and_cliparts_categories, surr_env_array, sweets_and_desserts_array, tier_array, utensils_and_plates_array } from "./ImageTypes"

export type queryType = {
  paid?: typeof tier_array
  size?: typeof size_array | typeof banner_type_array
  description?: string
  color?: `${number}-${number}-${number}`
  color_scheme? : string
  surr_env?: typeof surr_env_array
  dish_type?: typeof main_dish_array,
  soup?: typeof soups_array,
  food_type?: typeof fast_foods_array | typeof sweets_and_desserts_array,
  drink_type?: typeof drinks_array,
  utensil_type?: typeof utensils_and_plates_array,
  material?: typeof material_type,
  ingredients?: typeof ingredients_array, 
  banner_type?: typeof banner_type_array, 
  style: typeof gr_des_style_array, 
  artwork_style?: typeof artwork_styles_array, 
  stickers_category?: typeof stickers_and_cliparts_categories, 
  shape?: typeof shape_array
}
export type queryField =   
`paid`|`size`|`description`|`color_scheme`|`surr_env`|`dish_type`|`soup`|`food_type`|`drink_type`|`utensil_type`|`material`|`ingredients`|`banner_type`|`style`|`artwork_style`|`sticker_category`|`shape` | `fast_food_type` | `sweet_type` | `menu_size`|`appetizer_type`