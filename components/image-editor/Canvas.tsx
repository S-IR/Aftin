import { Stage } from 'konva/lib/Stage'
import React, { useEffect, useRef, useState } from 'react'
import { Stage as KonvaStage, Layer, Image as KonvaImage, KonvaNodeComponent, StageProps, Rect } from 'react-konva'

import { canvasPagesCount } from '../../features/canvasPages/canvas-elements/canvasPageSlice'
import { filtersCount } from '../../features/canvasPages/canvas-elements/filtersSlice'
import { imageData } from '../../features/canvasPages/canvas-elements/imageHandlingReducer'
import { useAppSelector } from '../../Redux/hooks'
import CanvasPage from './Canvas/CanvasPage'
import CanvasShape from './Canvas/CanvasShape'
import { CanvasImage, CanvasText, CanvasEditButtons } from './Canvas/index'



interface props {
  showSidebar: boolean
}

const Canvas = ({ showSidebar}: props) => {



  const { pages, selected, w, h } = useAppSelector(canvasPagesCount).present

  const downloadRef = useRef<HTMLButtonElement | null>(null)
  const [stageRefs, setStageRefs] = useState<React.RefObject<KonvaNodeComponent<Stage, StageProps>>[]>([])


  const firstImageData = pages[0].find((element) => element.elementType === 'image')?.data as imageData

  const width = w === null? firstImageData.width : w
  const height = h === null? firstImageData.height : h



  //bottom buttons functionalities

  return (
    <section className={`${showSidebar? `ml-[35vw]` : 'ml-[5vh]'} w-auto h-auto flex flex-col   transition-all duration-300`}>
      <CanvasEditButtons stageRefs={stageRefs} downloadRef={downloadRef} />

      <div id='canvasContainer' className=' flex flex-col mt-10 '>
        {pages.map((page, i) => {

          return (
            <CanvasPage key={i} elements={page} height={height} width={width} selected={selected} pageId={i} setStageRefs={setStageRefs} />
          )
        })}
      </div>
    </section>
  )
}

export default Canvas