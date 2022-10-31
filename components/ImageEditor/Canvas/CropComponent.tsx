import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Rect } from 'konva/lib/shapes/Rect'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { KonvaNodeComponent, Rect as KonvaRect, Transformer } from 'react-konva'
import { canvasElemsActions, canvasElemsCount } from '../../../features/canvas-elements/canvasElemSlice'
import { imageData } from '../../../features/canvas-elements/imageHandlingReducer'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'

interface props {
  data: imageData
  elementRef: LegacyRef<KonvaNodeComponent<Image, ImageConfig, Circle, CircleConfig, Rect, RectConfig>>
}

const CropComponent = ({ data, elementRef }: props) => {

  const id = useAppSelector(canvasElemsCount).present.selected


  const dispatch = useAppDispatch()
  const { SET_CROP_RECTANGLE_DATA } = canvasElemsActions



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


  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    // const target = e.target
    // const targetRect = e.target.getClientRect()
    // if( haveIntersection(targetRect, r1) {

  }
  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    dispatch(SET_CROP_RECTANGLE_DATA({
      id,
      x: e.target.x(),
      y: e.target.y(),
    }))

  }
  if (id === null) return <></>;
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
            id,
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