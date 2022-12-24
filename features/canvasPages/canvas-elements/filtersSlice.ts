import { CaseReducer, createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DEFAULT_OPTIONS, imageFilterProperties } from "../../../constants/image-editor/imageFilters"
import { ADD_TEXT_FILTER, CHANGE_FONT_COLOR } from "./textHandlingReducer";
import { ADD_SHAPE_FILTER, CHANGE_SHAPE_FILL } from "./shapeHandlingReducer";
import { RootState } from "../../../Redux/store";

const initialState: filterState = [[]]
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

interface deletePageFilters{
  pageId : number
}
interface addImageFilter {
  pageId : number
  data : imageFilter
}
interface changeImageFilter{
  pageId: number
  elementId : number
  property: string,
  value: number
}
interface resetImageFilter{
  pageId: number
  elementId: number
}
interface changeStrokeColor{
  pageId: number
  elementId: number
  stroke:`#${string}`
}
interface deleteFilter{
  pageId: number
  elementId: number
}

export type filterElement = imageFilter | textFilter | shapeFilter | drawingFilter
export type filterState = [[]] | [[filterElement]]

const ADD_IMAGE_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<addImageFilter>> = (state, action) => {
  const {pageId, data} = action.payload
  if(state[pageId]){
    state[pageId].push(data)
  } else {
    state.push([data])
  }
}
const CHANGE_IMAGE_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<changeImageFilter>> = (state, action) => {
  const { pageId, elementId, property, value } = action.payload;
  console.log('pageId:', pageId, 'elementId:', elementId);
  
  if (state[pageId].length < 1) return
  const editedValue = state[pageId][elementId].filter[property]
  if (!editedValue) return
  editedValue.value = value
}
const RESET_IMAGE_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<resetImageFilter>> = (state, action) => {
  const { pageId, elementId } = action.payload
  state[pageId][elementId].filter = DEFAULT_OPTIONS
}
export const CHANGE_STROKE_COLOR: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeStrokeColor>> = (state, action) => {
  const {pageId, elementId, stroke}  = action.payload
  const selectedElement:textFilter | shapeFilter  = state[pageId][elementId]
  selectedElement.filter.stroke = stroke
}

const DELETE_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<deleteFilter>> = (state, action) => {
  const { pageId, elementId } = action.payload
  state[pageId].splice(elementId, 1)
}
const DELETE_PAGE_FILTERS : CaseReducer<WritableDraft<filterState>, PayloadAction<deletePageFilters>> = (state, action) => {
  const { pageId }  = action.payload
  state.splice(pageId, 1)
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

    DELETE_FILTER,

    DELETE_PAGE_FILTERS
  }
})

export const filtersCount = (state: RootState) => state.filters
export const filtersActions = filtersSlice.actions;
export default filtersSlice.reducer;

