import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { type } from "os";
import { color, HTMLHexColor } from "../../../typings/typings";
import { canvasElement, canvasState } from "./canvasElemSlice";
import { shapeFilter } from "./filtersHandlingReducers";

export interface shapeData {
  shape: string;
  width: number;
  height: number;
  x: number;
  y: number;
  fillPatternImageSRC: string;
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
interface addShape {
  pageId: number;
  data: shapeData;
}
interface addShapePatternImage {
  pageId: number;
  elementId: number;
  fillPatternImageSRC: string;
}
interface removeShapePatternImage {
  pageId: number;
  elementId: number;
}
interface addShapeFilter {
  pageId: number;
  data: shapeFilter;
}
interface changeShapeFill {
  pageId: number;
  elementId: number;
  fill: HTMLHexColor;
}

interface changeTextStrokeColor {
  pageId: number;
  elementId: number;
  stroke: `#${string}`;
}

export const ADD_SHAPE: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<addShape>
> = (state, action) => {
  const { pageId, data } = action.payload;
  state.pages[pageId].push({ elementType: "shape", data: data });
  state.selected = { page: pageId, element: state.pages[pageId].length - 1 };
};

export const ADD_SHAPE_PATTERN_IMAGE: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<addShapePatternImage>
> = (state, action) => {
  const { pageId, elementId, fillPatternImageSRC } = action.payload;
  const selectedElement: shapeData = state.pages[pageId][elementId].data;
  selectedElement.fillPatternImageSRC = fillPatternImageSRC;
};

export const REMOVE_SHAPE_PATTERN_IMAGE: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<removeShapePatternImage>
> = (state, action) => {
  const { pageId, elementId } = action.payload;
  state.pages[pageId][elementId].data.fillPatternImageSRC = "";
};

//Reducers for filters

export const ADD_SHAPE_FILTER: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<addShapeFilter>
> = (state, action) => {
  const { pageId, data } = action.payload;
  state.filters[pageId].push(data);
};

export const CHANGE_SHAPE_FILL: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<changeShapeFill>
> = (state, action) => {
  const { pageId, elementId, fill } = action.payload;
  console.log(
    `CHANGE_SHAPE_FILL: pageId, elementId, fill`,
    pageId,
    elementId,
    fill
  );

  state[pageId][elementId].filter.fill = fill;
};

export const CHANGE_TEXT_STROKE_COLOR: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<changeTextStrokeColor>
> = (state, action) => {
  const { pageId, elementId, stroke } = action.payload;
  const selectedElement: shapeFilter = state.filters[pageId][elementId];
  selectedElement.filter.stroke = stroke;
};
