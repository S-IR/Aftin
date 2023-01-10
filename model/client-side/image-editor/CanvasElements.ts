import { KonvaEventObject } from "konva/lib/Node"
import { Image, ImageConfig } from "konva/lib/shapes/Image"
import React, { LegacyRef } from "react"
import { KonvaNodeComponent } from "react-konva"
import { canvasPagesActions } from "../../../features/canvasPages/canvas-elements/canvasPageSlice"
import { AppDispatch } from "../../../Redux/store"



const { CHANGE_ELEMENT_POSITION, CHANGE_ELEMENT_SCALE, SELECT_ELEMENT } = canvasPagesActions

export const handleMovePosition = (
  e: KonvaEventObject<DragEvent>,
  pageId: number,
  elementId: number,
  dispatch: AppDispatch) => {
  dispatch(CHANGE_ELEMENT_POSITION({
    pageId,
    elementId,
    pageX: e.target.x(),
    pageY: e.target.y()
  }))
}
export const handleScaling = (
  elementRef: LegacyRef<KonvaNodeComponent<Image, ImageConfig>>,
  pageId: number,
  elementId: number,
  dispatch: AppDispatch) => { //konva has typescript broken 
  if (!elementRef) return
  const node = elementRef.current;
  if (!node) return
  dispatch(CHANGE_ELEMENT_SCALE({
    pageId,
    elementId,
    scaleX: node.scaleX(),
    scaleY: node.scaleY()
  }))
}

export const handleSelect = (
  pageId: number,
  elementId: number,
  dispatch: AppDispatch) => {
  dispatch(SELECT_ELEMENT({
    pageId ,
    elementId,
  }))
}