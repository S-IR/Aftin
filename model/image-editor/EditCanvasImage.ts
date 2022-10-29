import { canvasElemsActions } from "../../features/canvas-elements/canvasElemSlice";
import { filtersActions } from "../../features/canvas-elements/filtersSlice";
import { AppDispatch } from "../../Redux/store";

export const handleResetFilters = (
  id: number,
  dispatch: AppDispatch
) => {
  const {RESET_IMAGE_FILTER} = filtersActions
  dispatch(RESET_IMAGE_FILTER({
    id: id
  }))
}
export const handleRemovePattern = (
  id: number,
  dispatch: AppDispatch
) => {
  const {REMOVE_SHAPE_PATTERN_IMAGE} = canvasElemsActions
  dispatch(REMOVE_SHAPE_PATTERN_IMAGE({
    id: id
  }))
}
