import { CircleConfig } from "konva/lib/shapes/Circle";
import { RectConfig } from "konva/lib/shapes/Rect";
import React, { LegacyRef, useEffect, useRef } from "react";
import { Circle, KonvaNodeComponent, Rect, Ring } from "react-konva";

import {
  canvasSelected,
  changeElementPosition,
  changeElementScale,
  selectElement,
} from "../../../zustand/CanvasStore/store";
import TransformerComp from "./TransformerComp";
import {
  shapeData,
  shapeFilterProperties,
} from "../../../zustand/CanvasStore/shapeHandlers";

interface props {
  data: shapeData;
  pageId: number;
  elementId: number;
  selected: canvasSelected;
  shapeFilter: shapeFilterProperties;
  layerRef: undefined | Layer | null;
  CHANGE_ELEMENT_POSITION: changeElementPosition;
  SELECT_ELEMENT: selectElement;
  CHANGE_ELEMENT_SCALE: changeElementScale;
}
/**
 * The shape component that is meant to appear in the canvas editor
 */
const CanvasShape = ({
  data,
  pageId,
  elementId,
  selected,
  shapeFilter,
  layerRef,
  CHANGE_ELEMENT_POSITION,
  SELECT_ELEMENT,
  CHANGE_ELEMENT_SCALE,
}: props) => {
  const shapeRef =
    useRef<LegacyRef<KonvaNodeComponent<CircleConfig, RectConfig>>>(null);
  const isSelected =
    selected?.page === pageId && selected.element === elementId;
  const fillPatternImage = new Image();
  if (data.fillGradientDirection) {
    const grandientDirrectionArray = data.fillGradientDirection.split("-");
    const gradientStart = grandientDirrectionArray[0];
    const gradientEnd = grandientDirrectionArray[1];
  }

  useEffect(() => {
    if (data.fillPatternImageSRC !== null && shapeRef.current !== null) {
      fillPatternImage.src = data.fillPatternImageSRC;
      fillPatternImage.onload = () => {
        shapeRef.current.cache();
        layerRef.current.draw();
      };
      console.log("fillPatternImage.src", fillPatternImage.src);
    }
  }, [data.fillPatternImageSRC]);

  switch (data.shape) {
    case "Ring":
      return (
        <>
          <Ring
            ref={shapeRef}
            onClick={() => SELECT_ELEMENT(pageId, elementId)}
            onTap={() => SELECT_ELEMENT(pageId, elementId)}
            width={data.width}
            height={data.height}
            x={data.x}
            y={data.y}
            fill={
              data.fillPatternImageSRC !== null ? undefined : shapeFilter.fill
            }
            fillPatternImage={fillPatternImage}
            stroke={shapeFilter.stroke}
            strokeWidth={data.strokeWidth}
            draggable
            onDragEnd={(e) =>
              CHANGE_ELEMENT_POSITION(
                pageId,
                elementId,
                e.target.x(),
                e.target.y()
              )
            }
            innerRadius={data.innerRadius as number}
            outerRadius={data.outerRadius as number}
          />
          {isSelected && (
            <TransformerComp isSelected={isSelected} elementRef={shapeRef} />
          )}
        </>
      );
    case "Circle":
      return (
        <>
          <Circle
            ref={shapeRef}
            onClick={() => SELECT_ELEMENT(pageId, elementId)}
            onTap={() => SELECT_ELEMENT(pageId, elementId)}
            width={data.width}
            height={data.height}
            x={data.x}
            y={data.y}
            fill={
              data.fillPatternImageSRC !== null ? undefined : shapeFilter.fill
            }
            fillPatternImage={fillPatternImage}
            stroke={shapeFilter.stroke}
            strokeWidth={data.strokeWidth}
            draggable
            onDragEnd={(e) =>
              CHANGE_ELEMENT_POSITION(
                pageId,
                elementId,
                e.target.x(),
                e.target.y()
              )
            }
          />
          {isSelected && (
            <TransformerComp isSelected={isSelected} elementRef={shapeRef} />
          )}
        </>
      );
    default:
      return (
        <>
          <Rect
            ref={shapeRef}
            onClick={() => SELECT_ELEMENT(pageId, elementId)}
            onTap={() => SELECT_ELEMENT(pageId, elementId)}
            width={data.width}
            height={data.height}
            x={data.x}
            y={data.y}
            fill={
              data.fillPatternImageSRC !== null ? undefined : shapeFilter.fill
            }
            fillPatternImage={fillPatternImage}
            stroke={shapeFilter.stroke}
            strokeWidth={data.strokeWidth}
            draggable
            onDragEnd={(e) =>
              CHANGE_ELEMENT_POSITION(
                pageId,
                elementId,
                e.target.x(),
                e.target.y()
              )
            }
            onTransformEnd={() => {
              CHANGE_ELEMENT_SCALE(
                pageId,
                elementId,
                shapeRef.current.scaleX(),
                shapeRef.current.scaleY()
              );
            }}
          />
          {isSelected && (
            <TransformerComp isSelected={isSelected} elementRef={shapeRef} />
          )}
        </>
      );
  }
};

export default CanvasShape;
