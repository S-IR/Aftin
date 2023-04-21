import { AspectRatio } from "@mui/icons-material";
import { MenuItem, Select } from "@mui/material";
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

const LayoutButtons = () => {
  const { w, h, selected } = useCanvasState((state) => state);

  const CHANGE_PAGE_SIZE = useCanvasState((state) => state.CHANGE_PAGE_SIZE);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <section
      className={`flex h-[90vh] w-72 flex-col ${styles.buttonMenusBG} bg-gradient-to-br text-white shadow-md shadow-gray-500`}
    >
      <div className=" flex h-full w-full">
        <button
          onClick={openPopover}
          id={"layout-size-popover"}
          className={`flex h-full w-full items-center justify-center space-x-4 text-2xl ${styles.generalButton}`}
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
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <div className="flex h-auto w-auto flex-grow space-x-4  border-l-2 border-white bg-black  p-2 text-white">
            <div className="flex flex-grow flex-col items-center border-l-2   border-gray-300">
              <p className="my-2 font-serif text-xl font-bold italic text-white">
                Physical layouts
              </p>
              {physicalLayouts.map((layout) => {
                const isSelected = layout.value.w === w && layout.value.h === h;
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
                      // onClick={() =>
                      //   changeCanvasSize(
                      //     dispatch,
                      //     layout.value.w,
                      //     layout.value.h
                      //   )
                      // }
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
        </Popover>
      </div>
      {/* <div>
        <Select
          labelId="pageId-select"
          id="demo-simple-select"
          defaultValue={1}
          label="Age"
          value={pageId}
          onChange={(e) => setPageId(e.target.value as number)}
        >
          {optionValues.map((value, index) =>
            <MenuItem key={index} value={value}>{value + 1}</MenuItem>
          )
          }

        </Select>
      </div> */}

      {/* Edit buttons div */}

      <button
        className={` buttons-1 h-full w-full  text-2xl ${styles.generalButton}  `}
        onClick={() => handleAddPage(dispatch)}
      >
        Add Page
      </button>
      {selected !== null && selected !== undefined && (
        <button
          className={` buttons-1 h-full w-full  text-2xl ${styles.generalButton} `}
          onClick={() => {
            handleDeletePage(dispatch, selected.page as number);
          }}
        >
          Delete Page
        </button>
      )}

      <button
        className={` buttons-1 h-full w-full  text-2xl ${styles.generalButton} `}
      >
        Default Background
      </button>
      {/* Crop button */}
    </section>
  );
};

export default LayoutButtons;
