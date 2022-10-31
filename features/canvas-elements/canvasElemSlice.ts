import { Action, CaseReducer, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import undoable from "redux-undo"
import { RootState } from "../../Redux/store"
import { addImage, imageData, SET_CROP, SET_CROP_RECTANGLE_DATA } from "./imageHandlingReducer"
import { addText, textData, CHANGE_FONT_FAMILY, CHANGE_FONT_SIZE, CHANGE_FONT_VARIANT, CHANGE_TEXT } from "./textHandlingReducer"
import { addShape, shapeData, ADD_SHAPE_PATTERN_IMAGE, REMOVE_SHAPE_PATTERN_IMAGE, } from "./shapeHandlingReducer"



export type canvasElement = {
  elementType: 'image';
  data: imageData;
} | {
  elementType: 'text';
  data: textData;
} | {
  elementType: 'shape';
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
  id: number
}
interface deleteElement {
  id: number
}

export type canvasState = { elements: canvasElement[], selected: number | null }
const initialState: null | canvasState = { elements: [], selected: null }


const changeElementPositon: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeElementPosition>> = (state, action) => {
  state.elements[action.payload.id].data.x = action.payload.pageX
  state.elements[action.payload.id].data.y = action.payload.pageY
  return state
}

const CHANGE_STROKE_WIDTH: CaseReducer<WritableDraft<canvasState>, PayloadAction<{id:number, strokeWidth: number}>> = (state, action) => {
  const {id, strokeWidth}  = action.payload
  const selectedElement:textData | shapeData = state.elements[id].data
  selectedElement.strokeWidth = strokeWidth
}

const changeElementScale: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeElementScale>> = (state, action) => {
  state.elements[action.payload.id].data.scaleX = action.payload.scaleX
  state.elements[action.payload.id].data.scaleY = action.payload.scaleY
  return state
}
const selectElement: CaseReducer<WritableDraft<canvasState>, PayloadAction<selectElement>> = (state, action) => {
  state.selected = action.payload.id
}
const DELETE_ELEMENT: CaseReducer<WritableDraft<canvasState>, PayloadAction<deleteElement>> = (state, action) => {
  const { id } = action.payload
  state.elements.splice(id, 1)
  if (id === 0) {
    state.selected = null
  } else {
    state.selected = 0
  }
}

export const canvasElemSlice = createSlice({
  name: 'canvasElements',
  initialState,
  reducers: {
    changeElementPositon,
    changeElementScale,
    selectElement,
    DELETE_ELEMENT,

    addText,
    CHANGE_TEXT,
    CHANGE_FONT_FAMILY,
    CHANGE_FONT_SIZE,
    CHANGE_FONT_VARIANT,
    CHANGE_STROKE_WIDTH,

    addImage,
    SET_CROP,
    SET_CROP_RECTANGLE_DATA,
    
    addShape,
    REMOVE_SHAPE_PATTERN_IMAGE,
    ADD_SHAPE_PATTERN_IMAGE

  },
})
const undoableCanvasElemSlice = undoable(canvasElemSlice.reducer)
export default undoableCanvasElemSlice
export const canvasElemsActions = canvasElemSlice.actions
export const canvasElemsCount = (state: RootState) => state.canvasElems;



