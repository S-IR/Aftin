import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { type } from "os"
import { color, HTMLHexColor } from "../../typings/typings"
import { canvasElement, canvasState } from "./canvasElemSlice"
import { shapeFilter } from "./filtersSlice"


export interface shapeData {
  shape: string
  width: number
  height: number
  x: number
  y: number
  fillPatternImageSRC: string
  fillGradientDirection: null | 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top'
  fillLinearGradientColorStops: null | Array<number | color>
  strokeWidth: number
}

export const ADD_SHAPE: CaseReducer<WritableDraft<canvasState>, PayloadAction<shapeData>> = (state, action) => {
  const data: shapeData = action.payload
  state.elements.push({ elementType: 'shape', data: data })
  state.selected = state.elements.length - 1
}

export const ADD_SHAPE_PATTERN_IMAGE: CaseReducer<WritableDraft<canvasState>, PayloadAction<{ id: number, fillPatternImageSRC: string }>> = (state, action) => {
  const { id, fillPatternImageSRC } = action.payload
  const selectedElement: shapeData = state.elements[id].data
  selectedElement.fillPatternImageSRC = fillPatternImageSRC
}

export const REMOVE_SHAPE_PATTERN_IMAGE: CaseReducer<WritableDraft<canvasState>, PayloadAction<{ id: number }>> = (state, action) => {
  const { id } = action.payload
  state.elements[id].data.fillPatternImageSRC = ''
}

//Reducers for filters


export const ADD_SHAPE_FILTER: CaseReducer<WritableDraft<canvasState>, PayloadAction<shapeFilter>> = (state, action) => {
  const shapeFilter = action.payload
  state.push(shapeFilter)
}


export const CHANGE_SHAPE_FILL: CaseReducer<WritableDraft<canvasState>, PayloadAction<{ id: number, fill: HTMLHexColor }>> = (state, action) => {
  const { id, fill } = action.payload
  state[id].filter.fill = fill
}

export const CHANGE_TEXT_STROKE_COLOR: CaseReducer<WritableDraft<canvasState>, PayloadAction<{ id: number, stroke: `#${string}` }>> = (state, action) => {
  const { id, stroke } = action.payload
  const selectedElement: shapeFilter = state[id]
  selectedElement.filter.stroke = stroke
}


