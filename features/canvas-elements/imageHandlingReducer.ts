import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { canvasElement, canvasState } from "./canvasElemSlice"

export interface imageData {
  imageSRC: string,
  width: number
  height: number
  scaleX: number
  scaleY: number
  filters: {
    brightness: number
    contrast: number
    blur: number
    borderWidth: number
    borderColor: string
  }
  x: number
  y: number
  rotate: number
}

export const addImage: CaseReducer<WritableDraft<canvasState>, PayloadAction<imageData>> = (state, action) => {
  const data: imageData = action.payload
  if (!state) return
  state=  state.map((element:canvasElement, index: number) =>{
    return {...element, selected: false}
  })
  return [...state, { elementType: 'image', selected: true, data: data }]
}