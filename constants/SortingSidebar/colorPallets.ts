import { color } from "../../typings/typings";

export type colorPallet = { colorPalletName: string, colorPallet?: string[] , imgSrc?: `/${string}`  }
export const colorPallets: colorPallet[] = [
  
  { colorPalletName: 'Not Specified' },
  { colorPalletName: 'White Pallet', 
  colorPallet: [`white`, `gray-200`, `blue-300`, `yellow-200`, `red-400`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/White Pallet.svg` },
  { colorPalletName: 'Dark Pallet', 
  colorPallet: [`black`, `gray-800`, `blue-800`, `yellow-700`, `red-800`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/Dark Pallet.svg` },
  { colorPalletName: 'Warm Color Scheme', 
  colorPallet: [`yellow-400`, `red-500`, `orange-400`, `red-800`, `orange-800`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/Warm Color Scheme.svg` },
  { colorPalletName: 'Pizzeria Orange', 
  colorPallet: [`orange-500`, `orange-300`, `yellow-500`, `yellow-200`, `red-400`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/Pizzeria Orange.svg` },
  { colorPalletName: 'Navy Blue', 
  colorPallet: [`blue-500`, `blue-800`, `blue-300`, `gray-500`, `white`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/Navy Blue.svg` },
  { colorPalletName: 'Elegant Gray', 
  colorPallet: [`gray-500`, `black`, `gray-200`, `white`, `brown-500`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/Elegant Gray.svg` },
  { colorPalletName: 'Red & White', 
  colorPallet: [`red-500`, `red-400`, `white`, `orange-300`, `red-800`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/Red & White.svg` },
  { colorPalletName: 'Red & Orange', 
  colorPallet: [`red-500`, `orange-300`, `white`, `black`, `orange-800`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/Red & Orange.svg` },
  { colorPalletName: 'Wooden Colored', 
  colorPallet: [`brown-800`, `brown-500`, `black`, `orange-800`, `gray-500`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/Wooden Colored.svg` },

  { colorPalletName: 'Custom', 
  colorPallet: [`white`, `white`, `white`, `white`, `white`], imgSrc: `/frontend-used-images/SortingSidebar/colorPallets/Custom.svg` },

]

