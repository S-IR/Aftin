import { InputAdornment, TextField } from "@mui/material";
import React, { DOMAttributes, useCallback, useEffect, useState } from "react";
import ShortTextIcon from "@mui/icons-material/ShortText";
import styles from "../../../styles/image-editor/image-editor.module.css";

import { Alert } from "@mui/material";
import { uploadTextToCanvas } from "../../../model//client-side/image-editor/Upload";
import { useCanvasState } from "../../../zustand/CanvasStore/store";
import { activeSidebarType } from "./SidebarIcon";

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>;
}

const TextButtons = ({ setActiveSidebar }: props) => {
  const [pages, selected, ADD_TEXT] = useCanvasState(
    useCallback(
      (state) => [state.pages, state.selected, state.ADD_TEXT] as const,
      []
    )
  );
  const [alert, setAlert] = useState<null | string>(null);
  const isTheCanvasEmpty = pages.length === 1 && pages[0].length < 1;

  const selectedPage = selected?.page as number;

  useEffect(() => {
    setAlert(null);
  }, [pages.length]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isTheCanvasEmpty)
      return setAlert("Add an image to the canvas before adding text");
    setAlert(null);
    switch (e.target.id) {
      case "big-text-button":
        uploadTextToCanvas(ADD_TEXT, selectedPage, { fontSize: 32 });
        return setActiveSidebar("Stylize");
      case "medium-text-button":
        uploadTextToCanvas(ADD_TEXT, selectedPage, { fontSize: 16 });
        return setActiveSidebar("Stylize");
      case "small-text-button":
        uploadTextToCanvas(ADD_TEXT, selectedPage, { fontSize: 12 });
        return setActiveSidebar("Stylize");
    }
  };
  return (
    <section
      className={`flex h-auto min-h-full w-72 flex-col items-center  ${styles.buttonMenusBG}`}
    >
      <button
        id="big-text-button"
        onClick={(e) => handleClick(e)}
        className={` !my-10 !h-16 !w-64 ${styles.generalButton}   !text-2xl font-bold  `}
      >
        Add a Heading!
      </button>
      <button
        id="medium-text-button"
        onClick={(e) => handleClick(e)}
        className={`  !my-10 !h-16 !w-64 ${styles.generalButton}   !text-lg font-bold  `}
      >
        Add a medium-sized text
      </button>
      <button
        id="small-text-button"
        onClick={(e) => handleClick(e)}
        className={`  !my-10 !h-16 !w-64 ${styles.generalButton}   !text-md font-bold  `}
      >
        Add a small text
      </button>
      {alert !== null ? <Alert severity="error">{alert}</Alert> : <></>}
    </section>
  );
};

export default TextButtons;
