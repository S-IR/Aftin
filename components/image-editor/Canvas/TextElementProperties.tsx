import React, { useCallback, useState } from "react";
import {
  MdFindReplace,
  MdFontDownload,
  MdOutlineFontDownload,
  MdRotateRight,
} from "react-icons/md";
import { fontFamilies } from "../../../constants/image-editor/fontFamilies";

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
  Alert,
} from "@mui/material";
import { BiColorFill, BiFontColor, BiFontSize } from "react-icons/bi";
import { fillColors } from "../../../constants/image-editor/fillColors";
import { fontSizes } from "../../../constants/image-editor/fontSizes";

import SelectComp from "../../general/SelectComp";
import { Delete } from "@mui/icons-material";
import {
  canvasSelected,
  useCanvasState,
} from "../../../zustand/CanvasStore/store";
import { textFilterProperties } from "../../../zustand/CanvasStore/textHandlers";
import { textData } from "../../../zustand/CanvasStore/textHandlers";
import { useModalStore } from "../../../zustand/ModalBoxStore/store";

interface props {
  textData: textData;
  selected: canvasSelected;
  textFilter: textFilterProperties;
}
const TextElementProperties = ({ textData, selected, textFilter }: props) => {
  const [
    CHANGE_TEXT,
    CHANGE_FONT_SIZE,
    CHANGE_FONT_FAMILY,
    CHANGE_FONT_COLOR,
    CHANGE_FONT_VARIANT,
    CHANGE_STROKE_WIDTH,
    CHANGE_STROKE_COLOR,
    DELETE_ELEMENT,
  ] = useCanvasState((state) => [
    state.CHANGE_TEXT,
    state.CHANGE_FONT_SIZE,
    state.CHANGE_FONT_FAMILY,
    state.CHANGE_FONT_COLOR,
    state.CHANGE_FONT_VARIANT,
    state.CHANGE_STROKE_WIDTH,
    state.CHANGE_STROKE_COLOR,
    state.DELETE_ELEMENT,
  ]);
  const [deleteWarningHappened, setDeleteWarningHappened] = useState(false);
  const [changeModalText, changeModalType] = useModalStore((store) => [
    store.CHANGE_MODAL_TEXT,
    store.CHANGE_MODAL_TYPE,
  ]);
  const { page: pageId, element: elementId } = selected as {
    page: number;
    element: number;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 pt-4 align-middle">
      {/* change text */}
      <TextField
        className=" ! !w-[90%] cursor-pointer  !border-red-600  transition-all duration-300 hover:shadow-sm active:bg-yellow-500 active:shadow-none "
        InputLabelProps={{
          className: `!text-yellow-800 flex items-center justify-center align-middle italic mt-2`,
        }}
        id="select-text"
        label="Change Text"
        InputProps={{
          className: "!text-yellow-800",
        }}
        defaultValue={textData.text}
        variant="outlined"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            CHANGE_TEXT(pageId, elementId, e.target.value);
          } else {
            return;
          }
        }}
      />

      {/* Font family selector */}
      {/* I cannot refactor this as a select component due to the fact that I need to separate the list of options in two  */}

      <Box className="!w-[90%]" component="form" noValidate autoComplete="off">
        <div>
          <TextField
            className="! !w-full cursor-pointer transition-all duration-300  hover:shadow-sm active:shadow-none "
            id={`select-font-family`}
            variant="filled"
            multiline={true}
            color="primary"
            fullWidth={true}
            select
            InputLabelProps={{
              className: `!text-yellow-800 flex items-center justify-center align-middle italic`,
            }}
            InputProps={{
              className: "!text-yellow-800",
              startAdornment: (
                <InputAdornment position="start">
                  {<MdFontDownload color="white" className="mb-4 h-4 w-4" />}
                </InputAdornment>
              ),
            }}
            label={"Font Family"}
            value={textData.fontFamily}
            onChange={(e) => {
              CHANGE_FONT_FAMILY(pageId, elementId, e.target.value);
            }}
          >
            <h3 className="pl-2 font-bold">Most common fonts</h3>
            <div className="bg-yellow-300">
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Basketville">
                <p className="font-[Basketville]">Basketville</p>
              </MenuItem>
              <MenuItem value="Calibri">
                <p className="font-[Calibri]">Calibri</p>
              </MenuItem>
              <MenuItem value="Helvetica">
                <p className="font-[Helvetica]">Helvetica</p>
              </MenuItem>
              <MenuItem value="Lavenda">
                <p className="font-[Lavenda]">Lavenda</p>
              </MenuItem>
              <MenuItem value="Times_New_Roman">
                <p className="font-[Times_New_Roman]">Times New Roman</p>
              </MenuItem>
            </div>
            <h3 className="pl-2 font-bold">All fonts</h3>

            {fontFamilies.map((font: string) => (
              <MenuItem key={font} value={font}>
                <p
                  style={{
                    fontFamily: font.replace(" ", "-"),
                  }}
                >
                  {font}
                </p>
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>

      {/* Font size selector */}
      <SelectComp
        label="Font Size"
        Icon={<BiFontSize color="white" className="mb-4 h-4 w-4" />}
        onChangeFunction={(e) => {
          CHANGE_FONT_SIZE(pageId, elementId, Number(e.target.value));
        }}
        value={textData.fontSize}
        options={fontSizes.map((size: number) => (
          <MenuItem key={size} value={size}>
            <p>{size}</p>
          </MenuItem>
        ))}
      />

      {/* Font variant selector */}
      <SelectComp
        label="Font Variant"
        Icon={<BiFontColor color="white" className="mb-4 h-4 w-4" />}
        onChangeFunction={(e) =>
          CHANGE_FONT_VARIANT(pageId, elementId, e.target.value)
        }
        value={textData.fontVariant}
        options={[
          <MenuItem key={"normal"} value={"normal"}>
            <p>{"normal"}</p>
          </MenuItem>,
          <MenuItem key={"italic"} value={"italic"}>
            <p>{"italic"}</p>
          </MenuItem>,
          <MenuItem key={"bold"} value={"bold"}>
            <p>{"bold"}</p>
          </MenuItem>,
          <MenuItem key={"italic bold"} value={"italic bold"}>
            <p>{"italic bold"}</p>
          </MenuItem>,
        ]}
      />

      {/* Color picker */}
      <TextField
        className="cursor-pointer!border-t-4 my-2 mx-2  !w-[90%] !border-red-600 transition-all duration-300  hover:shadow-sm active:shadow-none  "
        type={"color"}
        InputLabelProps={{
          className: `!text-yellow-800 flex items-center justify-center align-middle italic mt-2`,
        }}
        id="select-color"
        label="Color"
        value={textFilter.fill}
        variant="outlined"
        onChange={(e) =>
          CHANGE_FONT_COLOR(pageId, elementId, e.target.value as `#${string}`)
        }
      />

      {/* stroke width */}
      <TextField
        className="my-2 mx-2 !w-[90%] cursor-pointer   transition-all duration-300  hover:shadow-sm active:shadow-none "
        InputLabelProps={{
          className: `!text-yellow-800 flex items-center justify-center align-middle italic mt-2`,
        }}
        inputProps={{
          className: "!text-yellow-800",
        }}
        id="select-stroke-width"
        label="Stroke Width"
        defaultValue={textData.strokeWidth}
        variant="outlined"
        onChange={(e) =>
          CHANGE_STROKE_WIDTH(pageId, elementId, Number(e.target.value))
        }
      />

      {/* stroke color */}
      <TextField
        className="my-2 mx-2 !w-[90%] cursor-pointer !border-t-4 !border-red-600      transition-all duration-300  hover:shadow-sm active:shadow-none  "
        type={"color"}
        InputLabelProps={{
          className: `!text-yellow-800 flex  items-center justify-center align-middle italic mt-2`,
        }}
        id="select-stroke-color"
        label="Stroke Color"
        value={textFilter.stroke}
        variant="outlined"
        onChange={(e) =>
          CHANGE_STROKE_COLOR(pageId, elementId, e.target.value as `#${string}`)
        }
      />

      <div className=" mx-2 mt-6 flex w-[90%] justify-center bg-yellow-800">
        <button
          className=" flex h-12  w-full items-center justify-start  bg-opacity-70 align-middle  shadow-gray-200 drop-shadow-lg transition-all duration-300 hover:bg-yellow-500 "
          onClick={(e) => {
            if (pageId === 0 && elementId === 0 && !deleteWarningHappened) {
              return setDeleteWarningHappened(true);
            }
            setDeleteWarningHappened(false);
            DELETE_ELEMENT(pageId, elementId);
          }}
        >
          <Delete className=" ml-6 mb-0 h-8 w-8" />
          Delete Component
        </button>
      </div>
      {deleteWarningHappened === true ? (
        <Alert className="!max-w-full !rounded-none  " severity="error">
          If you delete this component all of your editing progress on the page
          will be lost. Click again on the delete button if you want to continue
        </Alert>
      ) : null}
    </div>
  );
};

export default TextElementProperties;
