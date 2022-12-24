import { CaseReducer, combineReducers, PayloadAction } from "@reduxjs/toolkit"
import { number, string } from "yup";
import { color } from "../../../typings/typings";
import { canvasElement, canvasState } from "./canvasElemSlice"
import { textFilter } from "./filtersSlice";

export interface textData {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontVariant: 'normal' | 'italic' | 'bold' | 'italic bold';
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  strokeWidth: number;
  rotation: number;
}
interface addText {
  pageId: number
  data: textData
}
interface changeText {
  pageId: number
  elementId: number
  text: string
}
interface changeFontFamily {
  pageId: number
  elementId: number,
  fontFamily: string
}
interface changeFontSize {
  pageId: number,
  elementId: number,
  fontSize: number
}
interface changeFontVariant {
  pageId: number
  elementId: number,
  fontVariant: 'normal' | 'bold' | 'italic' | 'italic bold'
}
interface addTextFilter {
  pageId: number
  data : textFilter
}
interface changeFontColor {
  pageId: number
   elementId: number,
  fill: `#${string}` 
}

export const ADD_TEXT: CaseReducer<WritableDraft<canvasState>, PayloadAction<addText>> = (state, action) => {
  const { pageId, data } = action.payload
  state.pages[pageId].push({ elementType: 'text', data: data })
  state.selected = {page: pageId, element: state.pages[pageId].length - 1}
}

export const CHANGE_TEXT: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeText>> = (state, action) => {
  const { pageId, elementId, text } = action.payload
  const selectedElement: textData = state.pages[pageId][elementId].data
  selectedElement.text = text
}

export const CHANGE_FONT_FAMILY: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeFontFamily>> = (state, action) => {
  const { pageId, elementId, fontFamily } = action.payload
  const selectedElement: textData = state.pages[pageId][elementId].data
  selectedElement.fontFamily = fontFamily
}
export const CHANGE_FONT_SIZE: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeFontSize>> = (state, action) => {
  const { pageId, elementId, fontSize } = action.payload
  const selectedElement: textData = state.pages[pageId][elementId].data
  selectedElement.fontSize = fontSize
}

export const CHANGE_FONT_VARIANT: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeFontVariant>> = (state, action) => {
  const { pageId, elementId, fontVariant } = action.payload
  const selectedElement: textData = state.pages[pageId][elementId].data
  selectedElement.fontVariant = fontVariant
}



// for the filters

export const ADD_TEXT_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<addTextFilter>> = (state, action) => {
  const {pageId, data} = action.payload
  state[pageId].push(data)
}

export const CHANGE_FONT_COLOR: CaseReducer<WritableDraft<filterState>, PayloadAction<changeFontColor>> = (state, action) => {
  const { pageId, elementId, fill } = action.payload
  const selectedElement: textFilter = state[pageId][elementId]
  selectedElement.filter.fill = fill
}





