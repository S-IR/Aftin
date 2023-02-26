import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { shapeFilter } from "../features/canvasPages/canvas-elements/filtersHandlingReducers";
import { HTMLHexColor } from "../typings/typings";
import {
  addImage,
  changeImageFilter,
  imageData,
  imageFilterProperties,
  resetImageFilter,
  setCrop,
  setCropRectangleArea,
  setHasCrop,
} from "./imageHandlers";
import {
  addShape,
  addShapePatternImage,
  changeShapeFillColor,
  changeShapeStrokeColor,
  removeShapePatternImage,
  shapeData,
  shapeFilterProperties,
} from "./shapeHandlers";
import {
  addText,
  changeFontColor,
  changeFontFamily,
  changeFontSize,
  changeFontVariant,
  changeStrokeWidth,
  changeText,
  textData,
  textFilterProperties,
} from "./textHandlers";
import { TemporalState, temporal } from "zundo";
import { useStore } from "zustand";

export type canvasElement =
  | {
      elementType: "image";
      data: imageData;
      filters: imageFilterProperties;
    }
  | {
      elementType: "text";
      data: textData;
      filters: textFilterProperties;
    }
  | {
      elementType: "shape";
      data: shapeData;
      filters: shapeFilterProperties;
    };

export type deletePage = (pageId: number) => void;
export type selectPage = (pageId: number) => void;
export type changePageSize = (w?: number, h?: number) => void;

export type changeElementPosition = (
  pageId: number,
  elementId: number,
  pageX: number,
  pageY: number
) => void;

export type changeElementScale = (
  pageId: number,
  elementId: number,
  scaleX: number,
  scaleY: number
) => void;
export type selectElement = (
  pageId: number | null,
  elementId: number | null
) => void;
export type deleteElement = (pageId: number, elementId: number) => void;
export type canvasSelected = {
  page: number | null;
  element: number | null;
};

export type canvasState = {
  pages: Array<canvasElement[]>;
  selected: canvasSelected;
  w: number | null;
  h: number | null;
};

export type changeStrokeColor = (
  pageId: number,
  elementId: number,
  stroke: HTMLHexColor
) => void;

type canvasActions = {
  ADD_PAGE: () => void;
  DELETE_PAGE: deletePage;
  SELECT_PAGE: selectPage;
  CHANGE_PAGE_SIZE: (w: number, h: number) => void;

  CHANGE_ELEMENT_POSITION: changeElementScale;
  CHANGE_ELEMENT_SCALE: changeElementScale;
  SELECT_ELEMENT: selectElement;
  DELETE_ELEMENT: deleteElement;
  CHANGE_STROKE_COLOR: changeStrokeColor;

  ADD_TEXT: addText;
  CHANGE_TEXT: changeText;
  CHANGE_FONT_FAMILY: changeFontFamily;
  CHANGE_FONT_SIZE: changeFontSize;
  CHANGE_FONT_VARIANT: changeFontVariant;
  CHANGE_STROKE_WIDTH: changeStrokeWidth;
  CHANGE_FONT_COLOR: changeFontColor;

  ADD_IMAGE: addImage;
  SET_CROP: setCrop;
  SET_CROP_RECTANGLE_DATA: setCropRectangleArea;
  SET_HAS_CROP: setHasCrop;
  CHANGE_IMAGE_FILTER: changeImageFilter;
  RESET_IMAGE_FILTER: resetImageFilter;

  ADD_SHAPE: addShape;
  REMOVE_SHAPE_PATTERN_IMAGE: removeShapePatternImage;
  ADD_SHAPE_PATTERN_IMAGE: addShapePatternImage;
  CHANGE_SHAPE_FILL_COLOR: changeShapeFillColor;
  CHANGE_SHAPE_STROKE_COLOR: changeShapeStrokeColor;
};

