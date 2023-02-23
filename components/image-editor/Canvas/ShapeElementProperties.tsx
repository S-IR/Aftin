import React, { ChangeEvent } from "react";
import { MdFindReplace } from "react-icons/md";
import { shapeData } from "../../../features/canvasPages/canvas-elements/shapeHandlingReducer";
import { AppDispatch } from "../../../Redux/store";
import Button from "../../general/Button";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Box,
  FormControl,
  Select,
  OutlinedInput,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import {
  changeStrokeColor,
  handleDelete,
} from "../../../model/client-side/image-editor/EditCanvasElement";
import { useAppSelector } from "../../../Redux/hooks";
import {
  changeShapeFill,
  fillWithPattern,
  setStrokeWidth,
} from "../../../model/client-side/image-editor/EditCanvasShape";
import { shapeFilter } from "../../../features/canvasPages/canvas-elements/filtersSlice";
import { handleRemovePattern } from "../../../model/client-side/image-editor/EditCanvasImage";
import {
  canvasPagesCount,
  canvasSelected,
} from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { Delete } from "@mui/icons-material";
import styles from "../../../styles/image-editor/image-editor.module.css";
interface props {
  shapeData: shapeData;
  dispatch: AppDispatch;
  selected: canvasSelected;
  shapeFilter: shapeFilter;
}

const ShapeElementProperties = ({
  shapeData,
  dispatch,
  selected,
  shapeFilter,
}: props) => {
  const { page: pageId, element: elementId } = selected;

  if (pageId === null || elementId === null) {
    console.log(
      "this shape element property somehow appeared without there being something selected"
    );
    return null;
  }
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center pt-4 align-middle">
        <TextField
          className="mt-2 ml-2  w-48  cursor-pointer bg-yellow-800  shadow-sm shadow-black transition-all duration-300 hover:shadow-none "
          type={"color"}
          InputLabelProps={{
            className: `!text-xl flex items-center justify-center align-middle font-bold italic`,
          }}
          id="select-stroke-width"
          label="Color"
          value={shapeFilter.filter.fill}
          variant="outlined"
          onChange={(e) =>
            changeShapeFill(
              dispatch,
              pageId,
              elementId,
              e.target.value as `#${string}`
            )
          }
        />

        {/* Stroke width */}
        <TextField
          className="mt-5 ml-2  w-48 cursor-pointer bg-yellow-800  shadow-sm shadow-black transition-all duration-300 hover:shadow-none"
          InputLabelProps={{
            className: `!text-xl font-bold flex items-center justify-center align-middle italic`,
          }}
          id="select-stroke-width"
          label="Stroke Width"
          value={shapeData.strokeWidth}
          variant="outlined"
          onChange={(e) =>
            setStrokeWidth(dispatch, pageId, elementId, Number(e.target.value))
          }
        />

        {/* Stroke color */}
        <TextField
          className="mt-5 ml-2  w-48 cursor-pointer bg-yellow-800  shadow-sm shadow-black transition-all duration-300 hover:shadow-none"
          InputLabelProps={{
            className: `!text-xl font-bold flex items-center justify-center align-middle italic`,
          }}
          type="color"
          id="select-stroke-width"
          label="Stroke Color"
          defaultValue={shapeFilter.filter.stroke}
          variant="outlined"
          onChange={(e) =>
            changeStrokeColor(
              dispatch,
              pageId,
              elementId,
              e.target.value as `#${string}`
            )
          }
        />
      </div>
      {/* Color Fill */}

      {/* image pattern         */}

      <div className="my-6 flex flex-col items-center justify-center space-y-1 align-middle shadow-lg">
        <div className="relative my-2 h-16 w-72 ">
          <input
            className={`  ${styles.input}  `}
            id="image_input"
            type="file"
            title=" "
            onChange={(e) =>
              fillWithPattern(dispatch, pageId, elementId, e.target.files)
            }
          />
          <div
            className={`${styles.fileDummy} flex items-center justify-center align-middle`}
          >
            Upload a pattern
          </div>
        </div>
      </div>

      {/* Edit buttons div */}
      <div className="mt-6 flex w-full flex-col items-center justify-center space-y-6 align-middle">
        <button className="flex h-12  w-56  items-center justify-center border-l-0  bg-yellow-900 bg-opacity-70 align-middle shadow-gray-200 drop-shadow-lg   transition-all duration-300 hover:bg-yellow-500 hover:text-lg ">
          <div className="flex items-center justify-center align-middle font-bold">
            Remove Pattern
          </div>
        </button>
        <button className="flex h-12  w-56  items-center justify-center bg-yellow-900 bg-opacity-70 align-middle shadow-gray-200 drop-shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-lg ">
          <div className="flex items-center justify-center align-middle font-bold">
            <MdFindReplace className="m-2 h-8 w-8" />
            Replace
          </div>
        </button>
        <div className=" flex justify-center">
          <button
            className=" flex h-12  w-56  items-center justify-center bg-yellow-900 bg-opacity-70 align-middle shadow-gray-200 drop-shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:text-lg"
            onClick={(e) => handleDelete(dispatch, pageId, elementId)}
          >
            <Delete className="m-2 h-8 w-8" />
            Delete Component
          </button>
        </div>
      </div>
    </>
  );
};

export default ShapeElementProperties;
