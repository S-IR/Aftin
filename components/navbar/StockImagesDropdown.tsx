import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import {
  NavbarImageLink,
  StockImageLinks,
} from "../../constants/imageCategories";
import NavbarImageCategory from "./NavbarImageCategory";

interface props {
  setActiveSidebar: Dispatch<
    SetStateAction<
      | "ProfileDropdown"
      | "ProductsDropdown"
      | "ImagesDropdown"
      | "GrDesignsDropdown"
      | null
    >
  >;
}
const StockImagesDropdown = ({ setActiveSidebar }: props) => {
  return (
    <section
      className=" z-50 h-auto  w-max overflow-hidden rounded-sm bg-gray-900 p-2 shadow-md shadow-gray-800 "
      onMouseLeave={() => setActiveSidebar(null)}
    >
      <div className="grid grid-cols-3">
        {StockImageLinks.map((StockImageLink: NavbarImageLink) => (
          <NavbarImageCategory
            Category={StockImageLink}
            key={StockImageLink.name}
          />
        ))}
      </div>
    </section>
  );
};

export default StockImagesDropdown;
