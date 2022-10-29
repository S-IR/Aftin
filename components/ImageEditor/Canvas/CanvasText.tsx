import { RGB } from 'konva/lib/filters/RGB'
import React, { useRef } from 'react'
import { Text as KonvaText, Transformer } from 'react-konva'
import { textFilter } from '../../../features/canvas-elements/filtersSlice'
import { textData } from '../../../features/canvas-elements/textHandlingReducer'
import { handleMovePosition, handleSelect } from '../../../model/image-editor/CanvasElements'
import { useAppDispatch } from '../../../Redux/hooks'
import TransformerComp from './TransformerComp'

interface props {
  data: textData
  id: number
  selectedElement: number | null
  textFilter : textFilter
}

const CanvasText = ({ data, id, selectedElement, textFilter }: props) => {
  // properties related to the HTML element

  const textRef = useRef<React.LegacyRef<Text> | undefined>()
  
  const isSelected = selectedElement === id
  const dispatch = useAppDispatch()

  return (
    <>
      <KonvaText
        onClick={() => handleSelect(id, dispatch)}
        onTap={() => handleSelect(id, dispatch)}
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
        onDragEnd={(e) => handleMovePosition(e, id, dispatch)}
      />
      {isSelected && (
        <TransformerComp isSelected={isSelected} elementRef={textRef}
        />
      )}
    </>

  )
}

export default CanvasText