import { KonvaEventObject } from "konva/lib/Node"
import { Image, ImageConfig } from "konva/lib/shapes/Image"
import React, { LegacyRef } from "react"
import { KonvaNodeComponent } from "react-konva"
import { canvasElemSlice } from "../../features/canvas-elements/canvasElemSlice"
import { AppDispatch } from "../../Redux/store"


const { CHANGE_ELEMENT_POSITION, CHANGE_ELEMENT_SCALE, SELECT_ELEMENT } = canvasElemSlice.actions

export const handleMovePosition = (
  e: KonvaEventObject<DragEvent>, 
  id: number,  
  dispatch: AppDispatch) => {
  dispatch(CHANGE_ELEMENT_POSITION({
    id: id,
    pageX: e.target.x(),
    pageY: e.target.y()
  }))
}
export const handleScaling = (
  elementRef: LegacyRef<KonvaNodeComponent<Image, ImageConfig>>,
  id: number, 
  dispatch: AppDispatch) => { //konva has typescript broken 
  if (!elementRef) return
  const node = elementRef.current;
  if (!node) return
  dispatch(CHANGE_ELEMENT_SCALE({
    id: id,
    scaleX: node.scaleX(),
    scaleY: node.scaleY()
  }))
}

export const handleSelect = (id: number, dispatch: AppDispatch) =>{
  dispatch(SELECT_ELEMENT({
    id: id
  }))
}