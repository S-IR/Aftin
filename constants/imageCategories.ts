import {
  FirstDegreeCategory,
  SecondDegreeCategory,
} from "../typings/image-types/ImageTypes";

export type NavbarImageLink = {
  name: string;
  catName: FirstDegreeCategory;
  secondDegCatName: SecondDegreeCategory;
  description: string;
};
export const GrDesignLinks: NavbarImageLink[] = [
  {
    name: "Menus",
    catName: "graphic-designs",
    secondDegCatName: "menus",
    description:
      "Modifiable menu templates crafted for restaurants, bars an coffee shops of various styles",
  },
  {
    name: "Banners",
    catName: "graphic-designs",
    secondDegCatName: "banners",
    description:
      "Social media restaurant banners alongside banners higher dimensions up to 4K",
  },
  {
    name: "Flyers",
    catName: "graphic-designs",
    secondDegCatName: "flyers",
    description: "Unique flyer templates that can be modified",
  },
  {
    name: "Business Cards",
    catName: "graphic-designs",
    secondDegCatName: "business-cards",
    description:
      "Unique styled business cards designed for restaurants. Simple and slick",
  },
  {
    name: "Stickers & Cliparts",
    catName: "graphic-designs",
    secondDegCatName: "stickers-and-cliparts",
    description:
      "Small sized images and stickers that can be used almost anywhere",
  },
  {
    name: "Brochures",
    catName: "graphic-designs",
    secondDegCatName: "brochures",
    description: "Restaurant template brochures designed to stand out",
  },
];

export const AdvertImagesLinks: NavbarImageLink[] = [
  {
    name: "Appetizers",
    catName: "advertisement-images",
    secondDegCatName: "appetizers",
    description:
      "gyoza, ravioli, falafel and other foods meant to arouse the appetite  ",
  },

  {
    name: "Soups",
    catName: "advertisement-images",
    secondDegCatName: "soups",
    description: "Soups that are served before the main dishes  ",
  },
  {
    name: "Main Dishes",
    catName: "advertisement-images",
    secondDegCatName: "main-dishes",
    description:
      "Images of various restaurant dishes, country specific or not, meant to make people hungry",
  },
  {
    name: "Sweets & Desserts",
    catName: "advertisement-images",
    secondDegCatName: "sweets-and-desserts",
    description: "Cakes, cookies, ice cream cups and other tasty foods.",
  },
  {
    name: "Fast Foods",
    catName: "advertisement-images",
    secondDegCatName: "fast-foods",
    description: "Pizzas, hamburgers, chicken nuggets, pretzels and so forth",
  },
  {
    name: "Drinks",
    catName: "advertisement-images",
    secondDegCatName: "drinks",
    description:
      "Coffee, wine cups or cocktails for classic restaurants and coffee shops.",
  },
  {
    name: "Ingredients",
    catName: "advertisement-images",
    secondDegCatName: "ingredients",
    description:
      "Fresh Vegetables, fruits, spices and other ingredients that are used in cooking ",
  },
  {
    name: "Tables",
    catName: "advertisement-images",
    secondDegCatName: "tables",
    description:
      "Different tables setup ranging from tables with tablecloth at a fine dinning restaurant to pub tables and others",
  },
];