export const useCanvasState = create(
  temporal<canvasState & canvasActions>(
    (set, get) => ({
      pages: [[]],
      w: null,
      h: null,
      selected: { page: null, element: null },
      ADD_PAGE: () =>
        set(
          produce((state: canvasState) => {
            state.pages.push([]);
          })
        ),
      DELETE_PAGE: (pageId) =>
        set(
          produce((state: canvasState) => {
            state.pages.splice(pageId, 1);
          })
        ),
      SELECT_PAGE: (pageId) =>
        set(
          produce((state: canvasState) => {
            state.selected.page = pageId;
            state.selected.element = null;
          })
        ),
      CHANGE_PAGE_SIZE: (w, h) =>
        set(
          produce((state: canvasState) => {
            state.w = w;
            state.h = h;
          })
        ),

      CHANGE_ELEMENT_POSITION: (pageId, elementId, x, y) =>
        set(
          produce((state: canvasState) => {
            state.pages[pageId][elementId].data.x = x;
            state.pages[pageId][elementId].data.y = y;
          })
        ),
      CHANGE_ELEMENT_SCALE: (pageId, elementId, scaleX, scaleY) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as imageData;
            data.scaleX = scaleX;
            data.scaleY = scaleY;
          })
        ),
      SELECT_ELEMENT: (pageId, elementId) =>
        set(
          produce((state: canvasState) => {
            state.selected = { page: pageId, element: elementId };
          })
        ),
      DELETE_ELEMENT: (pageId, elementId) =>
        set(
          produce((state: canvasState) => {
            state.pages[pageId].splice(elementId, 1);
            const pageHasMoreElements = state.pages[pageId].length > 0;
            if (pageHasMoreElements) {
              return (state.selected.element = 0);
            } else {
              state.pages.splice(pageId, 1);
              const canvasHasMoreElements =
                state.pages.length > 0 && state.pages[0].length > 0;
              if (canvasHasMoreElements) {
                state.selected.page = 0;
                state.selected.element = 0;
              } else {
                state.pages = [[]];
                state.selected.page = null;
                state.selected.element = null;
              }
            }

            // else if (canvasHasMoreElements) {
            //   alert(`we are at canvasHasMoreElements `);
            //
            // } else {
            //   alert(`we are at else`);
            //   state.selected.page = null;
            //   state.selected.element = null;
            // }
          })
        ),
      CHANGE_STROKE_COLOR: (pageId, elementId, stroke) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].filters as
              | shapeFilterProperties
              | textFilterProperties;
            data.stroke = stroke;
          })
        ),

      // TEXT HANDLERS

      ADD_TEXT: (pageId, data, filters) =>
        set(
          produce((state: canvasState) => {
            const index = state.pages[pageId].push({
              elementType: "text",
              data,
              filters,
            });
            state.selected = { page: pageId, element: index - 1 };
          })
        ),
      CHANGE_TEXT: (pageId, elementId, text) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as textData;
            data.text = text;
          })
        ),
      CHANGE_FONT_FAMILY: (pageId, elementId, fontFamily) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as textData;
            data.fontFamily = fontFamily;
          })
        ),
      CHANGE_FONT_SIZE: (pageId, elementId, fontSize) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as textData;
            data.fontSize = fontSize;
          })
        ),
      CHANGE_FONT_VARIANT: (pageId, elementId, fontVariant) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as textData;
            data.fontVariant = fontVariant;
          })
        ),
      CHANGE_STROKE_WIDTH: (pageId, elementId, strokeWidth) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as textData;
            data.strokeWidth = strokeWidth;
          })
        ),

      CHANGE_FONT_COLOR: (pageId, elementId, fill) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId]
              .filters as textFilterProperties;
            data.fill = fill;
          })
        ),

      //IMAGE HANDLERS

      ADD_IMAGE: (pageId, data, filterData) =>
        set(
          produce((state: canvasState) => {
            const index = state.pages[pageId].push({
              elementType: "image",
              data,
              filters: filterData,
            });
            state.selected = { page: pageId, element: index - 1 };
          })
        ),

      // WORK IN PROGRESS
      SET_CROP: (pageId, elementId) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as imageData;
            data.crop = !data.crop;
          })
        ),
      SET_CROP_RECTANGLE_DATA: (pageId, elementId, x, y, width, height) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as imageData;
            data.cropRectangle = { x, y, width, height };
          })
        ),
      SET_HAS_CROP: (pageId, elementId) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as imageData;
            data.hasCrop = true;
          })
        ),

      CHANGE_IMAGE_FILTER: (pageId, elementId, property, value) =>
        set(
          produce((state: canvasState) => {
            const filters = state.pages[pageId][elementId]
              .filters as imageFilterProperties;
            filters[property].value = value;
          })
        ),
      RESET_IMAGE_FILTER: () => set(produce((state: canvasState) => state)),
      // SHAPE HANDLERS

      ADD_SHAPE: (pageId, data, filters) =>
        set(
          produce((state: canvasState) => {
            const index = state.pages[pageId].push({
              elementType: "shape",
              data,
              filters,
            });
            state.selected = { page: pageId, element: index - 1 };
          })
        ),
      REMOVE_SHAPE_PATTERN_IMAGE: (pageId, elementId) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as shapeData;
            data.fillPatternImageSRC = null;
          })
        ),
      ADD_SHAPE_PATTERN_IMAGE: (pageId, elementId, fillPatternImageSRC) =>
        set(
          produce((state: canvasState) => {
            const data = state.pages[pageId][elementId].data as shapeData;
            data.fillPatternImageSRC = fillPatternImageSRC;
          })
        ),
      CHANGE_SHAPE_FILL_COLOR: (pageId, elementId, fill) =>
        set(
          produce((state: canvasState) => {
            const filters = state.pages[pageId][elementId]
              .filters as shapeFilterProperties;
            filters.fill = fill;
          })
        ),
      CHANGE_SHAPE_STROKE_COLOR: (pageId, elementId, stroke) =>
        set(
          produce((state: canvasState) => {
            const filters = state.pages[pageId][elementId]
              .filters as shapeFilterProperties;
            filters.stroke = stroke;
          })
        ),
    }),
    { limit: 15 }
  )
);

export const useTemporalCanvasState = <T extends unknown>(
  selector: (state: TemporalState<canvasState & canvasActions>) => T,
  equality?: (a: T, b: T) => boolean
) => useStore(useCanvasState.temporal, selector, equality);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useCanvasState);
  // mountStoreDevtool("tempStore", useTemporalCanvasState);
}
