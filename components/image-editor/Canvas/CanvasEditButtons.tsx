import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { ActionCreators as UndoActionCreators } from "redux-undo";
// import { handleAddPage, handleExport, handlePreview, handleSelectPage } from '../../../model/image-editor/Canvas'
import { KonvaNodeComponent, StageProps } from "react-konva";
import { Stage } from "konva/lib/Stage";
import { canvasPagesCount } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

import { NoteAdd } from "@mui/icons-material";
import { useSpring, animated, useTransition } from "react-spring";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaArrowLeft,
} from "react-icons/fa";
import { MdOutlineDoubleArrow } from "react-icons/md";
import {
  useCanvasState,
  useTemporalCanvasState,
} from "../../../zustand/CanvasStore/store";
import {
  handleExport,
  handlePreview,
} from "../../../model/client-side/image-editor/Canvas";
import { usePreviewsStore } from "../../../zustand/PreviewsStore/store";

interface props {
  stageRefs: React.RefObject<KonvaNodeComponent<Stage, StageProps>>[];
  downloadRef: React.RefObject<HTMLButtonElement>;
}
const CanvasEditButtons = ({ stageRefs, downloadRef }: props) => {
  const { undo, redo, futureStates, pastStates } = useTemporalCanvasState(
    (state) => state
  );

  const router = useRouter();
  const [canvasPages, pageId, ADD_PAGE, SELECT_PAGE, SELECT_ELEMENT] =
    useCanvasState(
      (state) =>
        [
          state.pages,
          state.selected.page,
          state.ADD_PAGE,
          state.SELECT_PAGE,
          state.SELECT_ELEMENT,
        ] as const
    );
  const ADD_IMAGE = usePreviewsStore((state) => state.ADD_IMAGE);
  const pagesLength = canvasPages.length;

  const optionValues: number[] = [];
  for (let i = 0; i < pagesLength; i++) {
    optionValues.push(i);
  }
  const [showLeftSidebar, toggleLeftSidebar] = useState(true);

  return showLeftSidebar ? (
    <section
      className={` fixed top-[75px] right-0 z-50 flex h-full w-36  flex-col rounded-sm border-b-2 border-yellow-500 bg-yellow-900 bg-gradient-to-br p-2 shadow-lg shadow-brown-700 ${
        showLeftSidebar ? `right-0` : `-right-36 cursor-none opacity-0`
      } transition-all duration-300 `}
    >
      <button
        className=" absolute top-3 -left-5 z-10 w-auto rounded-full  p-2 transition-all duration-300 ease-in-out  "
        onClick={() => toggleLeftSidebar((v) => !v)}
      >
        <FaAngleDoubleRight direction={"right"} className={"h-6 w-6"} />
      </button>
      {pageId !== null && pageId !== undefined && (
        <div className="mt-6 mb-8 flex flex-col items-center justify-center border-b-2 border-brown-700 pb-2 align-middle ">
          <InputLabel
            className="my-2 mx-2  font-Handwriting text-xl font-semibold text-brown-300  "
            id="pageId-select"
          >{`Selected Page `}</InputLabel>
          <Select
            labelId="pageId-select"
            id="demo-simple-select"
            defaultValue={1}
            label="Age"
            value={pageId}
            className={`rounded-full text-white`}
            onChange={(e) => SELECT_PAGE(Number(e.target.value))}
          >
            {optionValues.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value + 1}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
      <div className="flex grow flex-col space-y-10  p-5 align-middle">
        <button
          className="flex h-12 items-center justify-center rounded-sm border-t-4  border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm  shadow-brown-500 drop-shadow-md  transition-all duration-300 ease-in-out  hover:-translate-x-1 hover:bg-brown-500 active:shadow-none disabled:bg-brown-200/80"
          onClick={() => ADD_PAGE()}
        >
          Add Page
        </button>

        <button
          className=" h-12 rounded-sm border-t-4 border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm shadow-brown-500  drop-shadow-md transition-all  duration-300 ease-in-out  hover:-translate-x-1 hover:bg-brown-500 active:shadow-none disabled:bg-brown-200/80"
          ref={downloadRef}
          onClick={() => handleExport(SELECT_ELEMENT, stageRefs, "all")}
        >
          Download
        </button>
        <button
          className=" h-12 rounded-sm border-t-4 border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm shadow-brown-500  drop-shadow-md transition-all  duration-300 ease-in-out  hover:-translate-x-1 hover:bg-brown-500 active:shadow-none disabled:bg-brown-200/80"
          disabled={pastStates.length === 0}
          onClick={() => undo()}
        >
          Undo
        </button>
        <button
          className=" h-12 rounded-sm border-t-4 border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm shadow-brown-500  drop-shadow-md transition-all  duration-300 ease-in-out  hover:-translate-x-1 hover:bg-brown-500 active:shadow-none disabled:bg-brown-200/80"
          disabled={futureStates.length === 0}
          onClick={() => redo()}
        >
          Redo
        </button>

        <button
          className=" h-12 rounded-sm border-t-4 border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm shadow-brown-500  drop-shadow-md transition-all  duration-300 ease-in-out  hover:-translate-x-1 hover:bg-brown-500 active:shadow-none  disabled:bg-brown-200/80"
          onClick={() =>
            handlePreview(router, SELECT_ELEMENT, ADD_IMAGE, stageRefs, "all")
          }
        >
          Preview
        </button>
      </div>
    </section>
  ) : (
    <Tooltip title="Toggle sidebar">
      <button
        className={` absolute top-[75px] right-0 z-10 w-auto rounded-full  p-2 transition-all duration-300 ease-in-out`}
        onClick={() => toggleLeftSidebar((v) => !v)}
      >
        <FaAngleDoubleLeft className="h-16 w-16 md:h-8 md:w-8 " />
      </button>
    </Tooltip>
  );
};

export default CanvasEditButtons;
