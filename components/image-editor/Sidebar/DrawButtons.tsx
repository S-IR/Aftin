import React, { useCallback, useEffect, useState } from "react";
import { Alert, Popover } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { uploadShapeToCanvas } from "../../../model/client-side/image-editor/Upload";
import { BiShapeCircle } from "react-icons/bi";
import { FilterFrames, ShapeLine, ShareOutlined } from "@mui/icons-material";
import { FaIcons } from "react-icons/fa";
import { canvasPagesCount } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { activeSidebarType } from "./SidebarIcon";
import { useCanvasState } from "../../../zustand/CanvasStore/store";

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>;
}
const DrawButtons = ({ setActiveSidebar }: props) => {
  const [pages, selected, ADD_SHAPE] = useCanvasState(
    useCallback(
      (state) => [state.pages, state.selected, state.ADD_SHAPE] as const,
      []
    )
  );
  const isTheCanvasEmpty = pages.length === 1 && pages[0].length < 1;

  const [alert, setAlert] = useState<null | string>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const showPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    return setAnchorEl(event.currentTarget);
  };
  const closePopover = () => {
    return setAnchorEl(null);
  };

  const shapeOpen = anchorEl?.id === "show shapes button";
  const stickersOpen = anchorEl?.id === "show stickers button";
  const edgesOpen = anchorEl?.id === `show edges button`;

  const shapeID = shapeOpen ? "shapePopover" : undefined;
  const stickerID = stickersOpen ? "stickerPopover" : undefined;
  const edgesID = edgesOpen ? `edgesPopover` : undefined;

  useEffect(() => {
    setAlert(null);
  }, [pages.length]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { page: pageId } = selected;
    if (isTheCanvasEmpty || pageId === null)
      return setAlert("Add an image to the canvas before adding a shape");
    setAlert(null);
    switch (e.target.id) {
      case "circle-button":
        uploadShapeToCanvas(ADD_SHAPE, pageId, { shape: "Circle" });
        setActiveSidebar("Stylize");
        break;
      case "square-button":
        uploadShapeToCanvas(ADD_SHAPE, pageId, { shape: "Rect" });
        setActiveSidebar("Stylize");
        break;
      case "rectangle-button":
        console.log("we are  here");
        uploadShapeToCanvas(ADD_SHAPE, pageId, {
          shape: "Rect",
          width: 150,
          height: 75,
        });
        setActiveSidebar("Stylize");
        break;
      case "ring-button":
        uploadShapeToCanvas(ADD_SHAPE, pageId, {
          shape: "Ring",
          strokeWidth: 10,
          innerRadius: 50,
          outerRadius: 50,
        });
        setActiveSidebar("Stylize");
        break;
    }
  };

  return (
    <section className="flex h-[90vh] w-64 flex-col items-center  bg-brown-900 bg-gradient-to-br py-10">
      <button
        className="bg-brown-700align-middle flex h-full w-60  items-center justify-center space-x-4 rounded-sm  border-y-2 border-brown-500 font-serif   text-2xl shadow-sm  transition-all duration-300 ease-in-out hover:translate-x-1 active:scale-100 active:shadow-none "
        id={`show shapes button`}
        onClick={showPopover}
      >
        <ShapeLine className="mr-4 h-8 w-8" color="warning" />
        Insert shape
      </button>
      <button
        className="bg-brown-700align-middle flex h-full w-60  items-center justify-center space-x-4 rounded-sm  border-y-2 border-brown-500  font-serif  text-2xl shadow-sm  transition-all duration-300 ease-in-out hover:translate-x-1 active:scale-100 active:shadow-none  "
        id={`show shapes button`}
        onClick={showPopover}
      >
        <FaIcons className="mr-4 h-8 w-8" color="brown" />
        Insert sticker
      </button>

      <button
        className="bg-brown-700align-middle flex h-full w-60  items-center justify-center space-x-4 rounded-sm  border-y-2 border-brown-500 font-serif    text-2xl shadow-sm  transition-all duration-300 ease-in-out hover:translate-x-1 active:scale-100 active:shadow-none "
        id={`show edges button`}
        onClick={showPopover}
      >
        <FilterFrames className="mr-4 ml-4 h-8 w-8" htmlColor="#f97316" />
        Insert Frames & Edges
      </button>
      {/* shapes popup */}
      <Popover
        id={shapeID}
        open={shapeOpen}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="col-span-2 flex w-40 flex-col items-center justify-center space-y-3 bg-gray-100 py-4 align-middle ">
          <button
            id="circle-button"
            onClick={(e) => handleClick(e)}
            className="!hover:shadow-red-500 !text-md !h-20  !w-20 !rounded-full bg-gray-900 font-bold text-white shadow-lg !shadow-gray-700 transition-all duration-300 hover:bg-gray-700 "
          >
            Add a circle
          </button>
          <button
            id="square-button"
            onClick={(e) => handleClick(e)}
            className="!hover:shadow-red-500 !text-md !h-20  !w-20 rounded-sm bg-gray-900 font-bold text-white shadow-lg !shadow-gray-700 transition-all duration-300 hover:bg-gray-700 "
          >
            Add a square
          </button>
          <button
            id="rectangle-button"
            onClick={(e) => handleClick(e)}
            className="!hover:shadow-red-500 !text-md !h-16  !w-32 rounded-sm bg-gray-900 text-white shadow-lg !shadow-gray-700 transition-all duration-300 hover:bg-gray-700 "
          >
            Add rectangle
          </button>
          <button
            id="ring-button"
            onClick={(e) => handleClick(e)}
            className="hover:bg-border-gray-700 !hover:shadow-red-500 !text-md !h-24 !w-24 rounded-full  border-4 border-gray-900  bg-none text-black shadow-lg !shadow-gray-700 transition-all duration-300 "
          >
            Add a ring
          </button>
          {alert !== null ? <Alert severity="error">{alert}</Alert> : <></>}
        </div>
      </Popover>
      {/* stickers popup */}
      <Popover
        id={stickerID}
        open={stickersOpen}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="col-span-2 flex w-40 flex-col items-center justify-center space-y-3 bg-gray-100 py-4 align-middle ">
          <button
            id="circle-button"
            onClick={(e) => handleClick(e)}
            className="!hover:shadow-red-500 !text-md !h-20  !w-20 !rounded-full bg-gray-900 text-white shadow-lg !shadow-gray-700 transition-all duration-300 hover:bg-gray-700 "
          >
            Add a circle
          </button>
          <button
            id="square-button"
            onClick={(e) => handleClick(e)}
            className="!hover:shadow-red-500 !text-md !h-20  !w-20 rounded-sm bg-gray-900 text-white shadow-lg !shadow-gray-700 transition-all duration-300 hover:bg-gray-700 "
          >
            Add a square
          </button>
          <button
            id="rectangle-button"
            onClick={(e) => handleClick(e)}
            className="!hover:shadow-red-500 !text-md !h-16  !w-32 rounded-sm bg-gray-900 text-white shadow-lg !shadow-gray-700 transition-all duration-300 hover:bg-gray-700 "
          >
            Add rectangle
          </button>
          <button
            id="ring-button"
            onClick={(e) => handleClick(e)}
            className="hover:bg-border-gray-700 !hover:shadow-red-500 !text-md !h-24 !w-24 rounded-full  border-4 border-gray-900  bg-none text-black shadow-lg !shadow-gray-700 transition-all duration-300 "
          >
            Add a ring
          </button>
          {alert !== null ? <Alert severity="error">{alert}</Alert> : <></>}
        </div>
      </Popover>

      {/* edges & frames  */}

      <Popover
        id={edgesID}
        open={edgesOpen}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="col-span-2 flex w-40 flex-col items-center justify-center space-y-3 bg-gray-100 py-4 align-middle ">
          <button
            id="circle-button"
            onClick={(e) => handleClick(e)}
            className="!hover:shadow-red-500 !text-md !h-20  !w-20 !rounded-full bg-gray-900 text-white shadow-lg !shadow-gray-700 transition-all duration-300 hover:bg-gray-700 "
          >
            Add a circle
          </button>
          <button
            id="square-button"
            onClick={(e) => handleClick(e)}
            className="!hover:shadow-red-500 !text-md !h-20  !w-20 rounded-sm bg-gray-900 text-white shadow-lg !shadow-gray-700 transition-all duration-300 hover:bg-gray-700 "
          >
            Add a square
          </button>
          <button
            id="rectangle-button"
            onClick={(e) => handleClick(e)}
            className="!hover:shadow-red-500 !text-md !h-16  !w-32 rounded-sm bg-gray-900 text-white shadow-lg !shadow-gray-700 transition-all duration-300 hover:bg-gray-700 "
          >
            Add rectangle
          </button>
          <button
            id="ring-button"
            onClick={(e) => handleClick(e)}
            className="hover:bg-border-gray-700 !hover:shadow-red-500 !text-md !h-24 !w-24 rounded-full  border-4 border-gray-900  bg-none text-black shadow-lg !shadow-gray-700 transition-all duration-300 "
          >
            Add a ring
          </button>
          {alert !== null ? <Alert severity="error">{alert}</Alert> : <></>}
        </div>
      </Popover>
    </section>
  );
};

export default DrawButtons;
