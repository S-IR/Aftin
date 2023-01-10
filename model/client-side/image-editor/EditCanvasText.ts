import { canvasPagesActions } from "../../../features/canvasPages/canvas-elements/canvasPageSlice"
import { filtersActions } from "../../../features/canvasPages/canvas-elements/filtersSlice"
import { AppDispatch } from "../../../Redux/store"




export const changeCanvasText = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
  text: string,
) => {

  const { CHANGE_TEXT } = canvasPagesActions
  return dispatch(CHANGE_TEXT({
    pageId,
    elementId,
    text
  }))
}

export const changeFontFamily = (dispatch: AppDispatch, pageId: number, elementId: number, value: string) => {
  const { CHANGE_FONT_FAMILY } = canvasPagesActions
  return dispatch(CHANGE_FONT_FAMILY({
    pageId,
    elementId,
    fontFamily: value
  }))
}

export const changeFontSize = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
  value: number,
) => {

  const { CHANGE_FONT_SIZE } = canvasPagesActions
  return dispatch(CHANGE_FONT_SIZE({
    pageId,
    elementId,
    fontSize: value
  }))
}

export const changeFontVariant = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
  value: 'normal' | 'bold' | 'italic' | 'italic bold') => {

  const { CHANGE_FONT_VARIANT } = canvasPagesActions
  return dispatch(CHANGE_FONT_VARIANT({
    pageId,
    elementId,
    fontVariant: value
  }))
}

export const changeFontColor = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
  value: `#${string}`,
) => {

  const { CHANGE_FONT_COLOR } = filtersActions
  return dispatch(CHANGE_FONT_COLOR({
    pageId,
    elementId,
    fill: value
  }))
}

