import Popover from "@mui/material/Popover";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  dayCategories,
  nightCategories,
  previewCategoryType,
  previewCategoryValues,
} from "../../constants/previews/previewCategories";
import { previewSelectedCategory } from "../../pages/previews";

interface props {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  selectedCategory: previewSelectedCategory;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<previewSelectedCategory>
  >;
}

const PhysicalOptions = ({
  open,
  anchorEl,
  setAnchorEl,
  selectedCategory,
  setSelectedCategory,
}: props) => {
  const [environment, setEnvironment] = useState<"day" | "night">("day");
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      transitionDuration={500}
      PaperProps={{}}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className="flex h-auto w-auto !flex-col items-center justify-center overflow-hidden border-2 border-orange-800 bg-current !bg-black  align-middle md:flex-row ">
        {/* DAY PART  */}

        <div className=" grid h-auto w-auto grid-cols-2 items-center justify-center align-middle  ">
          {dayCategories.map((dayCategory) => {
            const selected = selectedCategory.value === dayCategory.value;

            return (
              <div
                key={dayCategory.value}
                className=" group relative  flex h-48 w-48 cursor-pointer flex-col items-center justify-center space-y-4  align-middle transition-all duration-300 "
              >
                <Image
                  src={dayCategory.source}
                  layout={"fill"}
                  className={
                    "absolute top-0 left-0 brightness-50 filter transition-all duration-300 group-hover:brightness-75"
                  }
                  alt={`preview image for ${dayCategory.name}`}
                />
                <button
                  onClick={() =>
                    setSelectedCategory({
                      name: dayCategory.name,
                      value: dayCategory.value,
                    })
                  }
                  className={`webkit !m-0 h-16 w-36 rounded-l-md rounded-r-md stroke-black font-serif  text-2xl  drop-shadow-2xl transition-all duration-300 hover:border-gray-300  ${
                    selected ? `text-orange-500` : `text-white`
                  } transition-all duration-300 `}
                >
                  {dayCategory.name}
                </button>
              </div>
            );
          })}
        </div>
        {/* NIGHT PART  */}
        {/* <div className="ml-1 flex grow flex-col items-center justify-center  align-middle ">
          <h2 className="my-2 p-4 font-serif text-4xl text-orange-300">
            Night Environments
          </h2>
          <div className="grid h-auto w-auto grid-cols-2 items-center justify-center align-middle    ">
            {nightCategories.map((nightCategory) => {
              const selected = selectedCategory.value === nightCategory.value;

              return (
                <div
                  key={nightCategory.value}
                  className=" group relative  flex h-32 w-32 cursor-pointer flex-col items-center justify-center space-y-4  align-middle transition-all duration-300 "
                >
                  <Image
                    src={nightCategory.source}
                    layout={"fill"}
                    className={
                      "absolute top-0 left-0 brightness-50 filter transition-all duration-300 group-hover:brightness-75"
                    }
                    alt={`preview image for ${nightCategory.name}`}
                  />
                  <button
                    onClick={() =>
                      setSelectedCategory({
                        name: nightCategory.name,
                        value: nightCategory.value,
                      })
                    }
                    className={`webkit !m-0 h-16 w-36 rounded-l-md rounded-r-md stroke-black font-serif  text-2xl  drop-shadow-2xl transition-all duration-300 hover:border-gray-300  ${
                      selected ? `text-orange-500` : `text-white`
                    } transition-all duration-300 `}
                  >
                    {nightCategory.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div> */}
        <div className="flex items-center justify-center space-x-5 align-middle">
          <button
            className="text-md mb-2 h-14 w-32 rounded-sm bg-brown-900/50 font-serif font-thin text-red-300 no-underline shadow-md shadow-black transition-all  duration-500 hover:bg-brown-900"
            onClick={() => setEnvironment(`day`)}
          >
            Day Environments
          </button>
          <button
            className="text-md mb-2 h-14 w-32 rounded-sm bg-brown-900/50 font-serif font-thin text-red-300 no-underline shadow-md shadow-black transition-all  duration-500 hover:bg-brown-900"
            onClick={() => setEnvironment("night")}
          >
            Night Environments
          </button>
        </div>
      </div>
    </Popover>
  );
};
export default PhysicalOptions;
