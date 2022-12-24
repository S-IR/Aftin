import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Rect } from 'konva/lib/shapes/Rect'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { KonvaNodeComponent, Rect as KonvaRect, Transformer } from 'react-konva'
import { canvasPagesActions, canvasPagesCount } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'
import { imageData } from '../../../features/canvasPages/canvas-elements/imageHandlingReducer'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'

interface props {
  data: imageData
  elementRef: LegacyRef<KonvaNodeComponent<Image, ImageConfig, Circle, CircleConfig, Rect, RectConfig>>
}

const CropComponent = ({ data, elementRef }: props) => {

  const {page: pageId, element: elementId} = useAppSelector(canvasPagesCount).present.selected


  const dispatch = useAppDispatch()
  const { SET_CROP_RECTANGLE_DATA } = canvasPagesActions //CANVASELEMENTACTIONS



  const trRef = useRef<KonvaNodeComponent<Rect>>(null)
  const CropRect = useRef<KonvaNodeComponent<Rect>>(null)


  useEffect(() => {
    if (!trRef.current) return
    trRef.current.nodes([CropRect.current]);
    trRef.current.getLayer().batchDraw();

  }, [])



  let posStart: { x: any; y: any; } | string = ""
  let posNow: { x: any; y: any; } | string = ""
  let mode: string = ""

  if(pageId === null || elementId === null) {
    console.log('there is no selected image or page for the filter component');
    return<></>
    
  }
  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    // const target = e.target
    // const targetRect = e.target.getClientRect()
    // if( haveIntersection(targetRect, r1) {

  }
  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    dispatch(SET_CROP_RECTANGLE_DATA({
      pageId,
      elementId,
      x: e.target.x(),
      y: e.target.y(),
    }))

  }

  return (
    <>
      <KonvaRect
        x={100}
        y={100}
        width={100}
        height={100}
        stroke={'red'}
        filters={[Konva.Filters.Brighten]}
        brightness={20}
        strokeWidth={4}
        rotation={0}
        dash={[2, 2]}
        ref={CropRect}
        draggable
        onDragMove={(e) => { handleDragMove(e) }}
        onDragEnd={(e) => { handleDragEnd(e) }}
      />
      <Transformer
        rotateEnabled={false}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          dispatch(SET_CROP_RECTANGLE_DATA({
            pageId,
            elementId,
            x: newBox.x,
            y: newBox.y,
            width: newBox.width,
            height: newBox.height,
          }))
          return newBox;
        }}

        ref={trRef}
      />

    </>
  )
}

export default CropComponent