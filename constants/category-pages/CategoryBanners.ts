import {
  FirstDegreeCategory,
  SecondDegreeCategory,
} from "../../typings/image-types/ImageTypes";

export type CategoryPageImageObj = {
  name: string;
  catName: FirstDegreeCategory;
  secondDegCatName: SecondDegreeCategory;
  w: number;
  h: number;
};

export const CategoryPageAdvertImages: (CategoryPageImageObj | string)[] = [
  {
    name: "Appetizers",
    catName: "advertisement-images",
    secondDegCatName: "appetizers",
    w: 960,
    h: 540,
  },
  {
    name: "Soups",
    catName: "advertisement-images",
    secondDegCatName: "soups",
    w: 960,
    h: 540,
  },
  {
    name: "Main Dishes",
    catName: "advertisement-images",
    secondDegCatName: "main-dishes",
    w: 1536,
    h: 1024,
  },
  {
    name: "Sweets & Desserts",
    catName: "advertisement-images",
    secondDegCatName: "sweets-and-desserts",
    w: 512,
    h: 512,
  },
  "What advertisement image do you need?",
  {
    name: "Fast Foods",
    catName: "advertisement-images",
    secondDegCatName: "fast-foods",
    w: 1536,
    h: 1024,
  },
  {
    name: "Drinks",
    catName: "advertisement-images",
    secondDegCatName: "drinks",
    w: 1536,
    h: 1024,
  },

  {
    name: "Cutlery & Plates",
    catName: "advertisement-images",
    secondDegCatName: "cutleries-and-plates",
    w: 1536,
    h: 1024,
  },
];

export const CategoryPageGraphicImages: (CategoryPageImageObj | string)[] = [
  {
    name: "Menus",
    catName: "graphic-designs",
    secondDegCatName: "menus",
    w: 1536,
    h: 1024,
  },
  {
    name: "Banners",
    catName: "graphic-designs",
    secondDegCatName: "banners",
    w: 1536,
    h: 1024,
  },
  {
    name: "Flyers",
    catName: "graphic-designs",
    secondDegCatName: "flyers",
    w: 1536,
    h: 1024,
  },
  {
    name: "Business Cards",
    catName: "graphic-designs",
    secondDegCatName: "business-cards",
    w: 1536,
    h: 1024,
  },
  "What graphic designs do you need?",
  {
    name: "Stickers & Cliparts",
    catName: "graphic-designs",
    secondDegCatName: "stickers-and-cliparts",
    w: 1536,
    h: 1024,
  },
  {
    name: "Brochures",
    catName: "graphic-designs",
    secondDegCatName: "brochures",
    w: 1536,
    h: 1024,
  },
  {
    name: "Other",
    catName: "graphic-designs",
    secondDegCatName: "other",
    w: 1536,
    h: 1024,
  },
];
