import {
  LARGE_CATEGORY_OF_IMG,
  SMALL_CATEGORY_OF_IMG,
} from "../typings/image-types/ImageTypes";

export type NavbarImageLink = {
  name: string;
  value: string;
  catName: LARGE_CATEGORY_OF_IMG;
  subCatName: SMALL_CATEGORY_OF_IMG;
  description: string;
  SlideImages: { id: number; source: string }[];
};
export const GrDesignLinks: NavbarImageLink[] = [
  {
    name: "Menus",
    value: "menus",
    catName: "graphic-designs",
    subCatName: "menus",
    description:
      "Modifiable menu templates crafted for restaurants, bars an coffee shops of various styles",
    SlideImages: [],
  },
  {
    name: "Banners",
    value: "banners",
    catName: "graphic-designs",
    subCatName: "banners",
    description:
      "Social media restaurant banners alongside banners higher dimensions up to 4K",
    SlideImages: [],
  },
  {
    name: "Flyers",
    value: "flyers",
    catName: "graphic-designs",
    subCatName: "flyers",
    description: "Unique flyer templates that can be modified",
    SlideImages: [],
  },
  {
    name: "Business Cards",
    value: "artworks",
    catName: "graphic-designs",
    subCatName: "business-cards",
    description:
      "Unique styled business cards designed for restaurants. Simple and slick",
    SlideImages: [],
  },
  {
    name: "Stickers & Cliparts",
    value: "stickers-and-cliparts",
    catName: "graphic-designs",
    subCatName: "stickers-and-cliparts",
    description:
      "Small sized images and stickers that can be used almost anywhere",
    SlideImages: [],
  },
  {
    name: "Brochures",
    value: "brochures",
    catName: "graphic-designs",
    subCatName: "brochures",
    description: "Restaurant template brochures designed to stand out",
    SlideImages: [],
  },
  {
    name: "Other",
    value: "other",
    catName: "graphic-designs",
    subCatName: "other",
    description:
      "Restaurant tables, bar stands, or just custom made characters having a drink. Marketing images that are not related to foods",
    SlideImages: [],
  },
];

export const AdvertImagesLinks: NavbarImageLink[] = [
  {
    name: "Appetizers",
    value: "appetizers",
    catName: "advertisement-images",
    subCatName: "appetizers",
    description:
      "gyoza, ravioli, falafel and other foods meant to arouse the appetite  ",
    SlideImages: [
      {
        id: 0,
        source:
          "/frontend-used-images/category-images/advertisement-images/appetizers1.png",
      },
      {
        id: 1,
        source:
          "/frontend-used-images/category-images/advertisement-images/appetizers2.png",
      },
      {
        id: 2,
        source:
          "/frontend-used-images/category-images/advertisement-images/appetizers3.png",
      },
    ],
  },

  {
    name: "Soups",
    value: "soups",
    catName: "advertisement-images",
    subCatName: "soups",
    description: "Soups that are served before the main dishes  ",
    SlideImages: [
      {
        id: 0,
        source:
          "/frontend-used-images/category-images/advertisement-images/soups1.png",
      },
      {
        id: 1,
        source:
          "/frontend-used-images/category-images/advertisement-images/soups2.png",
      },
      {
        id: 2,
        source:
          "/frontend-used-images/category-images/advertisement-images/soups3.png",
      },
    ],
  },
  {
    name: "Main Dishes",
    value: "main-dishes",
    catName: "advertisement-images",
    subCatName: "main-dishes",
    description:
      "Images of various restaurant dishes, country specific or not, meant to make people hungry",
    SlideImages: [
      {
        id: 0,
        source:
          "/frontend-used-images/category-images/advertisement-images/main-dishes1.png",
      },
      {
        id: 1,
        source:
          "/frontend-used-images/category-images/advertisement-images/main-dishes2.png",
      },
      {
        id: 2,
        source:
          "/frontend-used-images/category-images/advertisement-images/main-dishes3.png",
      },
    ],
  },
  {
    name: "Sweets & Desserts",
    value: "sweets-and-desserts",
    catName: "advertisement-images",
    subCatName: "sweets-and-desserts",
    description: "Cakes, cookies, ice cream cups and other tasty foods.",
    SlideImages: [
      {
        id: 0,
        source:
          "/frontend-used-images/category-images/advertisement-images/sweets-and-desserts1.png",
      },
      {
        id: 1,
        source:
          "/frontend-used-images/category-images/advertisement-images/sweets-and-desserts2.png",
      },
      {
        id: 2,
        source:
          "/frontend-used-images/category-images/advertisement-images/sweets-and-desserts3.png",
      },
    ],
  },
  {
    name: "Fast Foods",
    value: "fast-foods",
    catName: "advertisement-images",
    subCatName: "fast-foods",
    description: "Pizzas, hamburgers, chicken nuggets, pretzels and so forth",
    SlideImages: [
      {
        id: 0,
        source:
          "/frontend-used-images/category-images/advertisement-images/fast-foods1.png",
      },
      {
        id: 1,
        source:
          "/frontend-used-images/category-images/advertisement-images/fast-foods2.png",
      },
      {
        id: 2,
        source:
          "/frontend-used-images/category-images/advertisement-images/fast-foods3.png",
      },
    ],
  },
  {
    name: "Drinks",
    value: "drinks",
    catName: "advertisement-images",
    subCatName: "drinks",
    description:
      "Coffee, wine cups or cocktails for classic restaurants and coffee shops.",
    SlideImages: [
      {
        id: 0,
        source:
          "/frontend-used-images/category-images/advertisement-images/drinks1.png",
      },
      {
        id: 1,
        source:
          "/frontend-used-images/category-images/advertisement-images/drinks2.png",
      },
      {
        id: 2,
        source:
          "/frontend-used-images/category-images/advertisement-images/drinks3.png",
      },
    ],
  },
  {
    name: "Cutlery & Plates",
    value: "utensils-and-plates",
    catName: "advertisement-images",
    subCatName: "cutleries-and-plates",
    description: "Plates, forks, knives etc. Designed for marketing",
    SlideImages: [
      {
        id: 0,
        source:
          "/frontend-used-images/category-images/advertisement-images/cutlery-and-plates.png",
      },
      {
        id: 1,
        source:
          "/frontend-used-images/category-images/advertisement-images/cutlery-and-plates.png",
      },
      {
        id: 2,
        source:
          "/frontend-used-images/category-images/advertisement-images/cutlery-and-plates.png",
      },
    ],
  },
  {
    name: "Ingredients",
    value: "ingredients",
    catName: "advertisement-images",
    subCatName: "ingredients",
    description:
      "Fresh Vegetables, fruits, spices and other ingredients that are used in cooking ",
    SlideImages: [
      {
        id: 0,
        source:
          "/frontend-used-images/category-images/advertisement-images/ingredients1.png",
      },
      {
        id: 1,
        source:
          "/frontend-used-images/category-images/advertisement-images/ingredients2.png",
      },
      {
        id: 2,
        source:
          "/frontend-used-images/category-images/advertisement-images/ingredients3.png",
      },
    ],
  },
];
