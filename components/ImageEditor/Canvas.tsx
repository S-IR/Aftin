import React, { LegacyRef, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import { canvasElemsCount } from '../../features/canvas-elements/canvasElemSlice'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { CanvasImage, CanvasText } from './Canvas/index'


interface props {
  images: Array<HTMLImageElement>
}

const Canvas = ({ images }: props) => {
  const canvasElems = useAppSelector(canvasElemsCount)
  let downloadRef = useRef<LegacyRef<HTMLAnchorElement> | null>(null)

  const firstImage = canvasElems.present.find((element) => element.elementType === 'image')
  const width = firstImage.data.width
  const height = firstImage.data.height

  const elements = canvasElems.present
  const [selectedId, selectShape] = React.useState<null | number>(null);
  const onSelect = () => {
    selectShape(rect.id)
  }

  return (
    <section className=''>
      <Stage
        width={width}
        height={height}
      >
        <Layer>
          {elements.map((element, index) => {
            switch (element.elementType) {
              case 'image':
                return <CanvasImage 
                data={element.data} key={index} 
                id={index}
                selectedId={selectedId} 
                selectShape={selectShape} />
              case 'text':
                return <CanvasText data={element.data} key={index} />
              default:
                break
            }
          }
          )}

        </Layer>

      </Stage>
      <div className='w-full h-[70px] bg-gradient-to-br from-blue-800 via-fuchsia-800 to-blue-800'>
        <a className='general-buttons'
          ref={downloadRef}
          // onClick={() => handleDownload(filters, canvasRef.current, downloadRef.current)}
          href={''}
          download=""
        >Download
        </a>
      </div>
    </section>
  )
}

export default Canvas