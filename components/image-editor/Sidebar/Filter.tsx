import React, { useCallback } from "react";
import {
  CSSFilter,
  imageFilterProperties,
} from "../../../constants/image-editor/imageFilters";
import { useAppDispatch } from "../../../Redux/hooks";
import styles from "../../../styles/image-editor/filters.module.css";
import { useCanvasState } from "../../../zustand/CanvasStore/store";
interface props {
  pageId: number;
  elementId: number;
  option: CSSFilter;
  label: string;
}

const Filter = ({ pageId, elementId, option, label }: props) => {
  const [CHANGE_IMAGE_FILTER] = useCanvasState(
    useCallback((state) => [state.CHANGE_IMAGE_FILTER], [])
  );
  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    CHANGE_IMAGE_FILTER(
      pageId,
      elementId,
      option.property,
      parseFloat(e.target.value)
    );
  }

  return (
    <div className={`flex flex-col items-center p-2`}>
      <label
        className="block  font-Handwriting text-xl  font-bold  "
        htmlFor={option.property}
      >
        {label}
      </label>
      <input
        className={`webkit: h-6 w-[75%] cursor-ew-resize appearance-none rounded-full bg-yellow-900 shadow-md shadow-red-200 ${styles.input} `}
        type="range"
        step={(option.range.max - option.range.min) / 10}
        id={option.property}
        value={option.value}
        min={option.range.min}
        max={option.range.max}
        onChange={handleSliderChange}
      ></input>
    </div>
  );
};

export default Filter;
