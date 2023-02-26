import {
  CaseReducer,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  DEFAULT_OPTIONS,
  imageFilterProperties,
} from "../../../constants/image-editor/imageFilters";
import { ADD_TEXT_FILTER, CHANGE_FONT_COLOR } from "./textHandlingReducer";
import { ADD_SHAPE_FILTER, CHANGE_SHAPE_FILL } from "./shapeHandlingReducer";
import { RootState } from "../../../Redux/store";
import { canvasState } from "./canvasPageSlice";

const initialState: filterState = [[]];
interface newOption {
  id: number;
  property: string;
  value: number;
}

export type imageFilter = { type: "image"; filter: imageFilterProperties };
export type textFilter = {
  type: "text";
  filter: {
    fill: `#${string}`;
    stroke: `#${string}`;
  };
};
export type shapeFilter = {
  type: "shape";
  filter: {
    fill: `#${string}`;
    stroke: `#${string}`;
  };
};

export type drawingFilter = {
  type: "drawing";
  filter: {
    fill: `#${string}`;
  };
};

interface deletePageFilters {
  pageId: number;
}
interface addImageFilter {
  pageId: number;
  data: imageFilter;
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
interface changeStrokeColor {
  pageId: number;
  elementId: number;
  stroke: `#${string}`;
}
interface deleteFilter {
  pageId: number;
  elementId: number;
}

export type filterElement =
  | imageFilter
  | textFilter
  | shapeFilter
  | drawingFilter;
export type filterState = [[]] | [[filterElement]];

// export const ADD_IMAGE_FILTER: CaseReducer<
//   WritableDraft<filterState>,
//   PayloadAction<addImageFilter>
// > = (state, action) => {
//   const { pageId, data } = action.payload;
//   if (state.filters[pageId]) {
//     state.filters[pageId].push(data);
//   } else {
//     state.filters.push([data]);
//   }
// };
// export const CHANGE_IMAGE_FILTER: CaseReducer<
//   WritableDraft<filterState>,
//   PayloadAction<changeImageFilter>
// > = (state, action) => {
//   const { pageId, elementId, property, value } = action.payload;

//   if (state.filters[pageId].length < 1) return;
//   const editedValue = state[pageId][elementId].filter[property];
//   if (!editedValue) return;
//   editedValue.value = value;
// };

export const CHANGE_STROKE_COLOR: CaseReducer<
  WritableDraft<canvasState>,
  PayloadAction<changeStrokeColor>
> = (state, action) => {
  const { pageId, elementId, stroke } = action.payload;
  const selectedElement: textFilter | shapeFilter = state[pageId][elementId];
  selectedElement.filter.stroke = stroke;
};

export const DELETE_FILTER: CaseReducer<
  WritableDraft<filterState>,
  PayloadAction<deleteFilter>
> = (state, action) => {
  const { pageId, elementId } = action.payload;
  state.filters[pageId].splice(elementId, 1);
  if (state.filters[pageId].length < 1) state.splice(pageId, 1);
};
export const DELETE_PAGE_FILTERS: CaseReducer<
  WritableDraft<filterState>,
  PayloadAction<deletePageFilters>
> = (state, action) => {
  const { pageId } = action.payload;
  state.filters.splice(pageId, 1);
};
