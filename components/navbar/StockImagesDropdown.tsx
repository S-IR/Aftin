import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { useSpring, animated } from "react-spring";
import {
  NavbarImageLink,
  StockImageLinks,
} from "../../constants/imageCategories";
import { navLink } from "../../constants/NavLinks";
import NavbarImageCategory from "./NavbarImageCategory";

interface props {}
const StockImagesDropdown = ({}: props) => {
  return (
    <animated.div className=" z-50 h-auto  w-max overflow-hidden rounded-sm bg-gray-900 p-2 shadow-md shadow-gray-800 ">
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
