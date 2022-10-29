import { CircleConfig } from 'konva/lib/shapes/Circle'
import { RectConfig } from 'konva/lib/shapes/Rect'
import React, { LegacyRef, useEffect, useRef } from 'react'
import { Circle, KonvaNodeComponent, Rect } from 'react-konva'
import { shapeFilter } from '../../../features/canvas-elements/filtersSlice'
import { shapeData } from '../../../features/canvas-elements/shapeHandlingReducer'
import { handleMovePosition, handleScaling, handleSelect } from '../../../model/image-editor/CanvasElements'
import { useAppDispatch } from '../../../Redux/hooks'
import TransformerComp from './TransformerComp'

interface props {
  data: shapeData
  id: number
  selectedElement: number | null
  shapeFilter: shapeFilter
}
const CanvasShape = ({ data, id, selectedElement, shapeFilter }: props) => {
  const dispatch = useAppDispatch()
  const shapeRef = useRef<LegacyRef<KonvaNodeComponent<CircleConfig, RectConfig>>>(null)
  const isSelected = selectedElement === id
  const fillPatternImage = new Image()
  if (data.fillGradientDirection) {
    const grandientDirrectionArray = data.fillGradientDirection.split('-')
    const gradientStart = grandientDirrectionArray[0]
    const gradientEnd = grandientDirrectionArray[1]

  }
  console.log(fillPatternImage.src);



  useEffect(() => {
    if (fillPatternImage && shapeRef.current) {
      fillPatternImage.src = data.fillPatternImageSRC
      console.log(fillPatternImage.src.length !==0 );

      shapeRef.current.cache();
    }
  }, [fillPatternImage])

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
            fill={fillPatternImage.src?  `` :  undefined}
            fillPatternImage={fillPatternImage}
            stroke={shapeFilter.filter.stroke}
            strokeWidth={data.strokeWidth}
            draggable
            onDragEnd={(e) => handleMovePosition(e, id, dispatch)}
          />
          {isSelected &&
            <TransformerComp
              isSelected={isSelected}
              elementRef={shapeRef} />}
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
            fill={fillPatternImage.src.length !== 0? undefined : shapeFilter.filter.fill}
            fillPatternImage={fillPatternImage}
            stroke={shapeFilter.filter.stroke}
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