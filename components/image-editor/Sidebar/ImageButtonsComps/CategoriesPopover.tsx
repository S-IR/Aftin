import { Popover } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";
import {
  GrDesignLinks,
  AdvertImagesLinks,
} from "../../../../constants/Navbar/imageCategories";
import { SecondDegreeCategory } from "../../../../typings/image-types/ImageTypes";

interface props {
  open: boolean;
  selectedCategory: { name: string; value: string };
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<{
      name: string;
      value: SecondDegreeCategory;
    }>
  >;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

const CategoriesPopover = ({
  open,
  selectedCategory,
  setSelectedCategory,
  anchorEl,
  setAnchorEl,
}: props) => {
  return (
    <Popover
      id={"select-image-popover"}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      transitionDuration={500}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className="m-2 flex h-auto w-auto space-x-1 bg-black text-black shadow-lg shadow-gray-900">
        <div className="flex flex-grow flex-col items-center border-r-2 border-white p-4">
          <p className="my-2 font-serif text-2xl  italic text-white">
            Advertisement Images
          </p>
          {AdvertImagesLinks.map((category) => {
            const isSelected = selectedCategory.name === category.name;
            return (
              <button
                className={`${
                  isSelected ? `bg-gray-500` : `bg-none`
                }  my-3 ml-4 flex w-[196px] flex-row items-center rounded-l-full align-middle shadow-sm shadow-gray-500 transition-all duration-300 hover:shadow-gray-200`}
                key={category.name}
                onClick={() =>
                  setSelectedCategory({
                    name: category.name,
                    value: category.value as SecondDegreeCategory,
                  })
                }
              >
                <Image
                  src={`/frontend-used-images/category-images/${category.catName}/${category.secondDegCatName}.png`}
                  width={48}
                  height={48}
                  style={{ objectFit: `cover` }}
                  alt={`image of ${category.name}`}
                  className={"rounded-full"}
                />
                <p className="mx-2 text-gray-200">{category.name}</p>
              </button>
            );
          })}
        </div>
        <div className="flex flex-grow flex-col items-center border-l-2 border-white">
          <div className="flex flex-grow flex-col items-center border-l-2   border-gray-300 p-4">
            <p className="my-2 font-serif text-2xl  italic text-white">
              Graphic Designs
            </p>
            {GrDesignLinks.map((category) => {
              const isSelected = selectedCategory.name === category.name;
              return (
                <button
                  className={`${
                    isSelected ? `bg-gray-500` : `bg-none`
                  } hover:-shadow-gray-200 my-3 ml-4 flex w-[196px] flex-row items-center rounded-l-full align-middle shadow-sm shadow-gray-500 transition-all duration-300  ease-in-out `}
                  key={category.name}
                  onClick={() =>
                    setSelectedCategory({
                      name: category.name,
                      value: category.value as SecondDegreeCategory,
                    })
                  }
                >
                  <Image
                    src={`/frontend-used-images/category-images/${category.catName}/${category.secondDegCatName}.png`}
                    width={48}
                    height={48}
                    style={{ objectFit: `cover` }}
                    alt={`image of ${category.name}`}
                    className={"rounded-full"}
                  />
                  <p className="mx-2 text-gray-200">{category.name}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default CategoriesPopover;
