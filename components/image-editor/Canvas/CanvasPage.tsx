import React, {
  LegacyRef,
  MutableRefObject,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import CanvasImage from "./CanvasImage";
import CanvasShape from "./CanvasShape";
import CanvasText from "./CanvasText";
import {
  Stage as KonvaStage,
  Layer,
  Image as KonvaImage,
  KonvaNodeComponent,
  StageProps,
  Rect,
} from "react-konva";
import { Stage } from "konva/lib/Stage";

import { RectConfig } from "konva/lib/shapes/Rect";
import {
  canvasElement,
  canvasSelected,
  changeElementPosition,
  changeElementScale,
  selectElement,
  selectPage,
} from "../../../zustand/CanvasStore/store";

interface props {
  width: number;
  height: number;
  elements: canvasElement[];
  selected: canvasSelected;
  // if the element that is selected is on this page, the selectedElement value will be a number, else it will just be null
  pageId: number;
  setStageRefs: React.Dispatch<React.SetStateAction<Ref<Stage>[]>>;
  CHANGE_ELEMENT_POSITION: changeElementPosition;
  CHANGE_ELEMENT_SCALE: changeElementScale;
  SELECT_PAGE: selectPage;
  SELECT_ELEMENT: selectElement;
}

/**
 * Displays one page of the user's canvas
 */
const CanvasPage = ({
  width,
  height,
  elements,
  selected,
  pageId,
  setStageRefs,
  CHANGE_ELEMENT_POSITION,
  CHANGE_ELEMENT_SCALE,
  SELECT_ELEMENT,
  SELECT_PAGE,
}: props) => {
  //this is meant to represent a default  white background for every single canvas
  const canvasBGRef = useRef<null | Rect | RectConfig>(null);
  const isPageSelected = selected?.page === pageId;
  const layerRef = useRef<Layer | null>(null);

  const stageRef = useRef<Stage | null>(null);
  useEffect(() => {
    if (!stageRef || stageRef.current === null) return;
    // ts is weird, the guard clause from above will block the stage from being null
    setStageRefs((stageRefs) => [...stageRefs, stageRef]);
  }, [stageRef]);

  return (
    <>
      <h3 className="g mx-auto my-2  text-xl md:text-4xl">{`Page ${
        pageId + 1
      }`}</h3>
      <KonvaStage
        width={width}
        height={height}
        ref={stageRef}
        willReadFrequently={true}
        className={`border-gradient-to-br z-10 rounded-sm border-2 from-gray-400 to-gray-600  ${
          isPageSelected
            ? `border-red-500`
            : `border-gradient-to-br z-10 from-gray-400 to-gray-600 `
        } `}
      >
        <Layer ref={layerRef}>
          <Rect
            ref={canvasBGRef}
            width={width}
            height={height}
            x={0}
            y={0}
            fill={`white`}
          />

          {elements.map((element, elementId) => {
            switch (element.elementType) {
              case "image":
                return (
                  <CanvasImage
                    data={element.data}
                    key={elementId}
                    pageId={pageId}
                    elementId={elementId}
                    selected={selected}
                    imageFilter={element.filters}
                    layerRef={layerRef}
                    CHANGE_ELEMENT_POSITION={CHANGE_ELEMENT_POSITION}
                    CHANGE_ELEMENT_SCALE={CHANGE_ELEMENT_SCALE}
                    SELECT_ELEMENT={SELECT_ELEMENT}
                  />
                );
              case "text":
                return (
                  <CanvasText
                    data={element.data}
                    key={elementId}
                    pageId={pageId}
                    elementId={elementId}
                    selected={selected}
                    textFilter={element.filters}
                    CHANGE_ELEMENT_POSITION={CHANGE_ELEMENT_POSITION}
                    SELECT_ELEMENT={SELECT_ELEMENT}
                  />
                );
              case "shape":
                return (
                  <CanvasShape
                    data={element.data}
                    key={elementId}
                    pageId={pageId}
                    elementId={elementId}
                    selected={selected}
                    layerRef={layerRef}
                    shapeFilter={element.filters}
                    CHANGE_ELEMENT_POSITION={CHANGE_ELEMENT_POSITION}
                    CHANGE_ELEMENT_SCALE={CHANGE_ELEMENT_SCALE}
                    SELECT_ELEMENT={SELECT_ELEMENT}
                  />
                );
              default:
                break;
            }
          })}
        </Layer>
      </KonvaStage>
    </>
  );
};

export default CanvasPage;
