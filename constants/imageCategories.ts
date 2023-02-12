export type NavbarImageLink = {
  name: string;
  value: string;
  href: `${string}`;
  source: `/${string}`;
  description: string;
  SlideImages: { id: number; source: string }[];
};
export const GrDesignLinks: NavbarImageLink[] = [
  {
    name: "Menus",
    value: "menus",
    href: "/restaurant-graphic-designs/menus",
    source: "/frontend-used-images/Category-Images/Menus.png",
    description:
      "Modifiable menu templates crafted for restaurants, bars an coffee shops of various styles",
    SlideImages: [],
  },
  {
    name: "Banners",
    value: "banners",
    href: "/restaurant-graphic-designs/banners",
    source: "/frontend-used-images/Category-Images/Banners.png",
    description:
      "Social media restaurant banners alongside banners higher dimensions up to 4K",
    SlideImages: [],
  },
  {
    name: "Flyers",
    value: "",
    href: "/restaurant-graphic-designs/flyers",
    source: "/frontend-used-images/Category-Images/Flyers.png",
    description: "Unique flyer templates that can be modified",
    SlideImages: [],
  },
  {
    name: "Artworks",
    value: "artworks",
    href: "/restaurant-graphic-designs/artworks",
    source: "/frontend-used-images/Category-Images/Artworks.png",
    description:
      "Unique styled artworks designed for restaurants. Meant to be used either decoratively or in marketing",
    SlideImages: [],
  },
  {
    name: "Stickers & Cliparts",
    value: "stickers-and-cliparts",
    href: "/restaurant-graphic-designs/stickers-&-cliparts",
    source: "/frontend-used-images/Category-Images/Food Cliparts.png",
    description:
      "Small sized images and stickers that can be used almost anywhere",
    SlideImages: [],
  },
  {
    name: "Brochures",
    value: "brochures",
    href: "/restaurant-graphic-designs/brochures",
    source: "/frontend-used-images/Category-Images/Brochures.png",
    description: "Restaurant template brochures designed to stand out",
    SlideImages: [],
  },
  {
    name: "Other",
    value: "other",
    href: "/restaurant-graphic-designs/other",
    source: "/frontend-used-images/Category-Images/RestaurantStockImages.png",
    description:
      "Restaurant tables, bar stands, or just custom made characters having a drink. Marketing images that are not related to foods",
    SlideImages: [],
  },
];

export const StockImageLinks: NavbarImageLink[] = [
  {
    name: "Appetizers",
    value: "appetizers",
    href: "/restaurant-stock-images/appetizers",
    source: "/frontend-used-images/Category-Images/appetizers.png",
    description:
      "gyoza, ravioli, falafel and other foods meant to arouse the appetite  ",
    SlideImages: [
      { id: 0, source: "/frontend-used-images/Category-Images/Dishes1.png" },
      { id: 1, source: "/frontend-used-images/Category-Images/Dishes2.png" },
      { id: 2, source: "/frontend-used-images/Category-Images/Dishes3.png" },
    ],
  },

  {
    name: "Soups",
    value: "soups",
    href: "/restaurant-stock-images/soups",
    source: "/frontend-used-images/Category-Images/soups.png",
    description: "Soups that are served before the main dishes  ",
    SlideImages: [
      { id: 0, source: "/frontend-used-images/Category-Images/Dishes1.png" },
      { id: 1, source: "/frontend-used-images/Category-Images/Dishes2.png" },
      { id: 2, source: "/frontend-used-images/Category-Images/Dishes3.png" },
    ],
  },
  {
    name: "Main Dishes",
    value: "main-dishes",
    href: "/restaurant-stock-images/main-dishes",
    source: "/frontend-used-images/Category-Images/Dishes.png",
    description:
      "Images of various restaurant dishes, country specific or not, meant to make people hungry",
    SlideImages: [
      { id: 0, source: "/frontend-used-images/Category-Images/Dishes1.png" },
      { id: 1, source: "/frontend-used-images/Category-Images/Dishes2.png" },
      { id: 2, source: "/frontend-used-images/Category-Images/Dishes3.png" },
    ],
  },
  {
    name: "Sweets & Desserts",
    value: "sweets-and-desserts",
    href: "/restaurant-stock-images/sweets-and-deserts",
    source: "/frontend-used-images/Category-Images/Sweets.png",
    description: "Cakes, cookies, ice cream cups and other tasty foods.",
    SlideImages: [
      { id: 0, source: "/frontend-used-images/Category-Images/Sweets1.png" },
      { id: 1, source: "/frontend-used-images/Category-Images/Sweets2.png" },
      { id: 2, source: "/frontend-used-images/Category-Images/Sweets3.png" },
    ],
  },
  {
    name: "Fast Foods",
    value: "fast-foods",
    href: "/restaurant-stock-images/fast-foods",
    source: "/frontend-used-images/Category-Images/FastFoods.png",
    description: "Pizzas, hamburgers, chicken nuggets, pretzels and so forth",
    SlideImages: [
      { id: 0, source: "/frontend-used-images/Category-Images/FastFoods1.png" },
      { id: 1, source: "/frontend-used-images/Category-Images/FastFoods2.png" },
      { id: 2, source: "/frontend-used-images/Category-Images/FastFoods3.png" },
    ],
  },
  {
    name: "Drinks",
    value: "drinks",
    href: "/restaurant-stock-images/drinks",
    source: "/frontend-used-images/Category-Images/Drinks.png",
    description:
      "Coffee, wine cups or cocktails for classic restaurants and coffee shops.",
    SlideImages: [
      { id: 0, source: "/frontend-used-images/Category-Images/Drinks1.png" },
      { id: 1, source: "/frontend-used-images/Category-Images/Drinks2.png" },
      { id: 2, source: "/frontend-used-images/Category-Images/Drinks3.png" },
    ],
  },
  {
    name: "Cutlery & Plates",
    value: "utensils-and-plates",
    href: "/restaurant-stock-images/utensils-and-plates",
    source: "/frontend-used-images/Category-Images/Utensils.png",
    description: "Plates, forks, knives etc. Designed for marketing",
    SlideImages: [
      { id: 0, source: "/frontend-used-images/Category-Images/Utensils1.png" },
      { id: 1, source: "/frontend-used-images/Category-Images/Utensils2.png" },
      { id: 2, source: "/frontend-used-images/Category-Images/Utensils3.png" },
    ],
  },
  {
    name: "Ingredients",
    value: "ingredients",
    href: "/restaurant-stock-images/ingredients",
    source: "/frontend-used-images/Category-Images/Ingredients.png",
    description:
      "Fresh Vegetables, fruits, spices and other ingredients that are used in cooking ",
    SlideImages: [
      {
        id: 0,
        source: "/frontend-used-images/Category-Images/Ingredientss1.png",
      },
      {
        id: 1,
        source: "/frontend-used-images/Category-Images/Ingredientss2.png",
      },
      {
        id: 2,
        source: "/frontend-used-images/Category-Images/Ingredientss3.png",
      },
    ],
  },
];
