import { canvasPagesActions } from "../../features/canvasPages/canvas-elements/canvasPageSlice";
import { filtersActions } from "../../features/canvasPages/canvas-elements/filtersSlice";
import { AppDispatch } from "../../Redux/store";
import { HTMLHexColor } from "../../typings/typings";

export const changeShapeFill = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
  fill: HTMLHexColor,
  ) =>{
    const {CHANGE_SHAPE_FILL} = filtersActions
    dispatch(CHANGE_SHAPE_FILL({
      pageId,
      elementId,
      fill
    }))
  }


 export  const setStrokeWidth = (
  dispatch: AppDispatch,
  pageId: number,
  elementId: number,
  strokeWidth: number,
  ) =>{
    const {CHANGE_STROKE_WIDTH} = canvasPagesActions
    dispatch(CHANGE_STROKE_WIDTH({
      pageId,
      elementId,
      strokeWidth
    }))
  }
  export const fillWithPattern = (
    dispatch: AppDispatch,
    pageId : number,
    elementId: number,
    imagesArray: FileList | null,
  ) => {
    if(!imagesArray) return console.log('no image was provided')
    let image = new Image()
    const selected = imagesArray[0]
    image.src = URL.createObjectURL(selected)
    image.onload = () =>{
      const {ADD_SHAPE_PATTERN_IMAGE} = canvasPagesActions
      dispatch(ADD_SHAPE_PATTERN_IMAGE({
        pageId,
        elementId,
        fillPatternImageSRC: image.src
      }))
    }
    
  }
  