import {
  FirstDegreeCategory,
  SecondDegreeCategory,
} from "../../typings/image-types/ImageTypes";

export interface homepageGallery {
  name: string;
  catName: FirstDegreeCategory;
  secondDegCatName: SecondDegreeCategory;
}

export const homepageGalleryList: (homepageGallery | string)[] = [
  {
    name: "Appetizers",
    catName: "advertisement-images",
    secondDegCatName: "appetizers",
  },
  {
    name: "Soups",
    catName: "advertisement-images",
    secondDegCatName: "soups",
  },
  {
    name: "Main Dishes",
    catName: "advertisement-images",
    secondDegCatName: "main-dishes",
  },
  {
    name: "Sweets & Desserts",
    catName: "advertisement-images",
    secondDegCatName: "sweets-and-desserts",
  },

  {
    name: "Fast Foods",
    catName: "advertisement-images",
    secondDegCatName: "fast-foods",
  },
  {
    name: "Drinks",
    catName: "advertisement-images",
    secondDegCatName: "drinks",
  },

  {
    name: "Cutlery & Plates",
    catName: "advertisement-images",
    secondDegCatName: "cutleries-and-plates",
  },
  "Browse our Images",

  {
    name: "Menus",
    catName: "graphic-designs",
    secondDegCatName: "menus",
  },
  {
    name: "Banners",
    catName: "graphic-designs",
    secondDegCatName: "banners",
  },
  {
    name: "Flyers",
    catName: "graphic-designs",
    secondDegCatName: "flyers",
  },
  {
    name: "Business Cards",
    catName: "graphic-designs",
    secondDegCatName: "business-cards",
  },
  {
    name: "Stickers & Cliparts",
    catName: "graphic-designs",
    secondDegCatName: "stickers-and-cliparts",
  },
  {
    name: "Brochures",
    catName: "graphic-designs",
    secondDegCatName: "brochures",
  },
];
