import { Action, CaseReducer, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import undoable from "redux-undo"
import { RootState } from "../../Redux/store"

export interface imageData {
  image: HTMLImageElement,
  width: number
  height: number
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
export interface textData {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontVariant: 'normal' | 'italic' | 'bold';
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top'| 'middle' | 'bottom';
  stroke: string;
  strokeWidth: number;
  fillPatternImage: null | HTMLImageElement;
  rotation: number;
}
export interface shapeData {
  x: number
  y: number
}
export type canvasElement = {
  elementType: 'image';
  selected: boolean;
  data: imageData;
} | {
  elementType: 'text';
  selected: boolean;
  data: textData;
} | {
  elementType: 'shape';
  selected: boolean;
  data: shapeData;
}


export type canvasState = canvasElement[]
const initialState: null | canvasState = []

const addImage: CaseReducer<WritableDraft<canvasState>, PayloadAction<imageData>> = (state, action) => {
  const data: imageData = action.payload
  if (!state) return
  return [...state, { elementType: 'image', selected: false, data: data }]
}
const addText: CaseReducer<WritableDraft<canvasState>, PayloadAction<textData>> = (state, action) => {
  const data: textData = action.payload
  if (!state) return
  return [...state, { elementType: 'text', selected: false, data: data }]
}

const addShape: CaseReducer<WritableDraft<canvasState>, PayloadAction<shapeData>> = (state, action) => {
  const data: shapeData = action.payload
  if (!state) return
  return [...state, { elementType: 'shape', selected: false, data: data }]
}



export const canvasElemSlice = createSlice({
  name: 'canvasElements',
  initialState,
  reducers: {
    addImage,
    addShape,
    addText
  },

})
const undoableCanvasElemSlice = undoable(canvasElemSlice.reducer)
export default undoableCanvasElemSlice

export const canvasElemsCount = (state: RootState) => state.canvasElems;

// const addImage:CaseReducer<State, PayloadAction<imageData>> = (state, action)=>{
//   const data:imageData = action.payload
//   if(state === null) return [{type: 'image', data: data}]
//   const lastState = state[state.length - 1]
//   return state.push(lastState, {type: 'image', data: data})
// }



