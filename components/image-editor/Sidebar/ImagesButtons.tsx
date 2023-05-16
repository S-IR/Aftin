import { SearchIcon } from "@heroicons/react/solid";
import { ArrowLeft, ArrowRight, Filter, Tune } from "@mui/icons-material";
import { Card, Grid, Popover } from "@mui/material";
import { FirebaseError } from "firebase/app";
import Image from "next/legacy/image";
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
  FiltesPopover,
  ChooseFilterPopover,
  ImagesGrid,
} from "./ImageButtonsComps/index";
import { SecondDegreeCategory } from "../../../typings/image-types/ImageTypes";
import { handleOptionClick } from "../../../model/client-side/SortingSidebar/handleClick";
import styles from "../../../styles/image-editor/image-editor.module.css";
import { uploadImageToCanvas } from "../../../model/client-side/image-editor/Upload";
import { activeSidebarType } from "./SidebarIcon";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useCanvasState } from "../../../zustand/CanvasStore/store";

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>;
}

/**
 * Lets people import images from us or upload them from their device
 * @param param0
 * @returns
 */
const ImagesButtons = ({ setActiveSidebar }: props) => {
  const [ADD_IMAGE, { page: pageId }, w, h, CHANGE_PAGE_SIZE] = useCanvasState(
    (state) => [
      state.ADD_IMAGE,
      state.selected,
      state.w,
      state.h,
      state.CHANGE_PAGE_SIZE,
    ]
  );

  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    value: SecondDegreeCategory;
  }>({ name: "Main Dishes", value: "main-dishes" });

  //Popover code
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //Upload code
  const handleUpload = <T extends File>(acceptedFiles: T[]): void => {
    uploadImageToCanvas(
      ADD_IMAGE,
      CHANGE_PAGE_SIZE,
      w,
      h,
      pageId,
      acceptedFiles
    );
    setActiveSidebar("Stylize");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: handleUpload,
  });

  return (
    <section
      className={`z-50 h-[90vh] w-[20vw] bg-gradient-to-br  ${styles.buttonMenusBG} flex flex-col pb-5 text-white shadow-md shadow-gray-500 `}
    >
      <div className="flex cursor-pointer flex-col items-center justify-center  space-y-1 py-6 align-middle shadow-lg">
        <div
          className={`relative  h-12 w-72 ${
            isDragActive ? `bg-orange-300/60` : ``
          } transition-all duration-300 `}
          {...getRootProps()}
        >
          <input
            className={`  ${styles.input}  `}
            id="image_input"
            type="file"
            title=" "
            {...getInputProps()}
          />
          <div
            className={`${styles.fileDummy} flex items-center justify-center align-middle`}
          >
            Upload an Image
          </div>
        </div>
      </div>

      {/* SELECT THE CATEGORY CODE */}
      <div className="scrollbar l mt-6 flex flex-col items-center justify-center space-y-4 overflow-y-hidden  align-middle">
        <p className="w-full  text-center font-Handwriting text-4xl ">
          Import an Image
        </p>
        <div className="relative h-auto w-5/6 ">
          <button
            className="relative  my-1 h-12 w-full rounded-sm border-t-4   border-orange-700 bg-yellow-800  p-2  font-Handwriting text-2xl text-orange-200  shadow-brown-500 drop-shadow-md  transition-all duration-300   ease-in-out hover:bg-yellow-500 active:shadow-none disabled:bg-yellow-200/80 "
            onClick={openPopover}
            id={"category-popover"}
          >
            {selectedCategory.name}
          </button>
          <button
            className="group z-10 h-auto w-auto"
            onClick={openPopover}
            id={"filter-popover"}
          >
            <Tune
              htmlColor="#fb923c"
              className="absolute top-3 right-8 !h-8 !w-8  rounded-full bg-white/0 p-2  transition-all duration-500  hover:scale-110 group-hover:bg-slate-300/20 "
            />
          </button>
          <ChooseFilterPopover
            open={anchorEl?.id === "filter-popover"}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            secondDegCat={selectedCategory.value}
          />
        </div>

        <FiltesPopover
          open={anchorEl?.id === "category-popover"}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
        {/* INPUT TEXT ELEMENTS  */}

        {/* SHOW IMAGES */}
        {/* UNCOMMENT THIS AFTER DEVELOPMENT  */}
        {/* <ImagesGrid selectedCategory={selectedCategory} pageId={pageId} /> */}
      </div>
    </section>
  );
};

export default ImagesButtons;
