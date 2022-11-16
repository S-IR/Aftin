export type navLink =
  {
    id: string,
    url: `/${string}`
    title: string,
    DropdownState: "ProductsDropdown" | "ImagesDropdown" | "GrDesignsDropdown",
  }



export const navLinks: navLink[] = [
  {
    id: "products",
    url:`/products`,
    title: "Products",
    DropdownState: "ProductsDropdown",
  },
  {
    id: "stock-images",
    url: `/restaurant-stock-images`,
    title: "Stock Images",
    DropdownState: "ImagesDropdown",


  },
  {
    id: "graphic-designs",
    url: `/restaurant-graphic-designs`,
    title: "Graphic Designs",
    DropdownState: "GrDesignsDropdown",

  }
]
