import React from "react";
import {
  CSSFilter,
  imageFilterProperties,
} from "../../../constants/image-editor/imageFilters";
import { filtersActions } from "../../../features/canvasPages/canvas-elements/filtersSlice";
import { useAppDispatch } from "../../../Redux/hooks";
import styles from "../../../styles/image-editor/filters.module.css";
interface props {
  pageId: number;
  elementId: number;
  option: CSSFilter;
  label: string;
}

const Filter = ({ pageId, elementId, option, label }: props) => {
  const dispatch = useAppDispatch();

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      filtersActions.CHANGE_IMAGE_FILTER({
        pageId,
        elementId,
        property: option.property,
        value: parseFloat(e.target.value),
      })
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
