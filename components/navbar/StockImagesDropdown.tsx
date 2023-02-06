import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { useSpring, animated } from "react-spring";
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
  const style = useSpring({
    from: { opacity: 0, translateX: -20 },
    to: { opacity: 1, translateX: 0 },
    config: { duration: 300 },
  });

  return (
    <animated.div
      style={style}
      className=" z-50 h-auto  w-max overflow-hidden rounded-sm bg-gray-900 p-2 shadow-md shadow-gray-800 "
    >
      <div className="grid grid-cols-3">
        {StockImageLinks.map((StockImageLink: NavbarImageLink) => (
          <NavbarImageCategory
            Category={StockImageLink}
            key={StockImageLink.name}
          />
        ))}
      </div>
    </animated.div>
  );
};

export default StockImagesDropdown;
