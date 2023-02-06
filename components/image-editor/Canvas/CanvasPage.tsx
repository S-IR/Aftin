import React, { LegacyRef, useEffect, useRef, useState } from "react";
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
import {
  filtersCount,
  imageFilter,
  shapeFilter,
  textFilter,
} from "../../../features/canvasPages/canvas-elements/filtersSlice";
import {
  canvasElement,
  canvasPagesCount,
  canvasSelected,
} from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { RectConfig } from "konva/lib/shapes/Rect";

interface props {
  width: number;
  height: number;
  elements: canvasElement[];
  selected: canvasSelected;
  // if the element that is selected is on this page, the selectedElement value will be a number, else it will just be null
  pageId: number;
  setStageRefs: React.Dispatch<
    React.SetStateAction<
      React.RefObject<KonvaNodeComponent<Stage, StageProps>>[]
    >
  >;
}

const CanvasPage = ({
  width,
  height,
  elements,
  selected,
  pageId,
  setStageRefs,
}: props) => {
  const filters = useAppSelector(filtersCount);

  const canvasBGRef = useRef<null | Rect | RectConfig>(null);
  const canvasContainer = useRef<null | HTMLDivElement>(null);
  const isPageSelected = selected?.page === pageId;
  const layerRef = useRef<undefined | Layer | null>(null);

  const stageRef = useRef<KonvaNodeComponent<Stage, StageProps>>(null);
  useEffect(() => {
    if (!stageRef || stageRef.current === null) return;
    // ts is weird, the guard clause from above will block the stage from being null
    setStageRefs((stageRefs) => [...stageRefs, stageRef]);
  }, [stageRef]);

  return (
    <div
      className=" m-5 ml-28 flex  h-full w-min flex-col "
      ref={canvasContainer}
    >
      <h3 className="g mx-auto my-2  text-xl md:text-4xl">{`Page ${
        pageId + 1
      }`}</h3>
      <KonvaStage
        width={width}
        height={height}
        ref={stageRef}
        willReadFrequently={true}
        className={`border-gradient-to-br rounded-sm border-2 from-gray-400 to-gray-600 ${
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
                    imageFilter={filters[pageId][elementId] as imageFilter}
                    layerRef={layerRef}
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
                    textFilter={filters[pageId][elementId] as textFilter}
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
                    shapeFilter={filters[pageId][elementId] as shapeFilter}
                  />
                );
              default:
                break;
            }
          })}
        </Layer>
      </KonvaStage>
    </div>
  );
};

export default CanvasPage;
