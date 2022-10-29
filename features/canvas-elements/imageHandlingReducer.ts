import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { canvasElement, canvasState } from "./canvasElemSlice"

export interface imageData {
  imageSRC: string,
  width: number
  height: number
  scaleX: number
  scaleY: number
  borderWidth: number
  borderColor: string
  x: number
  y: number
  rotate: number
}

export const addImage: CaseReducer<WritableDraft<canvasState>, PayloadAction<imageData>> = (state, action) => {
  const data: imageData = action.payload
  state.elements.push({ elementType: 'image', data: data })
  state.selected = state.elements.length - 1
}