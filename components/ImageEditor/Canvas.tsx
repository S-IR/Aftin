import { Stage } from 'konva/lib/Stage'
import React, {  useRef  } from 'react'
import { Stage as KonvaStage, Layer, Image as KonvaImage, KonvaNodeComponent, StageProps, Rect } from 'react-konva'
import { canvasElemsCount } from '../../features/canvas-elements/canvasElemSlice'
import { filterElement, filtersCount, imageFilter } from '../../features/canvas-elements/filtersSlice'
import { useAppSelector } from '../../Redux/hooks'
import CanvasShape from './Canvas/CanvasShape'
import { CanvasImage, CanvasText, CanvasEditButtons } from './Canvas/index'



interface props {

}

const Canvas = ({ }: props) => {


  const filters = useAppSelector(filtersCount)

  const elements = useAppSelector(canvasElemsCount).present.elements
  const selectedElement = useAppSelector(canvasElemsCount).present.selected
  const downloadRef = useRef<HTMLButtonElement>(null)
  const stageRef = useRef<KonvaNodeComponent<Stage, StageProps>>(null)

  const firstImage = elements.find((element) => element.elementType === 'image')
  const width = firstImage.data.width
  const height = firstImage.data.height

  
  
  
  //bottom buttons functionalities

  return (
    <section className='relative w-full h-[100vh] flex flex-col items-center'>
      <div id='canvasContainer' className=' flex items-center justify-center align-middle mt-10 border-8 border-gray-600 rounded-lg border-opacity-60'>
        <KonvaStage
          width={width}
          height={height}
          ref={stageRef}
          willReadFrequently={true}
          container={'canvasContainer'}
        >
          <Layer>
            {elements.map((element, index) => {
              switch (element.elementType) {
                case 'image':
                  return <CanvasImage
                    data={element.data} key={index}
                    id={index}
                    selectedElement={selectedElement}
                    imageFilter={filters[index]}
                  />
                case 'text':
                  return <CanvasText data={element.data} key={index}
                    id={index}
                    selectedElement={selectedElement}
                    textFilter={filters[index]}

                  />
                case 'shape':
                  return <CanvasShape
                  data={element.data} key={index}
                  id={index}
                  selectedElement={selectedElement}
                  shapeFilter={filters[index]}

                  />
                default:
                  break
              }
            }
            )}
            {/* <Rect 
            x={0}
            y={0}
            width={100}
            height={100}
            fillLinearGradientStartPoint={{x: 0, y:0}}
            fillLinearGradientEndPoint={{x: 100, y:100}}
            fillLinearGradientColorStops={[0,'red', 0.5, 'green', 1,'blue']}

            /> */}
          </Layer>
        </KonvaStage>
      </div>
      <CanvasEditButtons stageRef={stageRef} downloadRef={downloadRef} />
    </section>
  )
}

export default Canvas