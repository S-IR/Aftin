import { canvasElemsActions, canvasElemSlice } from "../../features/canvas-elements/canvasElemSlice";
import { filtersActions } from "../../features/canvas-elements/filtersSlice";
import { AppDispatch } from "../../Redux/store";
import { color } from "../../typings/typings";



export const changeCanvasText = (text: string, id: number, dispatch: AppDispatch) => {
  
  const { CHANGE_TEXT} = canvasElemsActions
  return dispatch(CHANGE_TEXT({
    id,
    text
  }))
}

export const changeFontFamily = (value: string, id: number, dispatch: AppDispatch) => {
  
  const { CHANGE_FONT_FAMILY} = canvasElemsActions
  return dispatch(CHANGE_FONT_FAMILY({
    id,
    fontFamily: value
  }))
}

export const changeFontSize = (value: number, id: number, dispatch: AppDispatch) => {
  
  const { CHANGE_FONT_SIZE} = canvasElemsActions
  return dispatch(CHANGE_FONT_SIZE({
    id,
    fontSize: value
  }))
}

export const changeFontVariant = (value: 'normal' | 'bold' | 'italic' | 'italic bold', id: number, dispatch: AppDispatch) => {
  
  const { CHANGE_FONT_VARIANT} = canvasElemSlice.actions
  return dispatch(CHANGE_FONT_VARIANT({
    id,
    fontVariant: value
  }))
}

export const changeFontColor = (value: `#${string}`, id: number, dispatch: AppDispatch) => {
  
  const { CHANGE_FONT_COLOR} = filtersActions
  return dispatch(CHANGE_FONT_COLOR({
    id,
    fill: value
  }))
}

