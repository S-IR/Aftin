import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { canvasElement, canvasState } from "./canvasElemSlice"

export interface imageData {
  imageSRC: string,
  width: number
  height: number
  scaleX: number
  scaleY: number
  borderWidth: number
  borderColor: string
  x: number
  y: number
  rotate: number,
  crop: boolean
  cropRectangle : {
    x: number | undefined
    y: number | undefined
    width: number | undefined
    height: number | undefined
  }

}

export const addImage: CaseReducer<WritableDraft<canvasState>, PayloadAction<imageData>> = (state, action) => {
  const data: imageData = action.payload
  state.elements.push({ elementType: 'image', data: data })
  state.selected = state.elements.length - 1
}

export const SET_CROP: CaseReducer<WritableDraft<canvasState>, PayloadAction<{id: number}>> = (state, action) => {
  const {id } = action.payload
  const selectedImage: imageData = state.elements[id].data
  selectedImage.crop = !selectedImage.crop
} 

export const SET_CROP_RECTANGLE_DATA: CaseReducer<WritableDraft<canvasState>, PayloadAction<{id: number, x?: number, y?:number, width?: number, height?: number}>> = (state, action) => {
  const {id, x, y, width, height} = action.payload
  const selectedImage: imageData = state.elements[id].data
  if(x) selectedImage.cropRectangle.x = x
  if(y)selectedImage.cropRectangle.y = y
  if(width) selectedImage.cropRectangle.width = width
  if(height) selectedImage.cropRectangle.height = height
} 
