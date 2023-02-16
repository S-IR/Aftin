import {
  LARGE_CATEGORY_OF_IMG,
  SMALL_CATEGORY_OF_IMG,
} from "../../typings/image-types/ImageTypes";

export type CategoryPageImageObj = {
  name: string;
  catName: LARGE_CATEGORY_OF_IMG;
  subCatName: SMALL_CATEGORY_OF_IMG;
  w: number;
  h: number;
};

export const CategoryPageAdvertImages: (CategoryPageImageObj | string)[] = [
  {
    name: "Appetizers",
    catName: "advertisement-images",
    subCatName: "appetizers",
    w: 960,
    h: 540,
  },
  {
    name: "Soups",
    catName: "advertisement-images",
    subCatName: "soups",
    w: 960,
    h: 540,
  },
  {
    name: "Main Dishes",
    catName: "advertisement-images",
    subCatName: "main-dishes",
    w: 1536,
    h: 1024,
  },
  {
    name: "Sweets & Desserts",
    catName: "advertisement-images",
    subCatName: "sweets-and-desserts",
    w: 512,
    h: 512,
  },
  "What advertisement image do you need?",
  {
    name: "Fast Foods",
    catName: "advertisement-images",
    subCatName: "fast-foods",
    w: 1536,
    h: 1024,
  },
  {
    name: "Drinks",
    catName: "advertisement-images",
    subCatName: "drinks",
    w: 1536,
    h: 1024,
  },

  {
    name: "Cutlery & Plates",
    catName: "advertisement-images",
    subCatName: "cutleries-and-plates",
    w: 1536,
    h: 1024,
  },
];

export const CategoryPageGraphicImages: (CategoryPageImageObj | string)[] = [
  {
    name: "Menus",
    catName: "graphic-designs",
    subCatName: "menus",
    w: 1536,
    h: 1024,
  },
  {
    name: "Banners",
    catName: "graphic-designs",
    subCatName: "banners",
    w: 1536,
    h: 1024,
  },
  {
    name: "Flyers",
    catName: "graphic-designs",
    subCatName: "flyers",
    w: 1536,
    h: 1024,
  },
  {
    name: "Business Cards",
    catName: "graphic-designs",
    subCatName: "business-cards",
    w: 1536,
    h: 1024,
  },
  "What graphic designs do you need?",
  {
    name: "Stickers & Cliparts",
    catName: "graphic-designs",
    subCatName: "stickers-and-cliparts",
    w: 1536,
    h: 1024,
  },
  {
    name: "Brochures",
    catName: "graphic-designs",
    subCatName: "brochures",
    w: 1536,
    h: 1024,
  },
  {
    name: "Other",
    catName: "graphic-designs",
    subCatName: "other",
    w: 1536,
    h: 1024,
  },
];
