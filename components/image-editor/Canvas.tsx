import { Stage } from "konva/lib/Stage";
import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Stage as KonvaStage,
  Layer,
  Image as KonvaImage,
  KonvaNodeComponent,
  StageProps,
  Rect,
} from "react-konva";

import { useCanvasState } from "../../zustand/CanvasStore/store";
import CanvasPage from "./Canvas/CanvasPage";
import CanvasShape from "./Canvas/CanvasShape";
import { CanvasImage, CanvasText, CanvasEditButtons } from "./Canvas/index";
import { imageData } from "../../zustand/CanvasStore/imageHandlers";

interface props {
  showSidebar: boolean;
}
/**
 * The Canvas of the Image Editor route
 */
const Canvas = ({ showSidebar }: props) => {
  const [
    pages,
    selected,
    w,
    h,
    CHANGE_ELEMENT_POSITION,
    CHANGE_ELEMENT_SCALE,
    SELECT_PAGE,
    SELECT_ELEMENT,
    DELETE_ELEMENT,
    DELETE_PAGE,
  ] = useCanvasState(
    useCallback(
      (state) =>
        [
          state.pages,
          state.selected,
          state.w,
          state.h,
          state.CHANGE_ELEMENT_POSITION,
          state.CHANGE_ELEMENT_SCALE,
          state.SELECT_PAGE,
          state.SELECT_ELEMENT,
          state.DELETE_ELEMENT,
          state.DELETE_PAGE,
        ] as const,
      []
    )
  );

  const downloadRef = useRef<HTMLButtonElement | null>(null);
  const [stageRefs, setStageRefs] = useState<
    React.RefObject<LegacyRef<Stage>>[]
  >([]);

  const firstImageData = pages[0].find(
    (element) => element.elementType === "image"
  )?.data as imageData;

  const width = w === null ? firstImageData.width : w;
  const height = h === null ? firstImageData.height : h;

  //bottom buttons functionalities

  useEffect(() => {
    function handleDLELETE_KEY(event: KeyboardEvent) {
      if (event.key === "Delete") {
        selected.element === null
          ? DELETE_PAGE(selected.page as number)
          : DELETE_ELEMENT(selected.page as number, selected.element);
        // Call the function to trigger here
      }
    }

    document.addEventListener("keydown", handleDLELETE_KEY);

    return () => {
      document.removeEventListener("keydown", handleDLELETE_KEY);
    };
  }, []);
  return (
    <section
      className={`${
        showSidebar ? `ml-[30vw]` : "ml-[5vh]"
      } flex h-auto w-auto flex-col transition-all duration-300 `}
    >
      <CanvasEditButtons stageRefs={stageRefs} downloadRef={downloadRef} />

      {pages.map((page, i) => {
        return (
          <CanvasPage
            key={i}
            elements={page}
            height={height}
            width={width}
            selected={selected}
            pageId={i}
            setStageRefs={setStageRefs}
            CHANGE_ELEMENT_POSITION={CHANGE_ELEMENT_POSITION}
            CHANGE_ELEMENT_SCALE={CHANGE_ELEMENT_SCALE}
            SELECT_PAGE={SELECT_PAGE}
            SELECT_ELEMENT={SELECT_ELEMENT}
          />
        );
      })}
    </section>
  );
};

export default Canvas;
