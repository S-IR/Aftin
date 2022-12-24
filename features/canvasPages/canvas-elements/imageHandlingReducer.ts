import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { canvasState } from "./canvasPageSlice"

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

interface addImage{
  pageId: number  
  data: imageData
}
interface setCrop{
  pageId: number  
  elementId: number
}
interface setCropRectangleArea { 
  pageId: number
  elementId: number
  x?: number
  y?: number
  width?: number
  height?: number
}


export const ADD_IMAGE: CaseReducer<WritableDraft<canvasState>, PayloadAction<addImage>> = (state, action) => {
  const {pageId, data} = action.payload

  state.pages[pageId].push({ elementType: 'image', data: data })
  
  state.selected = {page: pageId, element: state.pages[pageId].length - 1}
}

export const SET_CROP: CaseReducer<WritableDraft<canvasState>, PayloadAction<setCrop>> = (state, action) => {
  const {pageId, elementId } = action.payload
  const selectedImage: imageData = state.pages[pageId][elementId].data
  selectedImage.crop = !selectedImage.crop
} 

export const SET_CROP_RECTANGLE_DATA: CaseReducer<WritableDraft<canvasState>, PayloadAction<setCropRectangleArea>> = (state, action) => {
  const {pageId, elementId, x, y, width, height} = action.payload
  const selectedImage: imageData = state.pages[pageId][elementId].data
  if(x) selectedImage.cropRectangle.x = x
  if(y)selectedImage.cropRectangle.y = y
  if(width) selectedImage.cropRectangle.width = width
  if(height) selectedImage.cropRectangle.height = height
} 
