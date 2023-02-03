import { HTMLHexColor } from "../typings"
export const tier_array = [`bronze`, `silver`, `gold`] as const
export type LARGE_CATEGORY_OF_IMG = `graphic-designs` | `stock-images`


export type SMALL_CATEGORY_OF_IMG = `soups` | `appetizers` | `main-dishes` | `sweets-and-desserts` | `fast-foods` | `drinks` | `utensils-and-plates` | `ingredients` | `menus` | `banners` | `flyers` | `artworks` | `stickers-and-cliparts` | `brochures` | `other`

export const subCats_array: SMALL_CATEGORY_OF_IMG[] = [`soups`, `appetizers`, `main-dishes`, `sweets-and-desserts`, `fast-foods`, `drinks`, `utensils-and-plates`, `ingredients`, `menus`, `banners`, `flyers`, `artworks`, `stickers-and-cliparts`, `brochures`, `other`]

interface Array<SMALL_CATEGORY_OF_IMG> {
  includes(searchElement: any, fromIndex?: number): searchElement is SMALL_CATEGORY_OF_IMG
}

export type StockImageType = `soups` | `appetizers` | `main-dishes` | `sweets-and-desserts` | `fast-foods` | `drinks` | `utensils-and-plates` | `ingredients`
export type GraphicDesignType = `menus` | `banners` | `flyers` | `artworks` | `stickers-and-cliparts` | `brochures` | `other`

export const StockImagesOptions: StockImageType[] = [`appetizers`, `soups`, `main-dishes`, `sweets-and-desserts`, `fast-foods`, `drinks`, `utensils-and-plates`, `ingredients`]

export const GrahicDesignsOptions: GraphicDesignType[] = [`menus`, `banners`, `flyers`, `artworks`, `stickers-and-cliparts`, `brochures`, `other`]


export const size_array = [
  `Small (around 256 X 256)`,
  `Medium (around 512x512)`,
  `HD (around 1280x720)`,
  `HDTV (around 1920x1080)`,
  `4K+`
]
export const surr_env_array = [
  "advertisement-meant",
  "being-cooked",
  "being-served",
  'being-delivered',
  `served-outside`,
]

export const soups_array = [`clam-chowder`, `french-onion-soup`, `miso-soup`, `pho`, `ramen`]

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
`greek-salad`, `
guacamole`, 
`gyoza`, 
`oyster`, 
`ravioli`, 
`samosa`, 
`sashimi`, 
` scallops`, 
`spring-rolls`, 
`takoyaki`]

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
  `sushi`
]

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
  `waffles`

]
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

]
export const drinks_array = [
  `beer`,
  `carbonated-drinks`,
  `cocktails`,
  `coffee`,
  `juices`,
  `tea`,
  `water`,
  `wine`
]
export const utensils_and_plates_array = [
  `baking-tools`,
  `forks`,
  `knives`,
  `ladle`,
  `spatulas`,
  `spoons`,
  `vessels`,
  `whisks`,
]
export const utensil_type = [
  `wood`,
  `stainless-steel`
]
export const spices_array = [
  `black-pepper`,
  `cardamom`,
  `cinnamon`,
  `coriander`,
  `masala`,
  `saffron`,
  `zaatar`,
]
export const fruits_array = [
  `apples`,
  `berries`,
  `grapes`,
  `mango`,
  `nuts`,
  `oranges`,
  `pineapples`,
  `strawberries`,
  `watermelons`,

]
export const vegetables_array = [
  `beans`,
  `broccoli`,
  `cabbage`,
  `carrots`,
  `cucumbers`,
  `garlic`,
  `onions`,
  `peas`,
  `tomatoes`,

]
export const ingredients_array = [...spices_array, ...vegetables_array, ...fruits_array]

export const menu_size_array = [`letter`, `legal`, `tabloid`, `half-page`]

export const banner_type_array = [`facebook-banner`, `twitter-banner`, `website-banner`, `outdoor-banner`]


export const artwork_styles_array = [
  `eye-catchy`,
  `hunger-inducing`,
  `painting`,
  `cartoon`,
  `nostalgic`,
  `creative`,
  `unique`,
]
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

]
export const shape_array = [
  `rectangular`,
  `round`,
  `square`,
]
export const gr_des_style_array = [
  `fine-dining`,
  `diner`,
  `bar`,
  `fast-food`,
  `cafeteria`,
  `pizzeria`,
  `family-restaurant`,
  `italian`, `japanese`, `french`, `indian`, `greek`, `thai`, `mexican`, `chinese`, `middle eastern`
]
// Cannot use the typeof the styles array because the nested object has an array, and ts will think that ethnic is an array and not a string
export type Valid_image_fields = `paid` | `size` | `description` | `color_scheme` | `surr_env` | `url` | `views` | `dish_type` | `soup` | `food_type` | `drink_type` | `utensil_type` | `material` | `ingredients` | `banner_type` | `style` | `artwork_style` | `stickers_category` | `shape`

export const valid_image_fields = [`paid`, `color`, `size`, `description`, `color_scheme`, `surr_env`, `url`, `views`, `dish_type`, `soup`, `food_type`, `drink_type`, `utensil_type`, `material`, `ingredients`, `banner_type`, `style`, `artwork_style`, `stickers_category`, `shape`]
export type ImgDoc =
  {
    paid: typeof tier_array[number],
    size: typeof size_array[number] | typeof menu_size_array[number],
    description: string,
    color?: { r: number, g: number, b: number }[]
    color_scheme: HTMLHexColor[],
    surr_env?: typeof surr_env_array[number],
    url: string,
    views: number,
    appetizer_type?: typeof appetizers_array[number],
    dish_type?: typeof main_dish_array[number],
    soup?: typeof soups_array[number],
    fast_food_type?: typeof fast_foods_array[number],
    sweet_type: typeof sweets_and_desserts_array[number],
    drink_type?: typeof drinks_array[number],
    utensil_type?: typeof utensils_and_plates_array[number],
    material?: typeof utensil_type[number],
    ingredients?: typeof ingredients_array,
    menu_type?: typeof menu_size_array[number],
    menu_size?: typeof menu_size_array[number],
    banner_type?: typeof banner_type_array[number],
    style: typeof gr_des_style_array[number],
    artwork_style?: typeof artwork_styles_array[number],
    sticker_category?: typeof stickers_and_cliparts_categories[number],
    shape?: typeof shape_array[number]
  }