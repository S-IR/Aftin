import { AspectRatio } from "@mui/icons-material";
import { MenuItem, Select, TextField } from "@mui/material";
import Popover from "@mui/material/Popover";
import Image from "next/legacy/image";
import React, { useState } from "react";
import {
  digitalLayouts,
  physicalLayouts,
} from "../../../constants/image-editor/layoutTypes";

import styles from "../../../styles/image-editor/image-editor.module.css";
import {
  useCanvasState,
  useTemporalCanvasState,
} from "../../../zustand/CanvasStore/store";

/**
 * Handles actions to the canvas such as changing width, height
 * @returns
 */
const LayoutButtons = () => {
  const { w, h, selected } = useCanvasState((state) => state);

  const [internalWidth, setInternalWidth] = useState(w);
  const [internalHeight, setInternalHeight] = useState(h);

  const [CHANGE_PAGE_SIZE, ADD_PAGE, DELETE_PAGE, DELETE_ALL_PAGES] =
    useCanvasState((state) => [
      state.CHANGE_PAGE_SIZE,
      state.ADD_PAGE,
      state.DELETE_PAGE,
      state.DELETE_ALL_PAGES,
    ]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <section
      className={`flex h-[90vh] w-[15vw] flex-col ${styles.buttonMenusBG} bg-gradient-to-br text-white shadow-md shadow-gray-500`}
    >
      <div className=" flex h-full w-full">
        <button
          onClick={openPopover}
          id={"layout-size-popover"}
          className={`flex h-full w-full items-center justify-center space-x-4 font-Handwriting text-2xl ${styles.generalButton}`}
        >
          <AspectRatio className=" h-8 w-auto" />
          <p>Layout size</p>
        </button>
        <Popover
          id={"select-filter-popover"}
          open={anchorEl?.id === "layout-size-popover"}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          transitionDuration={500}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className="flex h-auto w-auto flex-grow flex-col  border-l-2 border-white bg-black  p-2 text-white">
            <div className="flex grow">
              <div className="flex flex-grow flex-col items-center border-l-2   border-gray-300">
                <p className="my-2 font-serif text-xl font-bold italic text-white">
                  Physical layouts
                </p>
                {physicalLayouts.map((layout) => {
                  const isSelected =
                    layout.value.w === w && layout.value.h === h;
                  return (
                    <button
                      className={`${
                        isSelected ? `bg-gray-500` : `bg-none`
                      }  my-3 ml-4 flex w-[196px] flex-row items-center rounded-l-full align-middle shadow-sm shadow-gray-500 transition-all duration-300 hover:shadow-gray-200`}
                      key={layout.name}
                      onClick={() =>
                        CHANGE_PAGE_SIZE(layout.value.w, layout.value.h)
                      }
                    >
                      <Image
                        src={layout.url}
                        width={48}
                        height={48}
                        style={{ objectFit: `cover` }}
                        alt={`layout image`}
                        className={"rounded-full"}
                      />
                      <p className="mx-2 text-gray-200">{layout.name}</p>
                    </button>
                  );
                })}
              </div>

              <div className=" m-2 flex space-x-1 bg-black text-white shadow-lg shadow-gray-900">
                <div className="flex flex-grow flex-col items-center border-r-2 border-white ">
                  <p className="my-2 font-serif text-xl font-bold italic text-white">
                    Digital layouts
                  </p>
                  {digitalLayouts.map((layout) => {
                    const isSelected =
                      layout.value.w === w && layout.value.h === h;
                    return (
                      <button
                        className={`${
                          isSelected ? `bg-gray-500` : `bg-none`
                        }  my-3 ml-4 flex w-[196px] flex-row items-center rounded-l-full align-middle shadow-sm shadow-gray-500 transition-all duration-300 hover:shadow-gray-200`}
                        key={layout.name}
                        onClick={() =>
                          CHANGE_PAGE_SIZE(layout.value.w, layout.value.h)
                        }
                      >
                        <Image
                          src={layout.url}
                          width={48}
                          height={48}
                          style={{ objectFit: `cover` }}
                          alt={`layout image`}
                          className={"rounded-full"}
                        />
                        <p className="mx-2 text-gray-200">{layout.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="w-full text-center font-Handwriting text-2xl text-white">
              Set Manually
            </p>
            <div className="flex h-auto w-full items-center justify-center align-middle  ">
              <TextField
                className="my-3 ml-4 flex w-auto flex-row items-center align-middle shadow-sm shadow-gray-500 transition-all duration-300 hover:shadow-gray-200 "
                InputLabelProps={{
                  className: `text-white flex items-center justify-center align-middle italic mt-3`,
                }}
                inputProps={{
                  className: "text-white mt-2",
                }}
                id="select-stroke-width"
                label="Width"
                value={internalWidth}
                variant="outlined"
                onChange={(e) => setInternalWidth(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    return CHANGE_PAGE_SIZE(internalWidth as number, h);
                }}
              >
                {internalWidth}
              </TextField>
              <TextField
                className="my-3 ml-4 flex w-auto flex-row items-center  align-middle shadow-sm shadow-gray-500 transition-all duration-300 hover:shadow-gray-200 "
                InputLabelProps={{
                  className: `text-white flex items-center justify-center align-middle italic mt-3`,
                }}
                inputProps={{
                  className: "text-white mt-2",
                }}
                id="select-stroke-width"
                label="Height"
                value={internalHeight}
                variant="outlined"
                onChange={(e) => setInternalHeight(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    return CHANGE_PAGE_SIZE(w, internalHeight as number);
                }}
              >
                {internalHeight}
              </TextField>
            </div>
          </div>
        </Popover>
      </div>

      <button
        className={` buttons-1 h-full w-full font-Handwriting  text-2xl ${styles.generalButton}  `}
        onClick={() => ADD_PAGE()}
      >
        Add Page
      </button>
      {selected !== null && selected !== undefined && (
        <button
          className={` buttons-1 h-full w-full font-Handwriting  text-2xl ${styles.generalButton} `}
          onClick={() => {
            DELETE_PAGE(selected.page as number);
          }}
        >
          Delete Page
        </button>
      )}

      <button
        className={` buttons-1 h-full w-full  font-Handwriting text-2xl ${styles.generalButton} `}
        onClick={DELETE_ALL_PAGES}
      >
        Delete All Pages
      </button>
    </section>
  );
};

export default LayoutButtons;
