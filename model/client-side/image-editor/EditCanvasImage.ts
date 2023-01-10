import { canvasPagesActions } from "../../../features/canvasPages/canvas-elements/canvasPageSlice"
import { filtersActions } from "../../../features/canvasPages/canvas-elements/filtersSlice"
import { AppDispatch } from "../../../Redux/store"


export const handleResetFilters = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
) => {
  const {RESET_IMAGE_FILTER} = filtersActions
  dispatch(RESET_IMAGE_FILTER({
    pageId,
    elementId
  }))
}
export const handleRemovePattern = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
) => {
  const {REMOVE_SHAPE_PATTERN_IMAGE} = canvasPagesActions
  dispatch(REMOVE_SHAPE_PATTERN_IMAGE({
    pageId,
    elementId
  }))
}
export const handleCrop = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
) => {
  const {SET_CROP} = canvasPagesActions
  dispatch(SET_CROP({
    pageId,
    elementId
  }))
}
