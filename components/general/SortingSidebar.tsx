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
import { SortColor, SortOption } from "./SortingSidebarComps";
import { determineSorts } from "../../model/client-side/SortingSidebar/determineSorts";
import { SecondDegreeCategory } from "../../typings/image-types/ImageTypes";
import { tagsArray } from "../../constants/upload-image/Tags";
import { handleOptionClick } from "../../model/client-side/SortingSidebar/handleClick";
import styles from "../../styles/website-gallery/SortingSidebar.module.css";
import AppetizerTypeIcon from "../../public/SortingSidebar/appetizer_type/appetizer_type_icon.svg";
import Image from "next/image";
import { useIsMobile } from "../../hooks/useIsMobile";

interface props {
  showSidebar: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
//Changes the url query for the gallery
/**
 * The sorting sidebar that appears on the website gallery pages
 */
const SortingSidebar = ({ showSidebar, toggleSidebar }: props) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const secondDegreeCategory = router.query
    .imageCategory[0] as SecondDegreeCategory;
  const tags = router.query.tags as string | undefined;
  // These selected values also represent if the sort field exists. They are used as boolean checks
  let tagsArr: (typeof tagsArray)[number][] | null = tags
    ? (tags.split(";") as (typeof tagsArray)[number][])
    : null;

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
      className={`scroll fixed mt-0 w-[216px] min-w-[40px]  overflow-hidden   ${
        showSidebar
          ? `z-50 overflow-y-scroll border-r-2 border-black/30  ${styles.sidebarBG}`
          : `z-0 -translate-x-[180px] overflow-hidden border-r-0 bg-none `
      }  scrollbar h-max transition-transform duration-300 md:transition-none  `}
    >
      {showSidebar ? (
        <></>
      ) : (
        <Tooltip title="Toggle sidebar">
          <button
            className={` ${
              showSidebar ? ` opacity-0` : ` opacity-1`
            } absolute top-8 -right-2 z-[50000] ml-2 h-16 w-16 shadow-lg  transition-all duration-500  md:h-8  md:w-8 `}
            onClick={() => toggleSidebar((v) => !v)}
          >
            <KeyboardDoubleArrowRight className="z-50 h-6 w-6  " />
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
        <div className="mt-3 flex h-16 w-full items-center border-b-2 border-dashed border-yellow-500/40 ">
          <h2 className=" ml-3  h-min w-full text-center font-Handwriting   text-2xl text-white md:text-xl ">
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
              Icon={
                <img
                  src={
                    "/SortingSidebar/surr_env/surrounding_environment_icon.svg"
                  }
                  width={32}
                  height={32}
                  alt={"icon for surrounding environment"}
                />
              }
            />
          )}

          {material && (
            <SortOption
              optionsArray={materialOptions}
              queryName={`material`}
              title={`Material`}
              Icon={
                <img
                  src={"/SortingSidebar/material/material_icon.svg"}
                  width={32}
                  height={32}
                  alt={"icon for material type"}
                />
              }
            />
          )}

          {banner_type && (
            <SortOption
              optionsArray={bannerTypeOptions}
              queryName={`banner_type`}
              title={`Banner Type`}
              Icon={
                <img
                  src={"/SortingSidebar/banner_type/banner_type_icon.svg"}
                  width={32}
                  height={32}
                  alt={"icon for banner type"}
                />
              }
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
              Icon={
                <img
                  src={"/SortingSidebar/menu_size/menu_size_icon.svg"}
                  width={32}
                  height={32}
                  alt={"icon for menu size"}
                />
              }
            />
          )}
          {size && (
            <SortOption
              optionsArray={sizeOptions}
              queryName={`size`}
              title={`Size`}
              Icon={<AspectRatio style={{ color: `gold`, paddingLeft: 2 }} />}
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
