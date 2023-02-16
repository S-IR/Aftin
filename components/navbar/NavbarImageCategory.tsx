import Link from "next/link";
import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { NavbarImageLink } from "../../constants/imageCategories";
import Tooltip from "@mui/material/Tooltip";
import {
  useTransition,
  animated,
  config,
  AnimatedProps,
  useSpringRef,
} from "react-spring";
import Image from "next/image";

interface props {
  Category: NavbarImageLink;
}

const NavbarImageCategory = ({ Category }: props) => {
  return (
    <Link href={`/restaurant-${Category.catName}/${Category.subCatName}`}>
      <div className="flex justify-center align-middle">
        <p className=" mt-12 flex w-24 justify-center rounded-2xl text-center align-middle font-serif font-bold text-white">
          {Category.name}{" "}
        </p>
        <Tooltip
          title={
            <figure className=" h[200px] w-[188px] overflow-hidden ">
              <p>{Category.description}</p>
            </figure>
          }
          arrow
          placement="bottom-start"
        >
          <div className="relative m-1 h-[128px] w-[128px]   cursor-pointer rounded-sm shadow-sm shadow-white brightness-75 filter-none  transition duration-300  ease-in-out hover:shadow-md hover:filter ">
            <Image
              src={`/frontend-used-images/category-images/${Category.catName}/${Category.subCatName}.png`}
              alt={`Food ${Category.name}`}
              layout="fill"
            />
          </div>
        </Tooltip>
      </div>
    </Link>
  );
};

export default NavbarImageCategory;
