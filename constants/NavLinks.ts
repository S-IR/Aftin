export type navLink =
  {
    id: string,
    title: string,
    DropdownState: "ProductsDropdown" | "ImagesDropdown" | "GrDesignsDropdown",
  }



export const navLinks: navLink[] = [
  {
    id: "about-us",
    title: "Products",
    DropdownState: "ProductsDropdown",
  },
  {
    id: "Home",
    title: "Stock Images",
    DropdownState: "ImagesDropdown",


  },
  {
    id: "graphic-designs",
    title: "Graphic Designs",
    DropdownState: "GrDesignsDropdown",

  }
]
