import { IncomingMessage } from "http";
import { z } from "zod";
import {
  AdvertImagesOptions,
  appetizers_array,
  cutleries_and_plates_array,
  drinks_array,
  fast_foods_array,
  fruits_array,
  GraphicDesignsOptions,
  gr_des_style_array,
  ingredients_array,
  main_dish_array,
  SecondDegreeCategory,
  soups_array,
  spices_array,
  stickers_and_cliparts_categories,
  secondDegArray,
  sweets_and_desserts_array,
  vegetables_array,
  tables_arr,
} from "../../../typings/image-types/ImageTypes";
import {
  stickers_and_cliparts_schema,
  thirdDegCat_schema,
} from "../../../typings/image-types/imageZodSchemas";

// The dumbest piece of code i've written in my entire life

const secondDegCatAdvertSchema = z.enum(AdvertImagesOptions);

const grDesSchema = z.enum([
  ...gr_des_style_array,
  ...stickers_and_cliparts_categories,
]);

type thirdDegCatType = z.infer<typeof thirdDegCat_schema>;
const server = process.env.NEXT_PUBLIC_server;
/**
 * Determines the title and the description for a website gallery page
 * @param secondDegCat The sub category of that page
 * @param thirdDegCat Other particular query parameters that are essential for SEO (for example 'hamburger', 'ice-cream', 'bar' etc.)
 * @returns [title: string, desciption: string] OR "Invalid secondDegCat" if the secondDegCategory is invalid
 */
export const determinePageMetas = (
  url: IncomingMessage[`url`],
  secondDegCat: SecondDegreeCategory,
  thirdDegCat?: thirdDegCatType
): { title: string; description: string; canonical: string } => {
  let title: string;
  let description: string;
  let canonical: string;
  const baseUrl: string = url?.includes("advertisement-images")
    ? "/restaurant-advertisement-images"
    : `/restaurant-graphic-designs`;

  let secondDegCatWords = secondDegCat.replaceAll("-", " ").split(" ");
  for (let i = 0; i < secondDegCatWords.length; i++) {
    secondDegCatWords[i] =
      secondDegCatWords[i][0].toUpperCase() + secondDegCatWords[i].substr(1);
  }

  const cleanedSecondDegCat = secondDegCatWords.join(" ");

  // if the secondDegCat is valid we determine if it firstly is from a graphic design or from a advertisement image category
  if (secondDegCatAdvertSchema.safeParse(secondDegCat).success) {
    // if there aren't any other particular parameters return this
    if (!thirdDegCat_schema.safeParse(thirdDegCat).success) {
      title = `Mesmerizing ${cleanedSecondDegCat} Images - Aftin Designs`;
      description = `Unique ${cleanedSecondDegCat} images meant to be used in advertising`;
      canonical = `${server}/${baseUrl}/${secondDegCat}`;
      return { title, description, canonical };
    } else {
      //ignore ts
      let thirdDegCatWords = thirdDegCat.replace("-", " ").split(" ");
      for (let i = 0; i < thirdDegCatWords.length; i++) {
        thirdDegCatWords[i] =
          thirdDegCatWords[i][0].toUpperCase() + thirdDegCatWords[i].substr(1);
      }
      const cleanedthirdDegCat = thirdDegCatWords.join(" ");
      title = `Mesmerizing ${cleanedthirdDegCat} Images - Aftin Designs`;
      description = `Unique ${cleanedthirdDegCat} images meant to be used in advertising`;
      canonical = `${baseUrl}/${secondDegCat}/${thirdDegCat}`;
      return { title, description, canonical };
    }
  } else {
    if (!grDesSchema.safeParse(thirdDegCat).success) {
      title = `Exquisite Restaurant ${cleanedSecondDegCat} Templates - Aftin Designs`;
      description = `Unique restaurant ${cleanedSecondDegCat} templates. High quality, slick and of different sizes`;
      canonical = `${baseUrl}/${secondDegCat}`;
      return { title, description, canonical };
    } else {
      let thirdDegCatWords = thirdDegCat.replace("-", " ").split(" ");
      for (let i = 0; i < thirdDegCatWords.length; i++) {
        thirdDegCatWords[i] =
          thirdDegCatWords[i][0].toUpperCase() + thirdDegCatWords[i].substr(1);
      }
      const cleanedthirdDegCat = thirdDegCatWords.join(" ");
      if (stickers_and_cliparts_schema.safeParse(thirdDegCat).success) {
        title = `${cleanedthirdDegCat} Cliparts - Aftin Designs`;
        description = `Stylish ${cleanedthirdDegCat} cliparts meant for restaurant advertisement`;
        canonical = `${baseUrl}/${secondDegCat}/${thirdDegCat}`;

        return { title, description, canonical };
      } else {
        title = `Exquisite ${cleanedthirdDegCat} ${cleanedSecondDegCat} Templates for Restaurants - Aftin Designs`;
        description = `Stylish ${cleanedthirdDegCat} cliparts meant for restaurant advertisement`;
        canonical = `${baseUrl}/${secondDegCat}/${thirdDegCat}`;

        return { title, description, canonical };
      }
    }
  }
};
