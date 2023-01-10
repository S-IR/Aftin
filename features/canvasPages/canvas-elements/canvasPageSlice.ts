import { Action, CaseReducer, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import undoable from "redux-undo"
import { RootState } from "../../../Redux/store"
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


interface deletePage { 
  pageId : number
}
interface selectPage { 
  pageId: number
}
interface changePageSize{
  w?: number,
  h?: number,
}

interface changeElementPosition {
  pageId: number
  elementId: number
  pageX: number
  pageY: number
}
interface changeStrokeWidth {
  pageId: number
  elementId:number, 
  strokeWidth: number
}

interface changeElementScale {
  pageId: number
  elementId: number
  scaleX: number
  scaleY: number
}
interface selectElement {
  pageId: number | null
  elementId: number | null
}
interface deleteElement {
  pageId: number
  elementId: number
}
export type canvasSelected = {
  page: number  | null
  element: number | null
} 

export type canvasState = { pages: [canvasElement[]], selected: canvasSelected , w: number| null, h: number| null }
const initialState: canvasState = { pages: [[]], selected: {page: null, element: null}, w: null , h: null }
// EXAMPLE OF STATE :
// {
//   pages : [
//     0 : [{type : 'image', url: 'potato', size: 'tomato}, {type: 'text', font: 'potato', underline:' tomato'}, {type: 'shape', w: '150', h: '150'}],
//     1 : [{type : 'image', url: 'potato', size: 'tomato}, {type: 'text', font: 'potato', underline:' tomato'}, {type: 'shape', w: '150', h: '150'}],
//     2 : [{type : 'image', url: 'potato', size: 'tomato}, {type: 'text', font: 'potato', underline:' tomato'}, {type: 'shape', w: '150', h: '150'}],

//   ]
//   selected : {page: 0, element: 2}
// }




const ADD_PAGE: CaseReducer<canvasState, PayloadAction> = (state, action) => {
   state.pages.push([])
}

const DELETE_PAGE : CaseReducer<canvasState, PayloadAction<deletePage>> = (state, action) => {
  const {pageId} = action.payload
  state.pages.splice(pageId, 1)
}

const SELECT_PAGE: CaseReducer<canvasState, PayloadAction<selectPage>> = (state, action) => {
  const {pageId} = action.payload
  state.selected.page = pageId
  state.selected.element = null
}
const CHANGE_PAGE_SIZE: CaseReducer<canvasState, PayloadAction<changePageSize>> = (state, action) => {
  const {w, h} = action.payload
  if(w) state.w = w
  if(h) state.h = h
}

const CHANGE_ELEMENT_POSITION: CaseReducer<canvasState, PayloadAction<changeElementPosition>> = (state, action) => {
  const {pageId, elementId, pageX, pageY} = action.payload
  state.pages[pageId][elementId].data.x = pageX
  state.pages[pageId][elementId].data.y = pageY
}

const CHANGE_STROKE_WIDTH: CaseReducer<canvasState, PayloadAction<changeStrokeWidth>> = (state, action) => {
  const {pageId, elementId, strokeWidth}  = action.payload
  const selectedElement:textData | shapeData = state.pages[pageId][elementId].data
  selectedElement.strokeWidth = strokeWidth
}

const CHANGE_ELEMENT_SCALE: CaseReducer<canvasState, PayloadAction<changeElementScale>> = (state, action) => {
  const {pageId, elementId, scaleX, scaleY} = action.payload
  state.pages[pageId][elementId].data.scaleX = scaleX
  state.pages[pageId][elementId].data.scaleY = scaleY
}
const SELECT_ELEMENT: CaseReducer<canvasState, PayloadAction<selectElement>> = (state, action) => {
  state.selected.page = action.payload.pageId
  state.selected.element = action.payload.elementId

}
const DELETE_ELEMENT: CaseReducer<canvasState, PayloadAction<deleteElement>> = (state, action) => {
  const { pageId, elementId } = action.payload
  state.pages[pageId].splice(elementId, 1)
  // boolean to determine if there is any element in THAT PAGE's ARRAY left after splicing 
  const isElementInPage = state.pages[pageId].length > 0
  // boolean to determine if there is any element in ANY PAGE ARRAY left after splicing 
  const isElementInCanvas = state.pages.some((page)=> page.length > 0)
  if(isElementInPage){
    state.selected.element = 0
  } else if(isElementInCanvas){
    state.selected.page = 0
    state.selected.element = 0
  } else {
    state.selected.page = null
    state.selected.element = null
  }
}

export const canvasPagesSlice = createSlice({
  name: 'canvasElements',
  initialState,
  reducers: {

    ADD_PAGE,
    DELETE_PAGE,
    SELECT_PAGE,
    CHANGE_PAGE_SIZE,

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
const undoableCanvasPagesSlice = undoable(canvasPagesSlice.reducer)
export default undoableCanvasPagesSlice
export const canvasPagesActions = canvasPagesSlice.actions
export const canvasPagesCount = (state: RootState) => state.canvasPageElems;



