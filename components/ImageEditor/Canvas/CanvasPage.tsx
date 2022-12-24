import React, { useEffect, useRef, useState } from 'react'
import CanvasImage from './CanvasImage'
import CanvasShape from './CanvasShape'
import CanvasText from './CanvasText'
import { Stage as KonvaStage, Layer, Image as KonvaImage, KonvaNodeComponent, StageProps, Rect } from 'react-konva'
import { Stage } from 'konva/lib/Stage'
import { filtersCount, imageFilter, shapeFilter, textFilter } from '../../../features/canvasPages/canvas-elements/filtersSlice'
import { canvasElement, canvasPagesCount, canvasSelected } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { RectConfig } from 'konva/lib/shapes/Rect'
import { handleSelectPage } from '../../../model/image-editor/Canvas'

interface props {
  width: number
  height: number
  elements: canvasElement[]
  selected: canvasSelected
  // if the element that is selected is on this page, the selectedElement value will be a number, else it will just be null
  pageId: number
  setStageRefs: React.Dispatch<React.SetStateAction<React.RefObject<KonvaNodeComponent<Stage, StageProps>>[]>>
}

const CanvasPage = ({ width, height, elements, selected, pageId, setStageRefs }: props) => {

  const filters = useAppSelector(filtersCount)

  const canvasBGRef = useRef<null | KonvaNodeComponent<Rect, RectConfig>>(null)
  const canvasContainer = useRef<null | HTMLDivElement>(null)
  const isPageSelected = selected?.page === pageId



  const stageRef = useRef<KonvaNodeComponent<Stage, StageProps>>(null)
  useEffect(() => {
    if(!stageRef || stageRef.current === null) return
    // ts is weird, the guard clause from above will block the stage from being null
    setStageRefs(stageRefs=> [...stageRefs, stageRef])
  }, [stageRef])


  return (
    <div className=' h-full flex flex-col   m-5 ' ref={canvasContainer}   >
      <h3 className='mx-auto text-8xl my-2 font-serif'>{`Page ${pageId + 1}`}</h3>
      <KonvaStage
        width={width}
        height={height}
        ref={stageRef}
        willReadFrequently={true}
        className={`border-8 border-gray-500 rounded-2xl ${isPageSelected ? `border-red-500` : `border-gray-500 z-10 `} `}

      >
        <Layer
        >
          <Rect
            ref={canvasBGRef}
            width={width}
            height={height}
            x={0}
            y={0}
            fill={`white`}
          />

          {elements.map((element, elementId) => {
            switch (element.elementType) {
              case 'image':
                return <CanvasImage
                  data={element.data} key={elementId}
                  pageId={pageId}
                  elementId={elementId}
                  selected={selected}
                  imageFilter={filters[pageId][elementId] as imageFilter}
                />
              case 'text':
                return <CanvasText data={element.data} key={elementId}
                  pageId={pageId}
                  elementId={elementId}
                  selected={selected}
                  textFilter={filters[pageId][elementId] as textFilter}

                />
              case 'shape':
                return <CanvasShape
                  data={element.data} key={elementId}
                  pageId={pageId}
                  elementId={elementId}
                  selected={selected}
                  shapeFilter={filters[pageId][elementId] as shapeFilter}

                />
              default:
                break
            }
          }
          )}
        </Layer>
      </KonvaStage>
    </div>

  )
}

export default CanvasPage