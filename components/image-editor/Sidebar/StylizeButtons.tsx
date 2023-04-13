import React, { useEffect } from "react";
import {
  canvasElement,
  canvasPagesCount,
} from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import {
  imageFilter,
  shapeFilter,
  textFilter,
} from "../../../features/canvasPages/canvas-elements/filtersHandlingReducers";
import ImageElementProperties from "../Canvas/ImageElementProperties";
import ShapeElementProperties from "../Canvas/ShapeElementProperties";
import TextElementProperties from "../Canvas/TextElementProperties";
import styles from "../../../styles/image-editor/image-editor.module.css";
import { useCanvasState } from "../../../zustand/CanvasStore/store";
import { imageFilterProperties } from "../../../zustand/CanvasStore/imageHandlers";
import { textFilterProperties } from "../../../zustand/textHandlers";
import { shapeFilterProperties } from "../../../zustand/shapeHandlers";

const StylizeButtons = () => {
  const [pages, selected] = useCanvasState((state) => [
    state.pages,
    state.selected,
  ]);
  // if (selected.page === null || selected.element === null) return <></>;

  let filters:
    | imageFilterProperties
    | textFilterProperties
    | shapeFilterProperties;

  //if the selected is null then the component will tell you to select an element

  let selectedElement = null;
  const hasElementSelected =
    selected.page !== null && selected.element !== null;
  if (hasElementSelected) {
    selectedElement =
      pages[selected.page as number][selected.element as number];
    filters = selectedElement.filters;
  }

  const renderSwitch = (selectedElement: canvasElement) => {
    // if (!hasElementSelected) return <></>;
    switch (selectedElement.elementType) {
      case "image":
        const imageData = selectedElement.data;
        return (
          <ImageElementProperties
            imageData={imageData}
            selected={selected}
            imageFilter={filters as imageFilterProperties}
          />
        );
      case "text":
        const textData = selectedElement.data;
        return (
          <TextElementProperties
            textData={textData}
            selected={selected}
            textFilter={filters as textFilterProperties}
          />
        );
      case "shape":
        const shapeData = selectedElement.data;
        return (
          <ShapeElementProperties
            shapeData={shapeData}
            selected={selected}
            shapeFilter={filters as shapeFilterProperties}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <section
      className={`h-[100vh] w-72 ${styles.buttonMenusBG} shadow-inner  shadow-black`}
    >
      {selected.element !== null ? (
        renderSwitch(selectedElement as canvasElement)
      ) : (
        <div className=" flex h-full w-full items-center justify-center  rounded-md bg-red-800/40 p-4 pt-6 text-center align-middle font-serif  shadow-md shadow-yellow-400">
          <p className="text-2xl">
            Upload an image or select an element and this tab will let you
            modify its properties
          </p>
        </div>
      )}
    </section>
  );
};

export default StylizeButtons;
