import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { type } from "os"
import { color } from "../../typings"
import { canvasElement, canvasState } from "./canvasElemSlice"


export interface shapeData {
  shape: string
  width: number
  height: number
  x: number
  y: number
  fill: string
  fillPatternImageSRC: string
  fillGradientDirection: null | 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top'
  fillLinearGradientColorStops: null| Array<number | color>
  stroke: string
  strokeWidth: number
}

export const addShape: CaseReducer<WritableDraft<canvasState>, PayloadAction<shapeData>> = (state, action) => {
  const data: shapeData = action.payload  
  if (!state) return
  state = state.map((element:canvasElement) =>{
    return {...element, selected: false}
  })
  return [...state, { elementType: 'shape', selected: true, data: data }]
}