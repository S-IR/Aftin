import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { canvasPagesCount } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { uploadImageToCanvas } from "../../../model/client-side/image-editor/Upload";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { activeSidebarType } from "./SidebarIcon";
import styles from "../../../styles/image-editor/image-editor.module.css";

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>;
}

const UploadButtons = ({ setActiveSidebar }: props) => {
  const [pageId, setPageId] = useState(0);
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadImageToCanvas(dispatch, pageId, e.target.files);
    setActiveSidebar("Stylize");
  };
  const pagesLength = useAppSelector(canvasPagesCount).present.pages.length;

  const optionValues: number[] = [];
  for (let i = 0; i < pagesLength; i++) {
    optionValues.push(i);
  }

  const dispatch = useAppDispatch();
  return (
    <section
      className={`flex h-[100vh] w-80 flex-col items-center rounded-sm  ${styles.buttonMenusBG} pt-10 align-middle text-white shadow-lg shadow-white ${styles.buttonMenusBG} justify-center align-middle `}
    >
      <label
        htmlFor="image_input"
        className="mb-2 block pt-2  font-Handwriting text-4xl font-[800] dark:text-gray-300 md:text-6xl "
      >
        Upload <br></br> Image
      </label>
      <input
        className="mx-auto w-full cursor-pointer rounded p-4   "
        id="image_input"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleUpload(e)}
      ></input>
      {/* if there is more than 1 page the component for pages will render  */}
      {pagesLength > 1 && (
        <FormControl fullWidth>
          <InputLabel
            className="my-2"
            id="pageId-select"
          >{`Uploading on page `}</InputLabel>
          <Select
            labelId="pageId-select"
            id="demo-simple-select"
            defaultValue={1}
            label="Selected page"
            value={pageId}
            onChange={(e) => setPageId(e.target.value as number)}
          >
            {optionValues.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </section>
  );
};

export default UploadButtons;
