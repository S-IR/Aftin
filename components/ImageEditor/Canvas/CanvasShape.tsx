import { CircleConfig } from 'konva/lib/shapes/Circle'
import { RectConfig } from 'konva/lib/shapes/Rect'
import React, { LegacyRef, useEffect, useRef } from 'react'
import { Circle, KonvaNodeComponent, Rect, Ring } from 'react-konva'
import { canvasSelected } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'
import { shapeFilter } from '../../../features/canvasPages/canvas-elements/filtersSlice'
import { shapeData } from '../../../features/canvasPages/canvas-elements/shapeHandlingReducer'
import { handleMovePosition, handleScaling, handleSelect } from '../../../model/image-editor/CanvasElements'
import { useAppDispatch } from '../../../Redux/hooks'
import TransformerComp from './TransformerComp'

interface props {
  data: shapeData
  pageId: number,
  elementId: number
  selected: canvasSelected
  shapeFilter: shapeFilter
}
const CanvasShape = ({ data, pageId, elementId, selected, shapeFilter }: props) => {
  const dispatch = useAppDispatch()
  const shapeRef = useRef<LegacyRef<KonvaNodeComponent<CircleConfig, RectConfig>>>(null)
  const isSelected = selected?.page === pageId && selected.element === elementId
  const fillPatternImage = new Image()
  if (data.fillGradientDirection) {
    const grandientDirrectionArray = data.fillGradientDirection.split('-')
    const gradientStart = grandientDirrectionArray[0]
    const gradientEnd = grandientDirrectionArray[1]

  }


  

  useEffect(() => {
    if (fillPatternImage && shapeRef.current) {
      fillPatternImage.src = data.fillPatternImageSRC
      console.log(fillPatternImage.src.length !==0 );

      shapeRef.current.cache();
    }
  }, [fillPatternImage])

  switch (data.shape) {
    case 'Ring':      
      return(
        <>
          <Ring
            ref={shapeRef}
            onClick={() => handleSelect(pageId, elementId, dispatch)}
            onTap={() => handleSelect(pageId, elementId, dispatch)}
            width={data.width}
            height={data.height}
            x={data.x}
            y={data.y}
            fill={fillPatternImage.src.length !== 0? undefined : shapeFilter.filter.fill}
            fillPatternImage={fillPatternImage}
            stroke={shapeFilter.filter.stroke}
            strokeWidth={data.strokeWidth }
            draggable
            onDragEnd={(e) => handleMovePosition(e, pageId, elementId, dispatch)}
            innerRadius={data.innerRadius as number}
            outerRadius={data.outerRadius as number}
            
          />
          {isSelected && <TransformerComp isSelected={isSelected} elementRef={shapeRef} />}

        </>
      )
    case 'Circle':
      return (
        <>
          <Circle
            ref={shapeRef}
            onClick={() => handleSelect(pageId, elementId, dispatch)}
            onTap={() => handleSelect(pageId, elementId, dispatch)}
            width={data.width}
            height={data.height}
            x={data.x}
            y={data.y}
            fill={fillPatternImage.src.length !== 0? undefined : shapeFilter.filter.fill}
            fillPatternImage={fillPatternImage}
            stroke={shapeFilter.filter.stroke}
            strokeWidth={data.strokeWidth}
            draggable
            onDragEnd={(e) => handleMovePosition(e, pageId, elementId, dispatch)}
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
            onClick={() => handleSelect(pageId, elementId, dispatch)}
            onTap={() => handleSelect(pageId, elementId, dispatch)}
            width={data.width}
            height={data.height}
            x={data.x}
            y={data.y}
            fill={fillPatternImage.src.length !== 0? undefined : shapeFilter.filter.fill}
            fillPatternImage={fillPatternImage}
            stroke={shapeFilter.filter.stroke}
            strokeWidth={data.strokeWidth}
            draggable
            onDragEnd={(e) => { handleMovePosition(e, pageId, elementId, dispatch) }}
            onTransformEnd={() => { handleScaling(shapeRef, pageId, elementId, dispatch) }}
          />
          {isSelected && <TransformerComp isSelected={isSelected} elementRef={shapeRef} />}
        </>

      )
  }
}

export default CanvasShape