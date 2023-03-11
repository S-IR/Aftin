import React, { useCallback, useState } from "react";
import { BiCrop, BiFilter } from "react-icons/bi";
import { MdFindReplace, MdRotateRight, MdTune } from "react-icons/md";
import { imageData } from "../../../features/canvasPages/canvas-elements/imageHandlingReducer";
import { imageFilter } from "../../../features/canvasPages/canvas-elements/filtersHandlingReducers";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { AppDispatch } from "../../../Redux/store";
import Button from "../../general/Button";
import { Crop, Delete } from "@mui/icons-material";
import { Filter } from "../Sidebar";
import { canvasSelected } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";

import styles from "../../../styles/image-editor/image-editor.module.css";
import { imageFilterProperties } from "../../../constants/image-editor/imageFilters";
import { useCanvasState } from "../../../zustand/CanvasStore/store";
import { Alert } from "@mui/material";
interface props {
  imageData: imageData;
  selected: canvasSelected;
  imageFilter: imageFilterProperties;
}

const ImageElementProperties = ({
  imageData,
  selected,
  imageFilter,
}: props) => {
  const { page: pageId, element: elementId } = selected;
  const [deleteWarningHappened, setDeleteWarningHappened] = useState(false);
  const [SET_CROP, SET_HAS_CROP, DELETE_ELEMENT, RESET_IMAGE_FILTER] =
    useCanvasState(
      useCallback(
        (state) =>
          [
            state.SET_CROP,
            state.SET_HAS_CROP,
            state.DELETE_ELEMENT,
            state.RESET_IMAGE_FILTER,
          ] as const,
        []
      )
    );

  const brightness = imageFilter?.brightness;
  const contrast = imageFilter?.contrast;
  const blur = imageFilter?.blur;

  if (imageData.crop === true) {
    return (
      <div className="flex h-full w-full items-center justify-center align-middle">
        <button
          className=" group flex h-24 w-24 items-center justify-center rounded-sm bg-gradient-to-b from-yellow-700 to-yellow-800 p-2 font-serif  font-bold shadow-black drop-shadow-lg  transition-all duration-300 hover:bg-yellow-500 hover:drop-shadow-md active:drop-shadow-none"
          onClick={() => {
            SET_CROP(pageId as number, elementId as number);
            SET_HAS_CROP(pageId as number, elementId as number);
          }}
        >
          Save Crop
        </button>
      </div>
    );
  }
  if (pageId === null || elementId === null) {
    console.log("there is no selected image or page for the filter component");
    return <></>;
  }

  return (
    <>
      <div className="mt-4 w-full border-b-4 border-gray-200 py-5">
        <Filter
          key={"brightness"}
          option={brightness}
          label={"brightness"}
          pageId={pageId}
          elementId={elementId}
        />
        <Filter
          key={"contrast"}
          option={contrast}
          label={"contrast"}
          pageId={pageId}
          elementId={elementId}
        />
        <Filter
          key={"blur"}
          option={blur}
          label={"blur"}
          pageId={pageId}
          elementId={elementId}
        />
        <div className="flex w-full items-center justify-center">
          <button
            className={` my-8  h-12 w-48 ${styles.generalButton} text-xl `}
            onClick={() => RESET_IMAGE_FILTER(pageId, elementId)}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Edit buttons div */}
      <div className="mt-6 flex w-full flex-col items-center justify-center space-y-6 align-middle">
        {/* <button
          className="flex h-12  w-56  items-center justify-center bg-yellow-900 bg-opacity-70 align-middle shadow-gray-200 drop-shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-lg "
          onClick={() => SET_CROP(pageId as number, elementId as number)}
        >
          <div className="flex items-center justify-center align-middle ">
            <Crop className="m-2 h-8 w-8" />
            Crop
          </div>
        </button> */}
        <button className="flex h-12  w-56  items-center justify-center bg-yellow-900 bg-opacity-70 align-middle shadow-gray-200 drop-shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-lg ">
          <div className="flex items-center justify-center align-middle ">
            <MdFindReplace className="m-2 h-8 w-8" />
            Replace
          </div>
        </button>
        <div className=" flex justify-center">
          <button
            className=" flex h-12  w-56  items-center justify-center bg-yellow-900 bg-opacity-70 align-middle  shadow-gray-200 drop-shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-lg"
            onClick={(e) => {
              if (pageId === 0 && elementId === 0 && !deleteWarningHappened) {
                return setDeleteWarningHappened(true);
              }
              setDeleteWarningHappened(false);
              DELETE_ELEMENT(pageId, elementId);
            }}
          >
            <Delete className="m-2 h-8 w-8" />
            Delete Component
          </button>
        </div>
        {deleteWarningHappened === true ? (
          <Alert severity="error">
            If you delete this component all of your editing progress on the
            page will be lost. Click again on the delete button if you want to
            continue
          </Alert>
        ) : (
          <></>
        )}
      </div>
      {/* Crop button */}

      <div className="absolute bottom-0 left-5  m-2 flex h-12 w-60 items-center justify-center rounded-full  bg-blue-800 bg-opacity-60 font-bold shadow-md shadow-gray-500">
        H :{" "}
        <p className="m-2 underline">
          {(imageData.height * imageData.scaleY).toFixed(0)}
        </p>
        W :{" "}
        <p className="m-2 underline">
          {(imageData.width * imageData.scaleX).toFixed(0)}
        </p>{" "}
        |
        <MdRotateRight className="m-2 h-5 w-5" />
        <p>{imageData.rotate}</p>
      </div>
    </>
  );
};

export default ImageElementProperties;
