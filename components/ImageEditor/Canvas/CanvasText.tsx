import { RGB } from 'konva/lib/filters/RGB'
import React, { useRef } from 'react'
import { Text as KonvaText, Transformer } from 'react-konva'
import { canvasSelected } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'
import { textFilter } from '../../../features/canvasPages/canvas-elements/filtersSlice'
import { textData } from '../../../features/canvasPages/canvas-elements/textHandlingReducer'
import { handleMovePosition, handleSelect } from '../../../model/image-editor/CanvasElements'
import { useAppDispatch } from '../../../Redux/hooks'
import TransformerComp from './TransformerComp'

interface props {
  data: textData
  pageId: number,
  elementId: number
  selected: canvasSelected
  textFilter : textFilter
}

const CanvasText = ({ data, pageId, elementId, selected, textFilter }: props) => {
  // properties related to the HTML element

  const textRef = useRef<React.LegacyRef<Text> | undefined>()
  
  const isSelected = selected?.page === pageId && selected.element === elementId
  const dispatch = useAppDispatch()

  return (
    <>
      <KonvaText
        onClick={() => handleSelect(pageId, elementId,dispatch)}
        onTap={() => handleSelect(pageId, elementId,dispatch)}
        fill={textFilter.filter.fill}
        ref={textRef}
        x={data.x}
        y={data.y}
        text={data.text}
        fontSize={data.fontSize}
        fontFamily={data.fontFamily}
        fontVariant={data.fontVariant}
        align={data.align}
        verticalAlign={data.verticalAlign}
        stroke={textFilter.filter.stroke}
        textDecoration={isSelected ? 'underline' : ''}
        strokeWidth={Number(data.strokeWidth)}
        rotation={data.rotation}
        draggable
        onDragEnd={(e) => handleMovePosition(e, pageId, elementId, dispatch)}
      />
      {isSelected && (
        <TransformerComp isSelected={isSelected} elementRef={textRef}
        />
      )}
    </>

  )
}

export default CanvasText