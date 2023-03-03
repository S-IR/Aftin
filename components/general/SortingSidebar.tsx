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
import { SMALL_CATEGORY_OF_IMG } from "../../typings/image-types/ImageTypes";
import { tagsArray } from "../../constants/upload-image/Tags";
import { handleOptionClick } from "../../model/client-side/SortingSidebar/handleClick";

interface props {
  showSidebar: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
//Changes the url query for the gallery
const SortingSidebar = ({ showSidebar, toggleSidebar }: props) => {
  const router = useRouter();
  const subCat = router.query.subCat as SMALL_CATEGORY_OF_IMG;
  const tags = router.query.tags as string | undefined;
  // These selected values also represent if the sort field exists. They are used as boolean checks
  let tagsArr: (typeof tagsArray)[number][] = [];
  if (tags !== undefined)
    tagsArr = tags.split(";") as (typeof tagsArray)[number][];

  const {
    paid,
    size,
    color_scheme,
    menu_size,
    appetizer_type,
    surr_env,
    dish_type,
    soup,
    fast_food_type,
    sweet_type,
    drink_type,
    cutlery_type,
    material,
    ingredients,
    style,
    banner_type,
    artwork_style,
    sticker_category,
    shape,
  } = useMemo(() => determineSorts(subCat), [subCat]);

  // if these fields exist, then display their corresponding component. Then take the current value of tha query and send it to its corresponding componentd

  return (
    <section
      className={`scroll fixed mr-2 mt-8 w-[216px] min-w-[40px] md:mt-0 ${
        showSidebar ? `overflow-y-scroll ` : `overflow-hidden`
      }  scrollbar h-max border-r-4 border-black/30   transition-all duration-300  `}
    >
      {showSidebar ? (
        <></>
      ) : (
        <Tooltip title="Toggle sidebar">
          <button
            className={` ${
              showSidebar ? ` opacity-0` : ` opacity-1`
            } absolute top-8 left-0 z-[50000] ml-2 h-16 w-16 shadow-lg  transition-all duration-500  md:h-8  md:w-8 `}
            onClick={() => toggleSidebar((v) => !v)}
          >
            <KeyboardDoubleArrowRight className="h-16 w-16 md:h-8 md:w-8 " />
          </button>
        </Tooltip>
      )}
      <animated.div
        className={`${
          showSidebar
            ? `opacity-1 left-0 w-[75vw] md:w-48`
            : `-left-52 w-[0px] opacity-0`
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
          {style && (
            <SortOption
              optionsArray={grDesStyleOptions}
              queryName={`style`}
              title={`Stylized For`}
              Icon={<Restaurant style={{ color: `gold` }} />}
            />
          )}
          {color_scheme && <SortColor />}
          {surr_env && (
            <SortOption
              optionsArray={surrEnvOptions}
              queryName={`surr_env`}
              title={`Surrounding Environment`}
              Icon={<OutdoorGrill style={{ color: `gold` }} />}
            />
          )}
          {appetizer_type && (
            <SortOption
              optionsArray={appetizerOptions}
              queryName={`appetizer_type`}
              title={`Dish Type`}
              Icon={<Tapas style={{ color: `gold` }} />}
            />
          )}
          {soup && (
            <SortOption
              optionsArray={soupOptions}
              queryName={`soup`}
              title={`Soup Type`}
              Icon={<SoupKitchen style={{ color: `gold` }} />}
            />
          )}
          {fast_food_type && (
            <SortOption
              optionsArray={fastFoodOptions}
              queryName={`fast_food_type`}
              title={`Fast Food Type`}
              Icon={<Fastfood style={{ color: `gold` }} />}
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
          {sweet_type && (
            <SortOption
              optionsArray={sweetOptions}
              queryName={`sweet_type`}
              title={`Sweet Type`}
              Icon={<Cake style={{ color: `gold` }} />}
            />
          )}
          {drink_type && (
            <SortOption
              optionsArray={drinkOptions}
              queryName={`drink_type`}
              title={`Drink Type`}
              Icon={<LocalBar style={{ color: `gold` }} />}
            />
          )}
          {cutlery_type && (
            <SortOption
              optionsArray={cutleriesOptions}
              queryName={`cutlery_type`}
              title={`Utensil Type`}
              Icon={<Restaurant style={{ color: `gold` }} />}
            />
          )}
          {ingredients && (
            <SortOption
              optionsArray={ingredientsOptions}
              queryName={`ingredients`}
              title={`Ingredients Used`}
              Icon={<RamenDining style={{ color: `gold` }} />}
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
          {artwork_style && (
            <SortOption
              optionsArray={artworkStyleOptions}
              queryName={`artwork_style`}
              title={`Artwork Style`}
              Icon={<Palette style={{ color: `gold` }} />}
            />
          )}
          {sticker_category && (
            <SortOption
              optionsArray={stickerOptions}
              queryName={`sticker_category`}
              title={`Sticker Type`}
              Icon={<StickyNote2 style={{ color: `gold` }} />}
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
          {dish_type && (
            <SortOption
              optionsArray={dishOptions}
              queryName={`dish_type`}
              title={`Dish Type`}
              Icon={<DinnerDining style={{ color: `gold` }} />}
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
        {tags && (
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
