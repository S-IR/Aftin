import { ArrowRightIcon, InboxIcon } from "@heroicons/react/solid";
import React, { useEffect, useMemo, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { MdExpandLess, MdOutlineDoubleArrow } from "react-icons/md";
import { useSpring, animated, config } from "react-spring";

import {
  ListItemButton,
  List,
  Tooltip,
  ListSubheader,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AspectRatio,
  Cake,
  Close,
  Dashboard,
  DinnerDining,
  DoubleArrowSharp,
  Fastfood,
  Flatware,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  LocalBar,
  MenuBook,
  OutdoorGrill,
  Palette,
  RamenDining,
  Restaurant,
  SoupKitchen,
  StickyNote2,
  Straighten,
  Tapas,
  Wallpaper,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  appetizerOptions,
  artworkStyleOptions,
  bannerTypeOptions,
  dishOptions,
  drinkOptions,
  fastFoodOptions,
  grDesStyleOptions,
  ingredientsOptions,
  logoOptions,
  materialOptions,
  menuSizeOptions,
  shapeOptions,
  sizeOptions,
  soupOptions,
  stickerOptions,
  surrEnvOptions,
  sweetOptions,
  cutleriesOptions,
} from "../../constants/SortingSidebar";
import { isMobile } from "react-device-detect";
import { SortColor, SortOption } from "./SortingSidebarComps";
import { determineSorts } from "../../model/client-side/SortingSidebar/determineSorts";
import { SecondDegreeCategory } from "../../typings/image-types/ImageTypes";
import { tagsArray } from "../../constants/upload-image/Tags";
import { handleOptionClick } from "../../model/client-side/SortingSidebar/handleClick";

interface props {
  showSidebar: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
//Changes the url query for the gallery
const SortingSidebar = ({ showSidebar, toggleSidebar }: props) => {
  const router = useRouter();
  const secondDegreeCategory = router.query
    .imageCategory[0] as SecondDegreeCategory;
  const tags = router.query.tags as string | undefined;
  // These selected values also represent if the sort field exists. They are used as boolean checks
  let tagsArr: (typeof tagsArray)[number][] | null = tags
    ? (tags.split(";") as (typeof tagsArray)[number][])
    : null;

  console.log("thirdDe");
  const {
    thirdDegreeCategory,
    size,
    color_scheme,
    menu_size,
    surr_env,
    material,
    banner_type,
    shape,
  } = useMemo(
    () => determineSorts(secondDegreeCategory),
    [secondDegreeCategory]
  );

  // if these fields exist, then display their corresponding component. Then take the current value of tha query and send it to its corresponding components

  return (
    <section
      className={`scroll fixed mr-2 mt-8  w-[216px] min-w-[40px]  md:mt-0 md:bg-none ${
        showSidebar
          ? `z-50 overflow-y-scroll border-r-4 border-black/30 bg-black  md:bg-none `
          : `z-0 overflow-hidden border-r-0 bg-none`
      }  scrollbar h-max    transition-all duration-300  `}
    >
      {showSidebar ? (
        <></>
      ) : (
        <Tooltip title="Toggle sidebar">
          <button
            className={` ${
              showSidebar ? ` opacity-0` : ` opacity-1`
            } absolute top-8 -left-2 z-[50000] ml-2 h-16 w-16 shadow-lg  transition-all duration-500  md:h-8  md:w-8 `}
            onClick={() => toggleSidebar((v) => !v)}
          >
            <KeyboardDoubleArrowRight className="z-50 h-6 w-6 md:h-8 md:w-8 " />
          </button>
        </Tooltip>
      )}
      <animated.div
        className={`${
          showSidebar ? `opacity-1 left-0 w-48` : `-left-52 w-[0px] opacity-0`
        } relative flex h-[100vh]   flex-col items-center transition-all duration-500  `}
      >
        <Tooltip title="Toggle sidebar" arrow>
          <button
            className=" absolute top-8 -right-2 w-auto   "
            onClick={() => toggleSidebar((v) => !v)}
          >
            <KeyboardDoubleArrowLeft
              direction={"right"}
              className={"h-6 w-6 "}
            />
          </button>
        </Tooltip>
        <div className="mt-3 flex h-16 w-full items-center  ">
          <h2 className=" ml-3  h-min w-full text-center   font-serif text-2xl text-white md:text-xl ">
            Filters
          </h2>
        </div>
        <List
          sx={{ width: "100%", maxWidth: 200 }}
          component="nav"
          aria-labelledby="Filter-Options"
        >
          {/* The actual sorting components*/}

          {color_scheme && <SortColor />}
          {thirdDegreeCategory && (
            <SortOption
              optionsArray={thirdDegreeCategory.optionsArray}
              queryName={`thirdDegreeCategory`}
              title={thirdDegreeCategory.title}
              Icon={thirdDegreeCategory.icon}
              isThirdDegreeCategory={true}
            />
          )}
          {surr_env && (
            <SortOption
              optionsArray={surrEnvOptions}
              queryName={`surr_env`}
              title={`Surrounding Environment`}
              Icon={<OutdoorGrill style={{ color: `gold` }} />}
            />
          )}

          {material && (
            <SortOption
              optionsArray={materialOptions}
              queryName={`material`}
              title={`Material`}
              Icon={<Straighten style={{ color: `gold` }} />}
            />
          )}

          {banner_type && (
            <SortOption
              optionsArray={bannerTypeOptions}
              queryName={`banner_type`}
              title={`Banner Type`}
              Icon={<Wallpaper style={{ color: `gold` }} />}
            />
          )}

          {shape && (
            <SortOption
              optionsArray={shapeOptions}
              queryName={`shape`}
              title={`Shape`}
              Icon={<Dashboard style={{ color: `gold` }} />}
            />
          )}

          {menu_size && (
            <SortOption
              optionsArray={menuSizeOptions}
              queryName={`menu_size`}
              title={`Menu Size`}
              Icon={<MenuBook style={{ color: `gold` }} />}
            />
          )}
          {size && (
            <SortOption
              optionsArray={sizeOptions}
              queryName={`size`}
              title={`Size`}
              Icon={<AspectRatio style={{ color: `gold` }} />}
            />
          )}
        </List>
        {tagsArr && (
          <>
            <p className="mt-10 font-serif text-2xl">Searched tags</p>
            <div>
              {tagsArr.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleOptionClick(tag, "tags", router)}
                  className={
                    "relative h-6 w-auto p-1  font-serif text-xs  underline transition-all duration-300 hover:text-red-300 hover:opacity-70"
                  }
                >
                  {tag}
                </button>
              ))}
            </div>
          </>
        )}
      </animated.div>
    </section>
  );
};

export default SortingSidebar;
