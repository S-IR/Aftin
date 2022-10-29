import { CaseReducer, createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DEFAULT_OPTIONS, imageFilterProperties } from "../../constants/image-editor/imageFilters"
import { ADD_TEXT_FILTER, CHANGE_FONT_COLOR } from "./textHandlingReducer";
import { ADD_SHAPE_FILTER, CHANGE_SHAPE_FILL } from "./shapeHandlingReducer";
import { RootState } from "../../Redux/store";

const initialState: filterState = []
interface newOption {
  id: number,
  property: string,
  value: number
}

export type imageFilter = { type: 'image', filter: imageFilterProperties }
export type textFilter = {
  type: 'text'
  filter: {
    fill: `#${string}`,
    stroke: `#${string}`,
  }
}
export type shapeFilter = {
  type: 'shape'
  filter: {
    fill: `#${string}`,
    stroke: `#${string}`,
  }
}

export type drawingFilter = {
  type: 'drawing'
  filter: {
    fill: `#${string}`,
  }
}
export type filterElement = imageFilter | textFilter | shapeFilter | drawingFilter
export type filterState = [] | Array<filterElement>

const ADD_IMAGE_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<imageFilter>> = (state, action) => {
  state.push(action.payload)
}
const CHANGE_IMAGE_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<{
  id: number,
  property: string,
  value: number
}>> = (state, action) => {
  const { id, property, value } = action.payload;
  if (state.length < 1) return
  const editedValue = state[id].filter[property]
  if (!editedValue) return
  editedValue.value = value
}
const RESET_IMAGE_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<{ id: number }>> = (state, action) => {
  const { id } = action.payload
  state[id].filter = DEFAULT_OPTIONS
}
export const CHANGE_STROKE_COLOR: CaseReducer<WritableDraft<canvasState>, PayloadAction<{id: number, stroke:`#${string}`}>> = (state, action) => {
  const {id, stroke}  = action.payload
  const selectedElement:textFilter | shapeFilter  = state[id]
  selectedElement.filter.stroke = stroke
}

const DELETE_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<{ id: number }>> = (state, action) => {
  const { id } = action.payload
  state.splice(id, 1)
}
export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    ADD_IMAGE_FILTER,
    CHANGE_IMAGE_FILTER,
    RESET_IMAGE_FILTER,

    ADD_TEXT_FILTER,
    CHANGE_FONT_COLOR,
    CHANGE_STROKE_COLOR,

    ADD_SHAPE_FILTER,
    CHANGE_SHAPE_FILL,

    DELETE_FILTER
  }
})

export const filtersCount = (state: RootState) => state.filters
export const filtersActions = filtersSlice.actions;
export default filtersSlice.reducer;

