import { CaseReducer, combineReducers, PayloadAction } from "@reduxjs/toolkit"
import { canvasElement, canvasState } from "./canvasElemSlice"

export interface textData {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontVariant: 'normal' | 'italic' | 'bold';
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  stroke: string;
  strokeWidth: number;
  fillPatternImage: null | HTMLImageElement;
  rotation: number;
}


export const addText: CaseReducer<WritableDraft<canvasState>, PayloadAction<textData>> = (state, action) => {
  const data: textData = action.payload
  if (!state) return
  state = state.map((element:canvasElement) =>{
    return {...element, selected: false}
  })
  return [...state, { elementType: 'text', selected: true, data: data }]
}




