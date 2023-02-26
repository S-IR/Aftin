import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Rect } from "konva/lib/shapes/Rect";
import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  KonvaNodeComponent,
  Rect as KonvaRect,
  Transformer,
} from "react-konva";
import {
  canvasPagesActions,
  canvasPagesCount,
} from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { imageData } from "../../../features/canvasPages/canvas-elements/imageHandlingReducer";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { useCanvasState } from "../../../zustand/CanvasStore/store";

interface props {
  data: imageData;
  elementRef:
    | LegacyRefImage
    | ImageConfig
    | Circle
    | CircleConfig
    | Rect
    | RectConfig;
}

const CropComponent = ({ data, elementRef }: props) => {
  const { page: pageId, element: elementId } = useCanvasState(
    (state) => state.selected
  );

  const [SET_CROP_RECTANGLE_DATA] = useCanvasState(
    useCallback((state) => [state.SET_CROP_RECTANGLE_DATA] as const, [])
  );

  const trRef = useRef<Rect>(null);
  const CropRect = useRef<Rect>(null);

  useEffect(() => {
    if (!trRef.current) return;
    trRef.current.nodes([CropRect.current]);
    trRef.current.getLayer().batchDraw();
  }, []);

  let posStart: { x: any; y: any } | string = "";
  let posNow: { x: any; y: any } | string = "";
  let mode: string = "";

  if (pageId === null || elementId === null) {
    console.log("there is no selected image or page for the filter component");
    return <></>;
  }
  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    // const target = e.target
    // const targetRect = e.target.getClientRect()
    // if( haveIntersection(targetRect, r1) {
  };
  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    SET_CROP_RECTANGLE_DATA(
      pageId,
      elementId,
      e.target.x(),
      e.target.y(),
      e.target.width() * e.target.scaleX(),
      e.target.height() * e.target.scaleX()
    );
  };

  return (
    <>
      <KonvaRect
        x={100}
        y={100}
        width={100}
        height={100}
        stroke={"red"}
        filters={[Konva.Filters.Brighten]}
        brightness={20}
        strokeWidth={4}
        rotation={0}
        dash={[2, 2]}
        ref={CropRect}
        draggable
        onDragMove={(e) => {
          handleDragMove(e);
        }}
        onDragEnd={(e) => {
          handleDragEnd(e);
        }}
        fill={"white"}
        opacity={0.2}
      />
      <Transformer
        rotateEnabled={false}
        anchorFill={"orange"}
        anchorSize={12}
        anchorStroke={"red"}
        borderStroke={"red"}
        anchorCornerRadius={99}
        borderDash={[12, 12]}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          SET_CROP_RECTANGLE_DATA(
            pageId,
            elementId,
            newBox.x,
            newBox.y,
            newBox.width,
            newBox.height
          );
          return newBox;
        }}
        ref={trRef}
      />
    </>
  );
};

export default CropComponent;
