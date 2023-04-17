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
import { SecondDegreeCategory } from "../../../typings/image-types/ImageTypes";
import { handleOptionClick } from "../../../model/client-side/SortingSidebar/handleClick";
import styles from "../../../styles/image-editor/image-editor.module.css";
import { uploadImageToCanvas } from "../../../model/client-side/image-editor/Upload";
import { activeSidebarType } from "./SidebarIcon";
import { canvasPagesCount } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { useCanvasState } from "../../../zustand/CanvasStore/store";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>;
}

const ImagesButtons = ({ setActiveSidebar }: props) => {
  const [ADD_IMAGE, { page: pageId }] = useCanvasState((state) => [
    state.ADD_IMAGE,
    state.selected,
  ]);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    value: SecondDegreeCategory;
  }>({ name: "Main Dishes", value: "main-dishes" });

  //POPOVER CODE
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUpload = <T extends File>(acceptedFiles: T[]): void => {
    uploadImageToCanvas(ADD_IMAGE, pageId, acceptedFiles);
    setActiveSidebar("Stylize");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: handleUpload,
  });

  return (
    <section
      className={`z-50 h-[90vh] w-[336px] bg-gradient-to-br  ${styles.buttonMenusBG} flex flex-col pb-5 text-white shadow-md shadow-gray-500 `}
    >
      <div className="flex flex-col items-center justify-center space-y-1  py-6 align-middle shadow-lg">
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
        <div className="relative h-auto w-5/6">
          <button
            className="relative  my-1 h-12 w-full rounded-sm border-t-4   border-orange-700 bg-yellow-800  p-2  font-Handwriting text-2xl text-orange-200  shadow-brown-500 drop-shadow-md  transition-all duration-300   ease-in-out hover:bg-yellow-500 active:shadow-none disabled:bg-yellow-200/80 "
            onClick={openPopover}
            id={"category-popover"}
          >
            {selectedCategory.name}
          </button>
          <button className="z-10" onClick={openPopover} id={"filter-popover"}>
            <Tune
              htmlColor="#fb923c"
              className="absolute top-3 right-8 h-10 w-10  rounded-full p-2 transition-all  duration-300 ease-in-out hover:scale-110 hover:bg-slate-300/20 "
            />
          </button>
          <FilterPopover
            open={anchorEl?.id === "filter-popover"}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            secondDegCat={selectedCategory.value}
          />
        </div>

        <CategoriesPopover
          open={anchorEl?.id === "category-popover"}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
        {/* INPUT TEXT ELEMENTS  */}

        {/* SHOW IMAGES */}
        {/* UNCOMMENT THIS AFTER DEVLELOPMENT  */}
        {/* <ImagesGrid selectedCategory={selectedCategory} pageId={pageId} /> */}
      </div>
    </section>
  );
};

export default ImagesButtons;
