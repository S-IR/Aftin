export type navLink = {
  id: string;
  url: `/${string}`;
  title: string;
  DropdownState:
    | "MoreDropdown"
    | "ImagesDropdown"
    | "GrDesignsDropdown"
    | "ProfileDropdown"
    | null;
};

export const navLinks: navLink[] = [
  {
    id: "more",
    url: `/products`,
    title: "More",
    DropdownState: "MoreDropdown",
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
  },
];
