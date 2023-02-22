//this function determines the input fields that are going to be needed when uploading an image
import {
  appetizers_array,
  artwork_styles_array,
  banner_type_array,
  drinks_array,
  fast_foods_array,
  fruits_array,
  gr_des_style_array,
  ingredients_array,
  LARGE_CATEGORY_OF_IMG,
  main_dish_array,
  utensil_type,
  menu_size_array,
  shape_array,
  size_array,
  SMALL_CATEGORY_OF_IMG,
  soups_array,
  spices_array,
  stickers_and_cliparts_categories,
  surr_env_array,
  sweets_and_desserts_array,
  tier_array,
  utensils_and_plates_array,
  vegetables_array,
} from "../../../typings/image-types/ImageTypes";
/**
 * Determines the categories that can be chosen when an image is uploaded
 * @param {LARGE_CATEGORY_OF_IMG}LARGE_CATEGORY_OF_IMG The large category of the image
 * @param {SMALL_CATEGORY_OF_IMG}SMALL_CATEGORY_OF_IMG The small category of the image
 * @returns Array of objects with the possible categories
 */
export const determineInputs = (
  LARGE_CATEGORY_OF_IMG: LARGE_CATEGORY_OF_IMG,
  SMALL_CATEGORY_OF_IMG: SMALL_CATEGORY_OF_IMG
) => {
  //this array will be modified with each input that will need to be added
  const Array = [];
  Array.push({ color_scheme: `` }, { description: `` }, { tier: tier_array });
  if (SMALL_CATEGORY_OF_IMG !== `banners`) Array.push({ size: size_array });

  switch (LARGE_CATEGORY_OF_IMG) {
    case `graphic-designs`:
      Array.push({ style: gr_des_style_array });
      break;
    case `advertisement-images`:
      Array.push({ surr_env: surr_env_array });
      break;
  }
  //check for each type of category and push the necessary objects
  switch (SMALL_CATEGORY_OF_IMG) {
    case `appetizers`:
      Array.push({ appetizer_type: appetizers_array });
      break;
    case `soups`:
      Array.push({ soup: soups_array });
      break;
    case `main-dishes`:
      Array.push({ dish_type: main_dish_array });
      break;
    case `sweets-and-desserts`:
      Array.push({ sweet_type: sweets_and_desserts_array });
      break;
    case `fast-foods`:
      Array.push({ fast_food_type: fast_foods_array });
      break;
    case `drinks`:
      Array.push({ drink_type: drinks_array });
      break;
    case `cutleries-and-plates`:
      Array.push({ utensil_type: utensils_and_plates_array });
      Array.push({ material: utensil_type });
      break;
    case `ingredients`:
      Array.push({ ingredients: ingredients_array });
      break;
    case `menus`:
      Array.push({ menu_size: menu_size_array });
      break;
    case `banners`:
      //TODO
      break;
    case `business-cards`:
      Array.push({ artwork_style: artwork_styles_array });
      break;
    case `stickers-and-cliparts`:
      Array.push({ sticker_category: stickers_and_cliparts_categories });
      break;
    case `brochures`:
      Array.push({ shape: shape_array });
      break;
    case `flyers`:
      Array.push({ shape: shape_array });
      break;
    case `other`:
      break;
  }

  return Array;
};
