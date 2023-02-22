import { InputAdornment, TextField } from "@mui/material";
import React, { DOMAttributes, useEffect, useState } from "react";
import ShortTextIcon from "@mui/icons-material/ShortText";

import { Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { uploadTextToCanvas } from "../../../model//client-side/image-editor/Upload";
import { canvasPagesCount } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { activeSidebarType } from "./SidebarIcon";
import styles from "../../../styles/image-editor/image-editor.module.css";

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>;
}

const TextButtons = ({ setActiveSidebar }: props) => {
  const [alert, setAlert] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const { pages, selected } = useAppSelector(canvasPagesCount).present;
  const isTheCanvasEmpty = pages.length === 1 && pages[0].length < 1;

  console.log("pagesLen:", pages.length, "pages[0]Len:", pages[0].length);

  const selectedPage = selected?.page as number;

  useEffect(() => {
    setAlert(null);
  }, [useAppSelector(canvasPagesCount).present.pages[0].length]);

  //TODO
  let alertMessage: null | string = null;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isTheCanvasEmpty)
      return setAlert("Add an image to the canvas before adding text");
    setAlert(null);
    switch (e.target.id) {
      case "big-text-button":
        uploadTextToCanvas(dispatch, selectedPage, { fontSize: 32 });
        return setActiveSidebar("Stylize");
      case "medium-text-button":
        uploadTextToCanvas(dispatch, selectedPage, { fontSize: 16 });
        return setActiveSidebar("Stylize");
      case "small-text-button":
        uploadTextToCanvas(dispatch, selectedPage, { fontSize: 12 });
        return setActiveSidebar("Stylize");
    }
  };
  return (
    <section
      className={`flex h-[100vh] w-64 flex-col items-center bg-white bg-gradient-to-br ${styles.buttonMenusBG}`}
    >
      <button
        id="big-text-button"
        onClick={(e) => handleClick(e)}
        className=" !hover:shadow-red-500 !my-10 !h-16 !w-56 rounded-sm border-t-4 border-orange-500 bg-black !text-lg font-bold text-white shadow-lg !shadow-gray-500 transition-all duration-300 hover:translate-x-1 hover:bg-gray-900 active:shadow-none "
      >
        Add a Heading!
      </button>
      <button
        id="medium-text-button"
        onClick={(e) => handleClick(e)}
        className=" !hover:shadow-red-500 !text-md !my-10 !h-16 !w-56 rounded-sm border-t-4  border-orange-500 bg-black font-bold text-white shadow-lg !shadow-gray-500 transition-all duration-300 hover:translate-x-1 hover:bg-gray-900  active:shadow-none"
      >
        Add a medium-sized text
      </button>
      <button
        id="small-text-button"
        onClick={(e) => handleClick(e)}
        className=" !hover:shadow-red-500 !my-10 !h-16 !w-56 rounded-sm border-t-4  border-orange-500 bg-black !text-sm font-bold text-white shadow-lg !shadow-gray-500 transition-all duration-300 hover:translate-x-1 hover:bg-gray-900 active:shadow-none "
      >
        Add a small text
      </button>
      {alert !== null ? <Alert severity="error">{alert}</Alert> : <></>}
    </section>
  );
};

export default TextButtons;
