import { SearchIcon } from "@heroicons/react/solid";
import { ArrowLeft, ArrowRight, Filter, Tune } from "@mui/icons-material";
import { Card, Grid, Popover } from "@mui/material";
import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSpring,
  animated,
  config,
  to,
  AnimatedComponent,
} from "react-spring";
import {
  CategoriesPopover,
  FilterPopover,
  ImagesGrid,
} from "./ImageButtonsComps/index";
import { SMALL_CATEGORY_OF_IMG } from "../../../typings/image-types/ImageTypes";
import { handleOptionClick } from "../../../model/client-side/SortingSidebar/handleClick";
import styles from "../../../styles/image-editor/image-editor.module.css";
import { uploadImageToCanvas } from "../../../model/client-side/image-editor/Upload";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { activeSidebarType } from "./SidebarIcon";
import { canvasPagesCount } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>;
}

const ImagesButtons = ({ setActiveSidebar }: props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    value: SMALL_CATEGORY_OF_IMG;
  }>({ name: "Fast Foods", value: "fast-foods" });

  //POPOVER CODE
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDescriptionEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === `Enter`) {
      handleOptionClick(target.value, `description`, router);
    } else {
      return;
    }
  };
  const uploadPageId = useAppSelector(canvasPagesCount).present.selected.page;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadImageToCanvas(dispatch, uploadPageId, e.target.files);
    setActiveSidebar("Stylize");
  };
  const description = router.query.description;

  return (
    <section
      className={`h-[90vh] w-[416px] bg-gradient-to-br  ${styles.buttonMenusBG} flex flex-col text-white shadow-md shadow-gray-500`}
    >
      <div className="my-6 flex flex-col items-center justify-center space-y-4 align-middle shadow-lg">
        <label
          htmlFor="image_input"
          className="mb-2 block pt-2  text-center font-Handwriting text-4xl font-[800] dark:text-gray-300 md:text-4xl "
        >
          Upload <br></br> Image
        </label>
        <input
          className="mx-auto w-full cursor-pointer rounded p-4   "
          id="image_input"
          type="file"
          onChange={(e) => handleUpload(e)}
        ></input>
      </div>

      {/* SELECT THE CATEGORY CODE */}
      <div className="scrollbar mt-3 flex flex-col items-center justify-center space-y-4 overflow-y-scroll align-middle">
        <button
          className="  my-1 h-16 w-48 rounded-sm border-t-4   border-orange-700 bg-yellow-800  p-2  font-Handwriting text-4xl shadow-brown-500  drop-shadow-md transition-all  duration-300 ease-in-out   hover:bg-yellow-500 active:shadow-none disabled:bg-yellow-200/80 md:w-96 "
          onClick={openPopover}
          id={"category-popover"}
        >
          {selectedCategory.name}
        </button>
        <CategoriesPopover
          open={anchorEl?.id === "category-popover"}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
        {/* INPUT TEXT ELEMENTS  */}
        <div className="relative flex w-full flex-shrink items-center justify-center align-middle ">
          <input
            id={"description-input"}
            type="text"
            onKeyDown={(e) => handleDescriptionEnter(e)}
            placeholder="Describe your desired image"
            className="my-1 !ml-1 h-12 !w-48 rounded-sm bg-yellow-800 !text-center text-white  transition-all duration-300 focus:bg-yellow-700  active:border-none md:!w-96"
            defaultValue={description}
          />
          <button onClick={openPopover} id={"filter-popover"}>
            <Tune
              htmlColor="#fb923c"
              className="absolute top-2 right-8 h-10 w-10  rounded-full p-2 transition-all  duration-300 ease-in-out hover:scale-110 hover:bg-slate-300/20 "
            />
          </button>
          <FilterPopover
            open={anchorEl?.id === "filter-popover"}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            subCat={selectedCategory.value}
          />
        </div>

        {/* SHOW IMAGES */}
        <ImagesGrid selectedCategory={selectedCategory} />
      </div>
    </section>
  );
};

export default ImagesButtons;
