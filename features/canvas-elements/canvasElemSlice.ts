import { Action, CaseReducer, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import undoable from "redux-undo"
import { RootState } from "../../Redux/store"
import { ADD_IMAGE, imageData, SET_CROP, SET_CROP_RECTANGLE_DATA } from "./imageHandlingReducer"
import { ADD_TEXT, textData, CHANGE_FONT_FAMILY, CHANGE_FONT_SIZE, CHANGE_FONT_VARIANT, CHANGE_TEXT } from "./textHandlingReducer"
import { ADD_SHAPE, shapeData, ADD_SHAPE_PATTERN_IMAGE, REMOVE_SHAPE_PATTERN_IMAGE, } from "./shapeHandlingReducer"



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


const CHANGE_ELEMENT_POSITION: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeElementPosition>> = (state, action) => {
  state.elements[action.payload.id].data.x = action.payload.pageX
  state.elements[action.payload.id].data.y = action.payload.pageY
  return state
}

const CHANGE_STROKE_WIDTH: CaseReducer<WritableDraft<canvasState>, PayloadAction<{id:number, strokeWidth: number}>> = (state, action) => {
  const {id, strokeWidth}  = action.payload
  const selectedElement:textData | shapeData = state.elements[id].data
  selectedElement.strokeWidth = strokeWidth
}

const CHANGE_ELEMENT_SCALE: CaseReducer<WritableDraft<canvasState>, PayloadAction<changeElementScale>> = (state, action) => {
  state.elements[action.payload.id].data.scaleX = action.payload.scaleX
  state.elements[action.payload.id].data.scaleY = action.payload.scaleY
  return state
}
const SELECT_ELEMENT: CaseReducer<WritableDraft<canvasState>, PayloadAction<selectElement>> = (state, action) => {
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
    CHANGE_ELEMENT_POSITION,
    CHANGE_ELEMENT_SCALE,
    SELECT_ELEMENT,
    DELETE_ELEMENT,

    ADD_TEXT,
    CHANGE_TEXT,
    CHANGE_FONT_FAMILY,
    CHANGE_FONT_SIZE,
    CHANGE_FONT_VARIANT,
    CHANGE_STROKE_WIDTH,

    ADD_IMAGE,
    SET_CROP,
    SET_CROP_RECTANGLE_DATA,
    
    ADD_SHAPE,
    REMOVE_SHAPE_PATTERN_IMAGE,
    ADD_SHAPE_PATTERN_IMAGE

  },
})
const undoableCanvasElemSlice = undoable(canvasElemSlice.reducer)
export default undoableCanvasElemSlice
export const canvasElemsActions = canvasElemSlice.actions
export const canvasElemsCount = (state: RootState) => state.canvasElems;



