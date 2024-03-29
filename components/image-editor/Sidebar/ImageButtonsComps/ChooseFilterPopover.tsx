import { Popover } from "@mui/material";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { determineSorts } from "../../../../model/client-side/SortingSidebar/determineSorts";
import { SecondDegreeCategory } from "../../../../typings/image-types/ImageTypes";
import {
  SortColor,
  SortOption,
} from "../../../general/SortingSidebarComps/index";

import {
  AspectRatio,
  Cake,
  Dashboard,
  DinnerDining,
  Fastfood,
  Flatware,
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
  Tune,
  Wallpaper,
} from "@mui/icons-material";

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
} from "../../../../constants/SortingSidebar";
import { handleOptionClick } from "../../../../model/client-side/SortingSidebar/handleClick";
interface props {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  secondDegCat: SecondDegreeCategory;
}

/**
 * Lets users choose the second category of images that they would like to edit
 */
const ChooseFilterPopover = ({
  open,
  anchorEl,
  setAnchorEl,
  secondDegCat,
}: props) => {
  const {
    thirdDegreeCategory,
    size,
    surr_env,
    color_scheme,
    material,
    menu_size,
    banner_type,
    shape,
  } = useMemo(() => determineSorts(secondDegCat), [secondDegCat]);
  const router = useRouter();
  const description = router.query.description;

  const handleDescriptionEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === `Enter`) {
      handleOptionClick(target.value, `description`, router);
    } else {
      return;
    }
  };

  return (
    <Popover
      id={"select-filter-popover"}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      transitionDuration={500}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className=" h-[620px] w-auto border-4 border-dashed border-yellow-700 bg-brown-800 text-white shadow-lg shadow-yellow-700  ">
        {color_scheme && <SortColor />}
        {thirdDegreeCategory && (
          <SortOption
            optionsArray={thirdDegreeCategory.optionsArray}
            queryName={`thirdDegreeCategory`}
            title={thirdDegreeCategory.title}
            Icon={thirdDegreeCategory.icon}
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
        <div className="relative flex w-full flex-shrink items-center justify-center align-middle ">
          <input
            id={"description-input"}
            type="text"
            onKeyDown={(e) => handleDescriptionEnter(e)}
            placeholder="Describe your desired image"
            className="my-1 !ml-1 h-10  !w-5/6 rounded-sm bg-yellow-800 !text-center text-sm  text-white transition-all duration-300  focus:bg-yellow-700 active:border-none "
            defaultValue={description}
          />
        </div>
      </div>
    </Popover>
  );
};

export default ChooseFilterPopover;
