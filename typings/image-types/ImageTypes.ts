import { HTMLHexColor } from "../typings";

export type FirstDegreeCategory = `graphic-designs` | `advertisement-images`;
import { tagsArray } from "../../constants/upload-image/Tags";
import { z } from "zod";

export const fistDegArray = [
  `graphic-designs`,
  `advertisement-images`,
] as const;
export type SecondDegreeCategory = (typeof secondDegArray)[number];
export const tier_array = [`bronze`, `silver`, `gold`] as const;
export const paid_tier_array = ["silver", "gold"] as const;
export type GraphicDesignType = (typeof GraphicDesignsOptions)[number];
export const AdvertImagesOptions = [
  `appetizers`,
  `soups`,
  `main-dishes`,
  `sweets-and-desserts`,
  `fast-foods`,
  `drinks`,
  `cutleries-and-plates`,
  `ingredients`,
  `tables`,
] as const;
export type AdvertImageType = (typeof AdvertImagesOptions)[number];

export const GraphicDesignsOptions = [
  `menus`,
  `banners`,
  `flyers`,
  `business-cards`,
  `stickers-and-cliparts`,
  `brochures`,
] as const;

export const secondDegArray = [
  ...AdvertImagesOptions,
  ...GraphicDesignsOptions,
] as const;

export const size_array = [
  `<256x256`,
  `256x256-512x512`,
  `512x512-1280x720`,
  `1280x720-1920x1080`,
  `1920x1080-4K`,
  `4K+`,
] as const;

export const surr_env_array = [
  "advertisement-meant",
  "being-cooked",
  "being-served",
  "being-delivered",
  `served-outside`,
] as const;

export const soups_array = [
  `clam-chowder`,
  `french-onion-soup`,
  `miso-soup`,
  `pho`,
  `ramen`,
] as const;

export const appetizers_array = [
  `beef-carpaccio`,
  `beet-salad`,
  `bruschetta`,
  `caprese-salad`,
  `cevische`,
  `club-sandwich`,
  `crab-cake`,
  `deviled-eggs`,
  `escargots`,
  `falafel`,
  `gnocchi`,
  `greek-salad`,
  `guacamole`,
  `gyoza`,
  `oyster`,
  `ravioli`,
  `samosa`,
  `sashimi`,
  ` scallops`,
  `spring-rolls`,
  `takoyaki`,
] as const;

export const main_dish_array = [
  `apple-pie`,
  `baby-back-ribs`,
  `beignets`,
  `bibimbap`,
  `carrot-cake`,
  `chicken-curry`,
  `churros`,
  `dumplings`,
  `eggs-benedict`,
  `filet-mignon`,
  `fish-and-chips`,
  `french-toast`,
  `fried-rice`,
  `guacamole`,
  `hummus`,
  `lasagna`,
  `macaroni`,
  `mussels`,
  `omlette`,
  `pad-thai`,
  `paella`,
  `prime-rib`,
  `risotto`,
  `spagetti-bolognese`,
  `steak`,
  `steak-tartare`,
  `sushi`,
] as const;

export const sweets_and_desserts_array = [
  `bread-pudding`,
  `cannoli`,
  `cheesecake`,
  `chocolate-cake`,
  `creme-brulée`,
  `cupcakes`,
  `donuts`,
  `french-fries `,
  `frozen-yogurt`,
  `pancakes`,
  `panna-cotta`,
  `pecking-duck`,
  `red-velvet-cake`,
  `strawberry-shortcake`,
  `tiramisu`,
  `waffles`,
] as const;

export const fast_foods_array = [
  `burgers`,
  `chicken-wings`,
  `fries`,
  `hot-dogs`,
  `nachos`,
  `nuggets`,
  `pizzas`,
  `pretzels`,
  `tacos`,
] as const;

export const drinks_array = [
  `beer`,
  `carbonated-drinks`,
  `cocktails`,
  `coffee`,
  `juices`,
  `tea`,
  `water`,
  `wine`,
] as const;

export const cutleries_and_plates_array = [
  `rolling_pins`,
  `forks`,
  `knives`,
  `spatulas`,
  `spoons`,
  `plates`,
  `whisks`,
] as const;

