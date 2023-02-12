import {
  LARGE_CATEGORY_OF_IMG,
  SMALL_CATEGORY_OF_IMG,
} from "../../typings/image-types/ImageTypes";

export interface homepageGallery {
  name: string;
  catName: LARGE_CATEGORY_OF_IMG;
  subCatName: SMALL_CATEGORY_OF_IMG;
  w: number;
  h: number;
}

export const homepageGalleryList: (homepageGallery | string)[] = [
  {
    name: "Appetizers",
    catName: "stock-images",
    subCatName: "appetizers",
    w: 960,
    h: 540,
  },
  {
    name: "Soups",
    catName: "stock-images",
    subCatName: "soups",
    w: 960,
    h: 540,
  },
  {
    name: "Main Dishes",
    catName: "stock-images",
    subCatName: "main-dishes",
    w: 1536,
    h: 1024,
  },
  {
    name: "Sweets & Desserts",
    catName: "stock-images",
    subCatName: "sweets-and-desserts",
    w: 512,
    h: 512,
  },

  {
    name: "Fast Foods",
    catName: "stock-images",
    subCatName: "fast-foods",
    w: 1536,
    h: 1024,
  },
  {
    name: "Drinks",
    catName: "stock-images",
    subCatName: "drinks",
    w: 1536,
    h: 1024,
  },
  "Browse our Images",

  {
    name: "Cutlery & Plates",
    catName: "stock-images",
    subCatName: "cutleries-and-plates",
    w: 1536,
    h: 1024,
  },

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
