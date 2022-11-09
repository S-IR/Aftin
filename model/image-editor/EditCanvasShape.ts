import { canvasElemsActions } from "../../features/canvas-elements/canvasElemSlice";
import { filtersActions } from "../../features/canvas-elements/filtersSlice";
import { AppDispatch } from "../../Redux/store";
import { HTMLHexColor } from "../../typings/typings";

export const changeShapeFill = (
  fill: HTMLHexColor,
  id : number,
  dispatch: AppDispatch
  ) =>{
    const {CHANGE_SHAPE_FILL} = filtersActions
    dispatch(CHANGE_SHAPE_FILL({
      id,
      fill
    }))
  }


 export  const setStrokeWidth = (
  strokeWidth: number,
  id : number,
  dispatch: AppDispatch
  ) =>{
    const {CHANGE_STROKE_WIDTH} = canvasElemsActions
    dispatch(CHANGE_STROKE_WIDTH({
      id,
      strokeWidth
    }))
  }
  export const fillWithPattern = (
    imagesArray: FileList | null,
    id: number,
    dispatch: AppDispatch
  ) => {
    if(!imagesArray) return console.log('no image was provided')
    let image = new Image()
    const selected = imagesArray[0]
    image.src = URL.createObjectURL(selected)
    image.onload = () =>{
      const {ADD_SHAPE_PATTERN_IMAGE} = canvasElemsActions
      dispatch(ADD_SHAPE_PATTERN_IMAGE({
        id:id,
        fillPatternImageSRC: image.src
      }))
    }
    
  }
  