import { grDesStyleOptions } from "../../../constants/SortingSidebar";
import {
  GrahicDesignsOptions,
  SMALL_CATEGORY_OF_IMG,
  AdvertImagesOptions,
} from "../../../typings/image-types/ImageTypes";
/**
 * Determines which sort options should be displayed
 * @param subCat the subcategory that you want to determine which sorting parameters it should have
 * @returns
 */
export const determineSorts = (
  subCat: SMALL_CATEGORY_OF_IMG
): {
  paid: boolean;
  size: boolean;
  color_scheme: boolean;
  menu_size: boolean;
  appetizer_type: boolean;
  surr_env: boolean;
  dish_type: boolean;
  soup: boolean;
  fast_food_type: boolean;
  sweet_type: boolean;
  drink_type: boolean;
  utensil_type: boolean;
  material: boolean;
  ingredients: boolean;
  style: boolean;
  banner_type: boolean;
  artwork_style: boolean;
  sticker_category: boolean;
  logo_type: boolean;
  shape: boolean;
} => {
  let [
    paid,
    size,
    color_scheme,
    menu_size,
    surr_env,
    appetizer_type,
    dish_type,
    soup,
    fast_food_type,
    sweet_type,
    drink_type,
    utensil_type,
    material,
    ingredients,
    style,
    banner_type,
    artwork_style,
    sticker_category,
    logo_type,
    shape,
  ] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  color_scheme = paid = true;
  if (AdvertImagesOptions.includes(subCat)) surr_env = true;
  if (GrahicDesignsOptions.includes(subCat)) style = true;

  switch (subCat) {
    case `appetizers`:
      appetizer_type = true;
      break;
    case `soups`:
      soup = true;
      break;
    case `main-dishes`:
      dish_type = true;
      break;
    case `sweets-and-desserts`:
      sweet_type = true;
      break;
    case `fast-foods`:
      fast_food_type = true;
      break;
    case `drinks`:
      drink_type = true;
      break;
    case `utensils-and-plates`:
      utensil_type = true;
      material = true;
      break;
    case `ingredients`:
      ingredients = true;
      break;
    case `menus`:
      menu_size = true;
      break;
    case `banners`:
      banner_type = true;
      break;
    case `artworks`:
      artwork_style = true;
      break;
    case `stickers-and-cliparts`:
      sticker_category = true;
      break;
    case `brochures`:
      shape = true;
      break;
    case `flyers`:
      shape = true;
      break;
    case `other`:
      break;
  }
  const sortOptions = {
    paid,
    size,
    color_scheme,
    menu_size,
    appetizer_type,
    surr_env,
    dish_type,
    soup,
    fast_food_type,
    sweet_type,
    drink_type,
    utensil_type,
    material,
    ingredients,
    style,
    banner_type,
    artwork_style,
    sticker_category,
    logo_type,
    shape,
  };
  return sortOptions;
};
