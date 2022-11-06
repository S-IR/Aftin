import { color } from "../../typings";

export type colorPallet = { colorPalletName: string, colorPallet: color[] | null, imgSrc: `/${string}` | null }
export const colorPallets: colorPallet[] = [

  { colorPalletName: 'Wooden Colored', colorPallet: null, imgSrc: null },
  { colorPalletName: 'White Pallet', colorPallet: [`white`, `light gray`, `light blue`, `light yellow`, `light red`], imgSrc: `/frontend-used-images/SortingSidebar/Colors/White-Pallet` },
  { colorPalletName: 'Dark Pallet', colorPallet: [`black`, `dark gray`, `dark blue`, `dark yellow`, `dark red`], imgSrc: `/frontend-used-images/SortingSidebar/Colors/Dark-Pallet` },
  { colorPalletName: 'Warm Color Scheme', colorPallet: [`yellow`, `red`, `orange`, `dark red`, `dark orange`], imgSrc: `/frontend-used-images/SortingSidebar/Colors/Warm-Color-Scheme` },
  { colorPalletName: 'Pizzeria Orange', colorPallet: [`orange`, `light orange`, `dark orange`, `light yellow`, `light red`], imgSrc: `/frontend-used-images/SortingSidebar/Colors/Pizzeria-Orange` },
  { colorPalletName: 'Navy Blue', colorPallet: [`blue`, `dark blue`, `light blue`, `gray`, `white`], imgSrc: `/frontend-used-images/SortingSidebar/Colors/Navy-Blue` },
  { colorPalletName: 'Elegant Gray', colorPallet: [`gray`, `black`, `light gray`, `white`, `brown`], imgSrc: `/frontend-used-images/SortingSidebar/Modern-Gray` },
  { colorPalletName: 'Red & White', colorPallet: [`red`, `light red`, `white`, `orange`, `light orange`], imgSrc: `/frontend-used-images/SortingSidebar/Red-White` },
  { colorPalletName: 'Red & Orange', colorPallet: [`red`, `orange`, `white`, `black`, `dark orange`], imgSrc: `/frontend-used-images/SortingSidebar/Elegant-Orange` },
  { colorPalletName: 'Wooden Colored', colorPallet: [`dark brown`, `brown`, `black`, `dark orange`, `gray`], imgSrc: `/frontend-used-images/SortingSidebar/Wooden-Colored` },

]

