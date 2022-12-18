import React from "react";
import { DEFAULT_OPTIONS } from "../../constants/image-editor/imageFilters";
import { canvasElemSlice } from "../../features/canvas-elements/canvasElemSlice";
import { shapeData } from "../../features/canvas-elements/shapeHandlingReducer";
import { ADD_TEXT_FILTER, textData } from "../../features/canvas-elements/textHandlingReducer";
import filtersSlice, { filtersActions } from "../../features/canvas-elements/filtersSlice";
import { AppDispatch } from "../../Redux/store";
import { color } from "../../typings/typings";



export const uploadImageToCanvas = (
  imagesArray: FileList | null,
  dispatch: AppDispatch
) => {
  const image = new Image()
  if (imagesArray === null) return console.log('the images array is null')
  let selected = imagesArray[0];
  image.src = URL.createObjectURL(selected);
  image.onload = () => {
    const { ADD_IMAGE } = canvasElemSlice.actions
    dispatch(ADD_IMAGE({
      imageSRC: image.src,
      width: image.width,
      height: image.height,
      scaleX: 1,
      scaleY: 1,
      borderWidth: 0,
      borderColor: '',
      x: 0,
      y: 0,
      rotate: 0,
      crop: false,
      cropRectangle: {
        x :undefined,
        y: undefined,
        width: undefined,
        height: undefined,
      }
    }))
    const { ADD_IMAGE_FILTER } = filtersActions

    dispatch(ADD_IMAGE_FILTER({ type: 'image', filter: DEFAULT_OPTIONS }))
  }
}

export const uploadTextToCanvas = (
  dispatch: AppDispatch,
  textData: Partial<textData>,
) => {
  const { ADD_TEXT } = canvasElemSlice.actions
  const { ADD_TEXT_FILTER } = filtersActions

  dispatch(ADD_TEXT({
    text: textData.text || "Your desired text",
    x: textData.x || 20,
    y: textData.y || 20,
    fontSize: textData.fontSize || 12,
    fontFamily: textData.fontFamily || 'Arial',
    fontVariant: textData.fontVariant || 'normal',
    align: textData.align || 'center',
    verticalAlign: textData.verticalAlign || 'middle',
    strokeWidth: textData.strokeWidth || 0,
    rotation: textData.rotation || 0
  }))
  dispatch(ADD_TEXT_FILTER({
    type: 'text',
    filter: {
      fill: `#000000`,
      stroke: `#000000`,
    }
  }))
}


export const uploadShapeToCanvas = (
  dispatch: AppDispatch,
  shapeData: Partial<shapeData>
) => {
  const { ADD_SHAPE } = canvasElemSlice.actions
  const { ADD_SHAPE_FILTER } = filtersActions
  dispatch(ADD_SHAPE({
    shape: shapeData.shape || 'Circle',
    width: shapeData.width || 100,
    height: shapeData.height || 100,
    x: shapeData.x || 50,
    y: shapeData.y || 50,
    fillPatternImageSRC: shapeData.fillPatternImageSRC || '',
    fillGradientDirection: shapeData.fillGradientDirection || null,
    fillLinearGradientColorStops: shapeData.fillLinearGradientColorStops || null,
    strokeWidth: shapeData.strokeWidth || 0
  }))
  dispatch(ADD_SHAPE_FILTER({
    type: 'shape',
    filter: {
      fill: `#000000`,
      stroke: `#000000`,
    }
  }))
}
