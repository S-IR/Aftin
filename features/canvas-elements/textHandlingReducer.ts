import { CaseReducer, combineReducers, PayloadAction } from "@reduxjs/toolkit"
import { number, string } from "yup";
import { color } from "../../typings/typings";
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


export const addText: CaseReducer<WritableDraft<canvasState>, PayloadAction<textData>> = (state, action) => {
  const data: textData = action.payload
  state.elements.push({ elementType: 'text', data: data })
  state.selected = state.elements.length - 1
}

export const CHANGE_TEXT: CaseReducer<WritableDraft<canvasState>, PayloadAction<{id: number, text:string}>> = (state, action) => {
  const {id, text}  = action.payload
  const selectedElement:textData = state.elements[id].data
  selectedElement.text = text
}

export const CHANGE_FONT_FAMILY: CaseReducer<WritableDraft<canvasState>, PayloadAction<{id: number, fontFamily: string}>> = (state, action) => {
  const {id, fontFamily}  = action.payload
  const selectedElement:textData = state.elements[id].data
  selectedElement.fontFamily = fontFamily
}
export const CHANGE_FONT_SIZE: CaseReducer<WritableDraft<canvasState>, PayloadAction<{id: number, fontSize: number}>> = (state, action) => {
  const {id, fontSize}  = action.payload
  const selectedElement:textData = state.elements[id].data
  selectedElement.fontSize = fontSize
}

export const CHANGE_FONT_VARIANT: CaseReducer<WritableDraft<canvasState>, PayloadAction<{id: number, fontVariant: 'normal' | 'bold' | 'italic' | 'italic bold'}>> = (state, action) => {
  const {id, fontVariant}  = action.payload
  const selectedElement:textData = state.elements[id].data
  selectedElement.fontVariant = fontVariant
}



// for the filters

export const ADD_TEXT_FILTER: CaseReducer<WritableDraft<filterState>, PayloadAction<textFilter>> = (state, action) => {
  const textFilter = action.payload
  state.push(textFilter)
}

export const CHANGE_FONT_COLOR: CaseReducer<WritableDraft<filterState>, PayloadAction<{id: number, fill: `#${string}`}>> = (state, action) => {
  const {id, fill}  = action.payload
  const selectedElement:textFilter = state[id]
  selectedElement.filter.fill = fill
}





