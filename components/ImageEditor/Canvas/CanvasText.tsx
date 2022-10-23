import React, { useRef } from 'react'
import { Text as KonvaText, Transformer } from 'react-konva'
import { textData } from '../../../features/canvas-elements/textHandlingReducer'
import { handleMovePosition, handleSelect } from '../../../model/image-editor/CanvasElements'
import { useAppDispatch } from '../../../Redux/hooks'

interface props {
  data: textData
  id: number
  isSelected: boolean
}

const CanvasText = ({ data, id, isSelected }: props) => {
  // properties related to the HTML element
  const textRef = useRef<React.LegacyRef<Text> | undefined>()

  const dispatch = useAppDispatch()

  return (
    <>
      <KonvaText
        onClick={() => handleSelect(id, dispatch)}
        onTap={() => handleSelect(id, dispatch)}
        ref={textRef}
        x={data.x}
        y={data.y}
        text={data.text}
        fontSize={data.fontSize}
        fontFamily={data.fontFamily}
        fontVariant={data.fontVariant}
        align={data.align}
        verticalAlign={data.verticalAlign}
        stroke={data.stroke}
        textDecoration={isSelected? 'underline' : ''}
        strokeWidth={data.strokeWidth}
        fillPatternImage={data.fillPatternImage} //stupid TS not seeing that NULL IS UNDEFINED
        rotation={data.rotation}

        draggable
        onDragEnd={(e) => handleMovePosition(e, id, dispatch)}
      />
    </>

  )
}

export default CanvasText