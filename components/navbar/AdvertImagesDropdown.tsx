import Image from "next/legacy/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { useSpring, animated } from "react-spring";
import {
  NavbarImageLink,
  AdvertImagesLinks,
} from "../../constants/Navbar/imageCategories";
import { navLink } from "../../constants/Navbar/NavLinks";
import NavbarImageCategory from "./NavbarImageCategory";

interface props {}
const AdvertImagesDropdown = ({}: props) => {
  return (
    <animated.div className=" z-50 h-auto  w-max overflow-hidden rounded-sm bg-gray-900 p-2 pb-4 shadow-md ">
      <div className="grid grid-cols-5">
        {AdvertImagesLinks.map((AdvertImageLink: NavbarImageLink) => (
          <NavbarImageCategory
            Category={AdvertImageLink}
            key={AdvertImageLink.name}
          />
        ))}
      </div>
    </animated.div>
  );
};

export default AdvertImagesDropdown;
