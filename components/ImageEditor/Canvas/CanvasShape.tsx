import { CircleConfig } from 'konva/lib/shapes/Circle'
import { RectConfig } from 'konva/lib/shapes/Rect'
import React, { LegacyRef, useEffect, useRef } from 'react'
import { Circle, KonvaNodeComponent, Rect } from 'react-konva'
import { shapeData } from '../../../features/canvas-elements/shapeHandlingReducer'
import { handleMovePosition, handleScaling, handleSelect } from '../../../model/image-editor/CanvasElements'
import { useAppDispatch } from '../../../Redux/hooks'
import TransformerComp from './TransformerComp'

interface props {
  data: shapeData
  id: number
  isSelected: boolean
}
const CanvasShape = ({ data, id, isSelected }: props) => {
  const dispatch = useAppDispatch()
  const shapeRef = useRef<LegacyRef<KonvaNodeComponent<CircleConfig, RectConfig>>>(null)
  const trRef = useRef<LegacyRef<KonvaNodeComponent<Transformer, TransformerConfig>>>()

  const fillPatternImage = new Image()
  fillPatternImage.src = data.fillPatternImageSRC
  if (data.fillGradientDirection) {
    const grandientDirrectionArray = data.fillGradientDirection.split('-')
    const gradientStart = grandientDirrectionArray[0]
    const gradientEnd = grandientDirrectionArray[1]

    console.log(gradientStart, gradientEnd)

  }
  useEffect(() => {
    console.log(isSelected);
    

  }, [isSelected])
  


  switch (data.shape) {
    case 'Circle':
      return (
        <>
          <Circle
            ref={shapeRef}
            onClick={() => handleSelect(id, dispatch)}
            onTap={() => handleSelect(id, dispatch)}
            width={data.width}
            height={data.height}
            x={data.x}
            y={data.y}
            fill={data.fill}
            fillPatternImage={fillPatternImage}
            stroke={data.stroke}
            strokeWidth={data.strokeWidth}
            draggable
            onDragEnd={(e) => { handleMovePosition(e, id, dispatch ) }}
            onTransformEnd={() => {handleScaling(shapeRef, id, dispatch)}}
          />
          {isSelected && <TransformerComp isSelected={isSelected} elementRef={shapeRef} />}
        </>
      )
    default:
      return (
        <>
          <Rect
            ref={shapeRef}
            onClick={() => handleSelect(id, dispatch)}
            onTap={() => handleSelect(id, dispatch)}
            width={data.width}
            height={data.height}
            x={data.x}
            y={data.y}
            fill={data.fill}
            fillPatternImage={fillPatternImage}
            stroke={data.stroke}
            strokeWidth={data.strokeWidth}
            draggable
            onDragEnd={(e) => { handleMovePosition(e, id, dispatch) }}
            onTransformEnd={() => { handleScaling(shapeRef, id, dispatch) }}
          />
          {isSelected && <TransformerComp isSelected={isSelected} elementRef={shapeRef} />}
        </>

      )
  }
}

export default CanvasShape