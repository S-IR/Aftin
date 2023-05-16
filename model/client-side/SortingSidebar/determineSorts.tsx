import {
  appetizerOptions,
  cutleriesOptions,
  dishOptions,
  drinkOptions,
  fastFoodOptions,
  grDesStyleOptions,
  ingredientsOptions,
  soupOptions,
  stickerOptions,
  sweetOptions,
} from "../../../constants/SortingSidebar";
import { tableOptions } from "../../../constants/SortingSidebar/table_type";
import {
  SecondDegreeCategory,
  nestedImageFields,
} from "../../../typings/image-types/ImageTypes";
import { AdvertImagesOptionsSchema } from "../../../typings/image-types/imageZodSchemas";
import {
  SortNestedOptionType,
  SortOptionType,
} from "../../../typings/image-types/sortTypes";
/**
 * Determines which sorting options should be displayed
 * @param secondDegCat the secondDegCategory that you want to determine which sorting parameters it should have
 * @returns
 */
export const determineSorts = (
  secondDegCat: SecondDegreeCategory
): {
  thirdDegreeCategory: {
    title: string;
    optionsArray: SortOptionType[];
    icon: JSX.Element;
  };
  size: boolean;
  color_scheme: boolean;
  menu_size: boolean;
  surr_env: boolean;
  material: boolean;
  banner_type: boolean;
  shape: boolean;
} => {
  let [
    size,
    color_scheme,
    menu_size,
    surr_env,
    material,
    style,
    banner_type,
    business_card_style,
    logo_type,
    shape,
  ] = [false, false, false, false, false, false, false, false, false, false];
  let thirdDegreeCategory:
    | {
        title: string;
        optionsArray: SortOptionType[] | SortNestedOptionType[];
        icon: JSX.Element;
      }
    | {
        title: nestedImageFields;
        optionsArray: SortOptionType[] | SortNestedOptionType[];
        icon: JSX.Element;
      };
  if (AdvertImagesOptionsSchema.safeParse(secondDegCat).success) {
    surr_env = true;
    size = true;
  }
  switch (secondDegCat) {
    case `appetizers`:
      thirdDegreeCategory = {
        title: "Appetizer Type",
        optionsArray: appetizerOptions,
        icon: (
          <img
            src={"/SortingSidebar/appetizer_type/appetizer_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for appetizer type"}
          />
        ),
      };
      break;
    case `soups`:
      thirdDegreeCategory = {
        title: "Soup Type",
        optionsArray: soupOptions,
        icon: (
          <img
            src={"/SortingSidebar/soup_type/soup_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for soup type"}
          />
        ),
      };
      break;
    case `main-dishes`:
      thirdDegreeCategory = {
        title: "Dish Type",
        optionsArray: dishOptions,
        icon: (
          <img
            src={"/SortingSidebar/main_dish_type/main_dish_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for main dish type"}
          />
        ),
      };
      break;
    case `sweets-and-desserts`:
      thirdDegreeCategory = {
        title: "Sweet Type",
        optionsArray: sweetOptions,
        icon: (
          <img
            src={"/SortingSidebar/sweet_type/sweet_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for sweet type"}
          />
        ),
      };
      break;
    case `fast-foods`:
      thirdDegreeCategory = {
        title: "Fast Food Type",
        optionsArray: fastFoodOptions,
        icon: (
          <img
            src={"/SortingSidebar/fast_food_type/fast_food_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for fast food type"}
          />
        ),
      };
      break;
    case `drinks`:
      thirdDegreeCategory = {
        title: "Drink Type",
        optionsArray: drinkOptions,
        icon: (
          <img
            src={"/SortingSidebar/drink_type/drink_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for drink type"}
          />
        ),
      };
      break;
    case `cutleries-and-plates`:
      thirdDegreeCategory = {
        title: "Cutlery Type",
        optionsArray: cutleriesOptions,
        icon: (
          <img
            src={"/SortingSidebar/cutlery_type/cutlery_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for cutlery type"}
          />
        ),
      };
      material = true;
      break;
    case `ingredients`:
      thirdDegreeCategory = {
        title: "Ingredient Type",
        optionsArray: ingredientsOptions,
        icon: (
          <img
            src={"/SortingSidebar/ingredients/ingredient_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for ingredient type"}
          />
        ),
      };
      break;
    case `tables`:
      thirdDegreeCategory = {
        title: "Table Type",
        optionsArray: tableOptions,
        icon: (
          <img
            src={"/SortingSidebar/table_type/table_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for table type"}
          />
        ),
      };
      break;

    case `menus`:
      thirdDegreeCategory = {
        title: "Menu Style",
        optionsArray: grDesStyleOptions,
        icon: (
          <img
            src={"/SortingSidebar/gr_des_styles/menu_style_icon.svg"}
            width={32}
            height={32}
            alt={"icon for menu style"}
          />
        ),
      };
      menu_size = true;
      break;
    case `banners`:
      thirdDegreeCategory = {
        title: "Banner Style",
        optionsArray: grDesStyleOptions,
        icon: (
          <img
            src={"/SortingSidebar/gr_des_styles/banner_style_icon.svg"}
            width={32}
            height={32}
            alt={"icon for banner style"}
          />
        ),
      };
      banner_type = true;
      break;
    case `stickers-and-cliparts`:
      thirdDegreeCategory = {
        title: "Clipart type",
        optionsArray: stickerOptions,
        icon: (
          <img
            src={"/SortingSidebar/sticker_category/sticker_type_icon.svg"}
            width={32}
            height={32}
            alt={"icon for sticker style"}
          />
        ),
      };
      break;
    case `brochures`:
      thirdDegreeCategory = {
        title: "Brochure Type",
        optionsArray: grDesStyleOptions,
        icon: (
          <img
            src={"/SortingSidebar/gr_des_styles/brochure_style_icon.svg"}
            width={32}
            height={32}
            alt={"icon for brochure style"}
          />
        ),
      };
      shape = true;
      break;
    case `flyers`:
      thirdDegreeCategory = {
        title: "Flyer Type",
        optionsArray: grDesStyleOptions,
        icon: (
          <img
            src={"/SortingSidebar/gr_des_styles/flyer_style_icon.svg"}
            width={32}
            height={32}
            alt={"icon for flyer style"}
          />
        ),
      };
      shape = true;
      break;
  }
  const sortOptions = {
    thirdDegreeCategory,
    size,
    color_scheme,
    menu_size,
    surr_env,
    material,
    style,
    banner_type,
    business_card_style,
    logo_type,
    shape,
  };
  return sortOptions;
};
