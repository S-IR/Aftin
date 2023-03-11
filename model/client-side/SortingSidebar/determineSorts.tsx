import {
  Cake,
  DinnerDining,
  Fastfood,
  LocalBar,
  RamenDining,
  Restaurant,
  SoupKitchen,
  StickyNote2,
  TableBar,
  Tapas,
  Wallpaper,
} from "@mui/icons-material";
import Table from "@mui/material/Table";
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
  GraphicDesignsOptions,
  SecondDegreeCategory,
  AdvertImagesOptions,
  thirdDegArr,
  appetizers_array,
  ThirdDegreeCategory,
  main_dish_array,
  soups_array,
  fast_foods_array,
  sweets_and_desserts_array,
  drinks_array,
  cutleries_and_plates_array,
  ingredients_array,
  gr_des_style_array,
  thirdDegCompositionArr,
  nestedImageFields,
} from "../../../typings/image-types/ImageTypes";
import { AdvertImagesOptionsSchema } from "../../../typings/image-types/imageZodSchemas";
import { SortOptionType } from "../../../typings/image-types/sortTypes";
/**
 * Determines which sort options should be displayed
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
  business_card_style: boolean;
  logo_type: boolean;
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
        optionsArray: SortOptionType[];
        icon: JSX.Element;
      }
    | {
        title: nestedImageFields;
        optionsArray: SortOptionType[];
        icon: JSX.Element;
      };
  if (AdvertImagesOptionsSchema.safeParse(secondDegCat).success) {
    surr_env = true;
    size = true;
  }
  switch (secondDegCat) {
    case `appetizers`:
      thirdDegreeCategory = {
        title: "Dish Type",
        optionsArray: appetizerOptions,
        icon: <Tapas style={{ color: `gold` }} />,
      };
      break;
    case `soups`:
      thirdDegreeCategory = {
        title: "Soup Type",
        optionsArray: soupOptions,
        icon: <SoupKitchen style={{ color: `gold` }} />,
      };
      break;
    case `main-dishes`:
      thirdDegreeCategory = {
        title: "Dish Type",
        optionsArray: dishOptions,
        icon: <DinnerDining style={{ color: `gold` }} />,
      };
      break;
    case `sweets-and-desserts`:
      thirdDegreeCategory = {
        title: "Sweet Type",
        optionsArray: sweetOptions,
        icon: <Cake style={{ color: `gold` }} />,
      };
      break;
    case `fast-foods`:
      thirdDegreeCategory = {
        title: "Fast Food Type",
        optionsArray: fastFoodOptions,
        icon: <Fastfood style={{ color: `gold` }} />,
      };
      break;
    case `drinks`:
      thirdDegreeCategory = {
        title: "Drink Type",
        optionsArray: drinkOptions,
        icon: <LocalBar style={{ color: `gold` }} />,
      };
      break;
    case `cutleries-and-plates`:
      thirdDegreeCategory = {
        title: "Cutlery Type",
        optionsArray: cutleriesOptions,
        icon: <Restaurant style={{ color: `gold` }} />,
      };
      material = true;
      break;
    case `ingredients`:
      thirdDegreeCategory = {
        title: "Ingredient Type",
        optionsArray: ingredientsOptions,
        icon: <RamenDining style={{ color: `gold` }} />,
      };
      break;
    case `tables`:
      thirdDegreeCategory = {
        title: "Table Type",
        optionsArray: tableOptions,
        icon: <TableBar style={{ color: `gold` }} />,
      };
      break;

    case `menus`:
      thirdDegreeCategory = {
        title: "Menu Style",
        optionsArray: grDesStyleOptions,
        icon: <Restaurant style={{ color: `gold` }} />,
      };
      menu_size = true;
      break;
    case `banners`:
      thirdDegreeCategory = {
        title: "Banner Style",
        optionsArray: grDesStyleOptions,
        icon: <Restaurant style={{ color: `gold` }} />,
      };
      banner_type = true;
      break;
    case `business-cards`:
      thirdDegreeCategory = {
        title: "Business Card Type",
        optionsArray: grDesStyleOptions,
        icon: <Restaurant style={{ color: `gold` }} />,
      };
      break;
    case `stickers-and-cliparts`:
      thirdDegreeCategory = {
        title: "Clipart type",
        optionsArray: stickerOptions,
        icon: <StickyNote2 style={{ color: `gold` }} />,
      };
      break;
    case `brochures`:
      thirdDegreeCategory = {
        title: "Brochure Type",
        optionsArray: grDesStyleOptions,
        icon: <Restaurant style={{ color: `gold` }} />,
      };
      shape = true;
      break;
    case `flyers`:
      thirdDegreeCategory = {
        title: "Flyer Type",
        optionsArray: grDesStyleOptions,
        icon: <Restaurant style={{ color: `gold` }} />,
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
