import produce from "immer";
import { canvasState } from "./store";

export interface imageData {
  imageSRC: string;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  borderWidth: number;
  borderColor: string;
  x: number;
  y: number;
  rotate: number;
  crop: boolean;
  hasCrop: boolean;
  cropRectangle: {
    x: number | undefined;
    y: number | undefined;
    width: number | undefined;
    height: number | undefined;
  };
}

export type addImage = (
  pageId: number,
  data: imageData,
  filterData: imageFilterProperties
) => void;
export type setCrop = (pageId: number, elementId: number) => void;

export type setCropRectangleArea = (
  pageId: number,
  elementId: number,
  x?: number,
  y?: number,
  width?: number,
  height?: number
) => void;
export type setHasCrop = (pageId: number, elementId: number) => void;

export type changeImageFilter = (
  pageId: number,
  elementId: number,
  property: string,
  value: number
) => void;
export type resetImageFilter = (pageId: number, elementId: number) => void;

export interface CSSFilter {
  property: string;
  value: number;
  range: {
    min: number;
    max: number;
  };
  unit: "%" | "deg" | "px";
}
export interface imageFilterProperties {
  brightness: CSSFilter;
  contrast: CSSFilter;
  blur: CSSFilter;
}
