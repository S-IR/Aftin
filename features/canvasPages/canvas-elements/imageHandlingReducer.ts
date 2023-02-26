import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  DEFAULT_OPTIONS,
  imageFilterProperties,
} from "../../../constants/image-editor/imageFilters";
import { canvasState } from "./canvasPageSlice";
import { filterState } from "./filtersHandlingReducers";

export type imageFilter = { type: "image"; filter: imageFilterProperties };
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
  cropRectangle: {
    x: number | undefined;
    y: number | undefined;
    width: number | undefined;
    height: number | undefined;
  };
  hasCrop: boolean;
}

interface addImage {
  pageId: number;
  data: imageData;
  filterData: imageFilter;
}
interface setCrop {
  pageId: number;
  elementId: number;
}
interface setCropRectangleArea {
  pageId: number;
  elementId: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
interface changeImageFilter {
  pageId: number;
  elementId: number;
  property: string;
  value: number;
}
interface resetImageFilter {
  pageId: number;
  elementId: number;
}

export const ADD_IMAGE: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<addImage>
> = (state, action) => {
  const { pageId, data, filterData } = action.payload;

  state.pages[pageId].push({ elementType: "image", data: data });
  if (state.filters[pageId]) {
    state.filters[pageId].push(filterData);
  } else {
    state.filters.push([filterData]);
  }
};

export const SET_CROP: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<setCrop>
> = (state, action) => {
  const { pageId, elementId } = action.payload;
  const selectedImage: imageData = state.pages[pageId][elementId].data;
  selectedImage.crop = !selectedImage.crop;
};

export const SET_CROP_RECTANGLE_DATA: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<setCropRectangleArea>
> = (state, action) => {
  const { pageId, elementId, x, y, width, height } = action.payload;
  const selectedImage: imageData = state.pages[pageId][elementId].data;
  if (x) selectedImage.cropRectangle.x = x;
  if (y) selectedImage.cropRectangle.y = y;
  if (width) selectedImage.cropRectangle.width = width;
  if (height) selectedImage.cropRectangle.height = height;
};

//FILTER HANDLING

export const CHANGE_IMAGE_FILTER: CaseReducer<
  WritableDraft<filterState>,
  PayloadAction<changeImageFilter>
> = (state, action) => {
  const { pageId, elementId, property, value } = action.payload;

  if (state.filters[pageId].length < 1) return;
  const editedValue = state[pageId][elementId].filter[property];
  if (!editedValue) return;
  editedValue.value = value;
};

export const RESET_IMAGE_FILTER: CaseReducer<
  WritableDraft<filterState>,
  PayloadAction<resetImageFilter>
> = (state, action) => {
  const { pageId, elementId } = action.payload;
  state.filters[pageId][elementId].filter = DEFAULT_OPTIONS;
};
