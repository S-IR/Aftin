import React from "react";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import undoableCanvasElemSlice, { canvasElemSlice } from "../../features/canvas-elements/canvasElemSlice";
import { AppDispatch } from "../../Redux/store";



export const uploadImage = (
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
    const {addImage} = canvasElemSlice.actions
    dispatch(addImage({
      image: image,
      width: image.width,
      height: image.height,
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

export const uploadCanvasText = (
  dispatch: AppDispatch,
  text: string = "Your desired text",
  x: number = 0,
  y: number = 0,
  fontSize: number = 12,
  fontFamily: string = 'Arial',
  fontVariant: 'normal' | 'italic' | 'bold' = 'normal',
  align: 'left' | 'center' | 'right' = 'center',
  verticalAlign: 'top'| 'middle' | 'bottom' = 'middle',
  stroke: string ='black',
  strokeWidth: number = 0,
  fillPatternImage: null | HTMLImageElement = null,
  rotation: number = 0,
) => {
  const {addText} = canvasElemSlice.actions
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