export const cutlery_type = [`wood`, `stainless-steel`] as const;
export const spices_array = [
  `black-pepper`,
  `cardamom`,
  `cinnamon`,
  `coriander`,
  `masala`,
  `saffron`,
  `zaatar`,
] as const;
export const fruits_array = [
  `apples`,
  `berries`,
  `grapes`,
  `mangos`,
  `nuts`,
  `oranges`,
  `pineapples`,
  `strawberries`,
  `watermelons`,
] as const;
export const vegetables_array = [
  `beans`,
  `broccoli`,
  `cabbages`,
  `carrots`,
  `cucumbers`,
  `garlic`,
  `onions`,
  `peas`,
  `tomatoes`,
] as const;
export const ingredients_array = [
  ...spices_array,
  ...vegetables_array,
  ...fruits_array,
] as const;

export const menu_size_array = [
  `letter`,
  `legal`,
  `tabloid`,
  `half-page`,
  "other-dimension",
] as const;

export const banner_type_array = [
  `facebook-banner`,
  `twitter-banner`,
  `website-banner`,
  `outdoor-banner`,
] as const;

export const business_card_styles_array = [
  `minimalist`,
  `elegant`,
  `professional`,
] as const;
export const stickers_and_cliparts_categories = [
  `bread`,
  `burger`,
  `cheese`,
  `donut`,
  `hot-dog`,
  `ice-cream`,
  `milk`,
  `pizza`,
  `popcorn`,
  `taco`,
  `vegetables`,
] as const;

export const shape_array = [`rectangular`, `round`, `square`] as const;
export const gr_des_style_array = [
  `fine-dining`,
  `diner`,
  `bar`,
  `fast-food`,
  `cafeteria`,
  `pizzeria`,
  `family-restaurant`,
  `italian`,
  `japanese`,
  `french`,
  `indian`,
  `greek`,
  `thai`,
  `mexican`,
  `chinese`,
  `middle-eastern`,
] as const;

export const tables_arr = [
  "bar-stools",
  "booths",
  "family-dinning-tables",
  "patio-tables",
] as const;

// Cannot use the typeof the styles array because the nested object has an array, and ts will think that ethnic is an array and not a string
export type Valid_image_fields = (typeof valid_image_fields)[number];

export const valid_image_fields = [
  `tier`,
  `size`,
  `description`,
  `color`,
  `color_scheme`,
  `surr_env`,
  `url`,
  "real_url",
  `width`,
  `height`,
  "tags",
  "limited_edition_expiration_date",
  `thirdDegreeCategory`,
  "menu_size",
  `cutlery_type`,
  `material`,
  `banner_type`,
  `shape`,
] as const;

export type nestedImageFields = "ingredients";

export const thirdDegArr = [
  ...appetizers_array,
  ...main_dish_array,
  ...soups_array,
  ...fast_foods_array,
  ...sweets_and_desserts_array,
  ...sweets_and_desserts_array,
  ...drinks_array,
  ...cutleries_and_plates_array,
  ...ingredients_array,
  ...tables_arr,
  ...gr_des_style_array,
] as const;
export type ThirdDegreeCategory = (typeof thirdDegArr)[number];
export type thirdDegCompositionArr =
  | typeof appetizers_array
  | typeof main_dish_array
  | typeof soups_array
  | typeof fast_foods_array
  | typeof sweets_and_desserts_array
  | typeof sweets_and_desserts_array
  | typeof drinks_array
  | typeof cutleries_and_plates_array
  | typeof ingredients_array
  | typeof gr_des_style_array;

export type ImgDoc = {
  tier: (typeof tier_array)[number];
  size: (typeof size_array)[number] | (typeof menu_size_array)[number];
  description: string;
  color?: { r: number; g: number; b: number }[];
  color_scheme: HTMLHexColor[];
  surr_env?: (typeof surr_env_array)[number];
  url: string;
  real_url: string;
  width: number;
  height: number;
  tags: (typeof tagsArray)[number][];
  limited_edition_expiration_date?: Date;
  thirdDegreeCategory: ThirdDegreeCategory;
  material?: (typeof cutlery_type)[number];
  menu_size?: (typeof menu_size_array)[number];
  banner_type?: (typeof banner_type_array)[number];
  shape?: (typeof shape_array)[number];
};
