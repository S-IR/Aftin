import { canvasPagesActions } from "../../../features/canvasPages/canvas-elements/canvasPageSlice"
import { filtersActions } from "../../../features/canvasPages/canvas-elements/filtersSlice"
import { AppDispatch } from "../../../Redux/store"


export const handleDelete = async (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number
) => {
  const { DELETE_ELEMENT } = canvasPagesActions
  await dispatch(DELETE_ELEMENT({
    pageId,
    elementId
  }))

  const { DELETE_FILTER } = filtersActions
  await dispatch(DELETE_FILTER({
    pageId,
    elementId
  }))

}

export const changeStrokeColor = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
  value: `#${string}`,
 ) => {
  const { CHANGE_STROKE_COLOR } = filtersActions
  return dispatch(CHANGE_STROKE_COLOR({
    pageId,
    elementId,
    stroke: value
  }))
}

export const changeStrokeWidth = (
  dispatch: AppDispatch,
  pageId: number,
  elementId : number,
  strokeWidth: number, 
) => {
  const { CHANGE_STROKE_WIDTH } = canvasPagesActions
  return dispatch(CHANGE_STROKE_WIDTH({
    pageId,
    elementId,
    strokeWidth: strokeWidth
  }))
}
export const handleCrop = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
  x?: number,
  y?: number,
  width?: number,
  height?: number) => {
  const { SET_CROP, SET_CROP_RECTANGLE_DATA } = canvasPagesActions
  dispatch(SET_CROP_RECTANGLE_DATA({
    pageId,
    elementId,
    x,
    y,
    width,
    height
  }))
  dispatch(SET_CROP({
    pageId,
    elementId
  }))
}