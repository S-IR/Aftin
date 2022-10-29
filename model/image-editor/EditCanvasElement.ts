import { canvasElemsActions, canvasElemSlice } from "../../features/canvas-elements/canvasElemSlice"
import { filtersActions } from "../../features/canvas-elements/filtersSlice"
import { AppDispatch } from "../../Redux/store"

export const handleDelete = async (
  id: number,
  dispatch: AppDispatch) => {
  const { DELETE_ELEMENT } = canvasElemSlice.actions
  await dispatch(DELETE_ELEMENT({
    id: id
  }))

  const { DELETE_FILTER } = filtersActions
  await dispatch(DELETE_FILTER({
    id: id
  }))

}

export const changeStrokeColor = (value: `#${string}`, id: number, dispatch: AppDispatch) => {
  const { CHANGE_STROKE_COLOR } = filtersActions
  return dispatch(CHANGE_STROKE_COLOR ({
    id,
    stroke: value
  }))
}

export const changeStrokeWidth = (strokeWidth: number, id: number, dispatch: AppDispatch) => {
  const { CHANGE_STROKE_WIDTH } = canvasElemsActions
  return dispatch(CHANGE_STROKE_WIDTH ({
    id,
    strokeWidth: strokeWidth
  }))
}