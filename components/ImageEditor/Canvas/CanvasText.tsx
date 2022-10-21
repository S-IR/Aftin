import React from 'react'
import { Text as KonvaText } from 'react-konva'
import { textData } from '../../../features/canvas-elements/canvasElemSlice'

interface props {
  data: textData
}

const CanvasText = ({ data }: props) => {
  return (
    <KonvaText
      x={data.x}
      y={data.y}
      text={data.text}
      fontSize={data.fontSize}
      fontFamily={data.fontFamily}
      fontVariant={data.fontVariant}
      align={data.align}
      verticalAlign={data.verticalAlign}
      stroke={data.stroke}
      strokeWidth={data.strokeWidth}
      fillPatternImage={data.fillPatternImage} //stupid TS not seeing that NULL IS UNDEFINED
      rotation={data.rotation}
      
      draggable
      onDragEnd={(e) => handleDragEnd(e)}
    />
  )
}

export default CanvasText