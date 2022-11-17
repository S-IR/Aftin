//this function determines the input fields that are going to be needed when uploading an image
import { appetizers_array, artwork_styles_array, banner_type_array, drinks_array, fast_foods_array, fruits_array, gr_des_style_array, ingredients_array, LARGE_CATEGORY_OF_IMG, logo_type_array, main_dish_array, material_type, menu_size_array, shape_array, size_array, SMALL_CATEGORY_OF_IMG, soups_array, spices_array, stickers_and_cliparts_categories, surr_env_array, sweets_and_desserts_array, tier_array, utensils_and_plates_array, vegetables_array, } from "../../typings/image-types/ImageTypes";

export const determineInputs = (
  LARGE_CATEGORY_OF_IMG: LARGE_CATEGORY_OF_IMG,
  SMALL_CATEGORY_OF_IMG: SMALL_CATEGORY_OF_IMG) => {
  //this array will be modified with each input that will need to be added
  const Array = []
  Array.push({color_scheme: ``}, {description: ``}, {paid: tier_array})
  if (SMALL_CATEGORY_OF_IMG !== `logos` && SMALL_CATEGORY_OF_IMG !== `banners`) Array.push({ size: size_array })

  switch (LARGE_CATEGORY_OF_IMG) {
    case `graphic-designs`:
      Array.push({ style: gr_des_style_array })
      break;
    case `stock-images`:
      Array.push({ surrounding_environment: surr_env_array })
      break
  }
  //check for each type of category and push the necessary objects 
  switch (SMALL_CATEGORY_OF_IMG) {
    case `appetizers`: 
    Array.push({dish_type: appetizers_array})
    break;
    case `soups`:
      Array.push({soup: soups_array})
      break;
    case `main-dishes`:
      Array.push({ dish_type: main_dish_array })
      break;
    case `sweets-and-desserts`:
      Array.push({ food_type: sweets_and_desserts_array })
      break;
    case `fast-foods`:
      Array.push({ food_type: fast_foods_array })
      break;
    case `drinks`:
      Array.push({ drink_type: drinks_array })
      break;
    case `utensils-and-plates`:
      Array.push({ utensil_type: utensils_and_plates_array })
      Array.push({ material: material_type })
      break;
    case `ingredients`: Array.push({ingredients:ingredients_array})
      break;
    case `menus`:
      Array.push({ size: menu_size_array })
      break;
    case `banners`:
      Array.push({ banner_type: banner_type_array })
      break;
    case `logos`:
      Array.push({ logo_type: logo_type_array })
      break;
    case `artworks`:
      Array.push({ artwork_style: artwork_styles_array })
      break;
    case `stickers-and-cliparts`:
      Array.push({ stickers_category: stickers_and_cliparts_categories })
      break;
    case `brochures`:
      Array.push({ shape: shape_array })
      break;
    case `flyers`:
      Array.push({ shape: shape_array })
      break;
    case `other`:
      break
  }

  return Array
}
