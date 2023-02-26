import { color, HTMLHexColor } from "../typings/typings";

export interface shapeData {
  shape: string;
  width: number;
  height: number;
  x: number;
  y: number;
  fillPatternImageSRC: string | null;
  fillGradientDirection:
    | null
    | "left-right"
    | "right-left"
    | "top-bottom"
    | "bottom-top";
  fillLinearGradientColorStops: null | Array<number | color>;
  strokeWidth: number;
  innerRadius?: number;
  outerRadius?: number;
}
export interface shapeFilterProperties {
  fill: `#${string}`;
  stroke: `#${string}`;
}

export type addShape = (
  pageId: number,
  data: shapeData,
  filters: shapeFilterProperties
) => void;
export type addShapePatternImage = (
  pageId: number,
  elementId: number,
  fillPatternImageSRC: string
) => void;
export type removeShapePatternImage = (
  pageId: number,
  elementId: number
) => void;
export type addShapeFilter = (pageId: number, data: shapeData) => void;
export type changeShapeFillColor = (
  pageId: number,
  elementId: number,
  fill: HTMLHexColor
) => void;

export type changeTextStrokeColor = (
  pageId: number,
  elementId: number,
  stroke: `#${string}`
) => void;

export type changeShapeStrokeColor = (
  pageId: number,
  elementId: number,
  stroke: `#${string}`
) => void;
