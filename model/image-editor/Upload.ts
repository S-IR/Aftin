import React from "react";
import { canvasElemSlice } from "../../features/canvas-elements/canvasElemSlice";
import { AppDispatch } from "../../Redux/store";
import { color } from "../../typings";



export const uploadImageToCanvas = (
  imagesArray: FileList | null,
  firstImage: boolean,
  setFirstImage: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch
) => {
  const image = new Image()
  if (imagesArray === null) return console.log('the images array is null')
  let selected = imagesArray[0];
  image.src = URL.createObjectURL(selected);
  image.onload = () => {
    if (!firstImage) setFirstImage(true)
    const { addImage } = canvasElemSlice.actions
    dispatch(addImage({
      imageSRC: image.src,
      width: image.width,
      height: image.height,
      scaleX: 1,
      scaleY: 1,
      filters: {
        brightness: 0,
        contrast: 0,
        blur: 0,
        borderWidth: 0,
        borderColor: '',
      },
      x: 0,
      y: 0,
      rotate: 0,
    }))
  }
  return firstImage
}

export const uploadTextToCanvas = (
  dispatch: AppDispatch,
  text: string = "Your desired text",
  x: number = 20,
  y: number = 20,
  fontSize: number = 12,
  fontFamily: string = 'Arial',
  fontVariant: 'normal' | 'italic' | 'bold' = 'normal',
  align: 'left' | 'center' | 'right' = 'center',
  verticalAlign: 'top' | 'middle' | 'bottom' = 'middle',
  stroke: string = 'black',
  strokeWidth: number = 0,
  fillPatternImage: null | HTMLImageElement = null,
  rotation: number = 0,
) => {
  const { addText } = canvasElemSlice.actions
  dispatch(addText({
    text,
    x,
    y,
    fontSize,
    fontFamily,
    fontVariant,
    align,
    verticalAlign,
    stroke,
    strokeWidth,
    fillPatternImage,
    rotation
  }))
}

export const uploadShapeToCanvas = (
  dispatch: AppDispatch,
  shape: string,
  width: number = 100,
  height: number = 100,
  x: number = 50,
  y: number = 50,
  fill: string = 'black',
  fillPatternImageSRC: string = '',
  fillGradientDirection: null | 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top' = null,
  fillLinearGradientColorStops: null| Array<number | color> = null ,
  stroke: string = '',
  strokeWidth: number = 0
) => {
  const { addShape } = canvasElemSlice.actions
  dispatch(addShape({
    shape,
    width,
    height,
    x,
    y,
    fill,
    fillPatternImageSRC,
    fillGradientDirection,
    fillLinearGradientColorStops,
    stroke,
    strokeWidth
  }))
}
