import { Action, CaseReducer, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import undoable from "redux-undo"
import { RootState } from "../../Redux/store"
import { addImage, imageData } from "./imageHandlingReducer"
import { addText, textData } from "./textHandlingReducer"
import { addShape, shapeData  } from "./shapeHandlingReducer"



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
interface changeElementPosition {
  id: number
  pageX: number
  pageY: number
}

interface changeElementScale {
  id: number
  scaleX: number
  scaleY: number
}
interface selectElement {
  id:number
}


export type canvasState = canvasElement[]
const initialState: null | canvasState = []


 const changeElementPositon: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeElementPosition>> = (state, action) => {
  state[action.payload.id].data.x = action.payload.pageX
  state[action.payload.id].data.y = action.payload.pageY
  return state
}
const changeElementScale: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeElementScale>> = (state, action) => {
  state[action.payload.id].data.scaleX = action.payload.scaleX
  state[action.payload.id].data.scaleY = action.payload.scaleY
  return state
}
const selectElement: CaseReducer<WritableDraft<canvasState>, PayloadAction<selectElement>> = (state, action) => {
  state.map((element:canvasElement, index: number) =>{
    if(index  === action.payload.id) {
      element.selected = true
    }else{
      element.selected = false
    }
  })
}

export const canvasElemSlice = createSlice({
  name: 'canvasElements',
  initialState,
  reducers: {
    changeElementPositon,
    changeElementScale,
    selectElement,

    addText,
    addImage,
    addShape,
  },
})
const undoableCanvasElemSlice = undoable(canvasElemSlice.reducer)
export default undoableCanvasElemSlice

export const canvasElemsCount = (state: RootState) => state.canvasElems;



