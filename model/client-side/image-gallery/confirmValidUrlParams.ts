import { ZodSchema } from "zod";
import { SecondDegreeCategory } from "../../../typings/image-types/ImageTypes";
import {
  AdvertImagesOptionsSchema,
  appetizers_schema,
  cutleries_and_plates_schema,
  drinks_schema,
  fast_foods_schema,
  GraphicDesignsOptionsSchema,
  gr_des_style_schema,
  ingredients_schema,
  main_dish_schema,
  secondDegCat_schema,
  soups_schema,
  stickers_and_cliparts_schema,
  sweets_and_desserts_schema,
  tables_schema,
} from "../../../typings/image-types/imageZodSchemas";

export const confirmValidUrlParams = (
  imageCategory: string[] | undefined | string
): "invalid" | "valid" => {
  if (imageCategory === undefined || typeof imageCategory === "string")
    return "invalid";

  if (imageCategory.length === 0) return "invalid";

  if (imageCategory.length === 1) {
    if (!secondDegCat_schema.safeParse(imageCategory[0]).success)
      return "invalid";
  }

  if (imageCategory.length === 2) {
    if (!secondDegCat_schema.safeParse(imageCategory[0]).success)
      return "invalid";
    const zodSchema = determineZodSchema(
      imageCategory[0] as SecondDegreeCategory
    );

    if (!zodSchema.safeParse(imageCategory[1]).success) return "invalid";
  }
  if (imageCategory.length > 2) {
    return "invalid";
  }
  return "valid";
};

const determineZodSchema = (
  secondLevelCategory: SecondDegreeCategory
): ZodSchema => {
  switch (secondLevelCategory) {
    case "appetizers":
      return appetizers_schema;
    case "banners":
      return gr_des_style_schema;
    case "brochures":
      return gr_des_style_schema;
    case "business-cards":
      return gr_des_style_schema;
    case "cutleries-and-plates":
      return cutleries_and_plates_schema;
    case "drinks":
      return drinks_schema;
    case "fast-foods":
      return fast_foods_schema;
    case "flyers":
      return gr_des_style_schema;
    case "ingredients":
      return ingredients_schema;
    case "main-dishes":
      return main_dish_schema;
    case "menus":
      return gr_des_style_schema;
    case "tables":
      return tables_schema;
    case "soups":
      return soups_schema;
    case "stickers-and-cliparts":
      return stickers_and_cliparts_schema;
    case "sweets-and-desserts":
      return sweets_and_desserts_schema;
  }
};
