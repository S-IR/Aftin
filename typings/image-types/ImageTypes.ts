export type LARGE_CATEGORY_OF_IMG = `graphic-designs` | `stock-images`
export type SMALL_CATEGORY_OF_IMG = `soups` | `appetizers`| `main-dishes` | `sweets-and-desserts` | `fast-foods` | `drinks` | `utensils-and-plates` | `ingredients` | `menus` | `banners` | `flyers` | `logos` | `artworks` | `stickers-and-cliparts` | `brochures` | `other`

export type StockImageType = `soups` | `appetizers`| `main-dishes` | `sweets-and-desserts` | `fast-foods` | `drinks` | `utensils-and-plates` | `ingredients`
export type GraphicDesignType =  `menus` | `banners` | `flyers` | `logos` | `artworks` | `stickers-and-cliparts` | `brochures` | `other`

export const StockImagesOptions: StockImageType[] = [`appetizers`, `soups`, `main-dishes` , `sweets-and-desserts` , `fast-foods` , `drinks` , `utensils-and-plates` , `ingredients`]

export const GrahicDesignsOptions: GraphicDesignType[] = [`menus` , `banners` , `flyers` , `logos` , `artworks` , `stickers-and-cliparts` , `brochures` , `other`]

export const size_array = [
  `Small (around 256 X 256)`,
  `Medium (around 512x512)`,
  `HD (around 1280x720)`,
  `HDTV (around 1920x1080)`,
  `4k and beyond`
]
export const surr_env_array = [
  "advertisement-meant",
  "being-cooked",
  "being-served",
  'being-delivered',
  `served-outside`,
]

export const soups_array = [`clam-chowder`, `french-onion-soup`, `miso-soup`, `pho`, `ramen`]

export const appetizers_array = [ `baby-back-ribs`, `beef-carpaccio`, `beet-salad`, `bruschetta`,`caprese-salad`, `cevische`, `club-sandwich`, `crab-cake`, `deviled-eggs`,`escargots`, `falafel`, `gnocchi`, `greek-salad`, `guacamole`, `gyoza`, `oyster`, `ravioli`, `samosa`, `sashimi`,` scallops`, `spring-rolls`,`takoyaki`]

export const main_dish_array = [
  `apple pie`, `beignets`, `bibimbap`, `Bread Pudding`,  `cannoli`,  `carrot cake`, `chicken curry`, `chicken wings`, `churros`, `dumplings`,
  `eggs benedict`,  `filet mignon`, `fish and chips`, `french toast`, `fried rice`,  `guacamole`, `hummus`, `lasagna`, `macarons`, `mussels`, `omlette`, `oyster`, `pad thai`, `paella`,  `prime rib`, `risotto`,   `spagetti bolognese`, `steak`, `steak tartare`, `sushi`
]

export const sweets_and_desserts_array = [
  `bread_pudding`,
  `cheesecake`,
  `chocolate cake`,
  `creme brulée`,
  `cupcakes`,
  `donuts`,
  `french fries `,
  `frozen yogurt`,
  `pancakes`,
  `panna cotta`,
  `pecking duck`,
  `red velvet cake`,
  `strawberry shortcake`,
  `tiramisu`,
  `waffles`

]
export const fast_foods_array = [
  `fries`, `burgers`, `tacos`, `pizzas`, `nuggets`, `pretzels`, `hot dogs`, `nachos`, `poutinne`
]
export const drinks_array = [
  `beer`,
  `carbonated drinks`,
  `cocktails`,
  `coffee`,
  `hard alcohol`,
  `juices`,
  `tea`,
  `water`,
  `wine`
]
export const utensils_and_plates_array = [
  `baking tools`,
  `forks`,
  `knives`,
  `ladle`,
  `spatula`,
  `spoons`,
  `vessels`,
  `whisks`,
]
export const material_type = [
  `Wood`,
  `Stainless Steel`
]
export const spices_array = [
  `black pepper`,
  `cardamom`,
  `cinnamon`,
  `coriander`,
  ` masala`,
  `nutmeg`,
  `saffron`,
  `zaatar`,
]
export const fruits_array = [
  `mango`,
  `grapes`,
  `strawberry`,
  `pineapple`,
  `watermellon`,
  `apple`,
  `grapes`,
  `oranges`,
  `berries`,
  `nuts`,
]
export const vegetables_array = [
  `tomatoes`,
  `carrots`,
  `peas`,
  `cucumbers`,
  `cabbage`,
  `broccoli`,
  `beans`,
  `onion`,
  `garlic`,
]
export const menu_size_array = [`Letter`, `Legal`, `Tabloid`, `Half Page`]

export const banner_type_array = [`Facebook Banner`, `Twitter Banner`, `Website Banner`, `Outdoor Banner`]

export const logo_type_array = [
  `text`,
  `food `,
  `utensils & plates`,
  `mascots`
]
export const artwork_styles_array = [
  `eye catchy`,
  `hunger inducing`,
  `painting`,
  `cartoon`,
  `nostalgic`,
  `creative`,
  `unique`,
]
export const stickers_and_cliparts_categories = [
  `pizza`,
  `popcorn`,
  `bread`,
  `burger`,
  `cheese`,
  `taco`,
  `vetables`,
  `ice cream`,
  `hot dog`,
  `donut`,
  `milk`,
]
export const shape_array = [
  `rectangular`,
  `round`,
  `square`,
]