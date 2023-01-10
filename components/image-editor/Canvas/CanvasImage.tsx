import Konva from 'konva'
import { ImageConfig } from 'konva/lib/shapes/Image'
import { TransformerConfig } from 'konva/lib/shapes/Transformer'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import { Image as KonvaImage, KonvaNodeComponent, Transformer } from 'react-konva'
import { filter } from '../../../constants/image-editor/imageFilters'
import { imageData } from '../../../features/canvasPages/canvas-elements/imageHandlingReducer'
import { filtersCount, imageFilter } from '../../../features/canvasPages/canvas-elements/filtersSlice'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import TransformerComp from './TransformerComp'
import CropComponent from './CropComponent'
import { canvasSelected } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'

interface props {
  data: imageData
  pageId: number,
  elementId: number
  selected: canvasSelected
  imageFilter: imageFilter
  layerRef: undefined | Layer | null
}

const CanvasImage = ({ data, pageId, elementId, selected, imageFilter, layerRef }: props) => {
  // properties related to the HTML element
  const image = new Image()
  const imageRef = useRef<Image>();



  const isSelected = selected?.page === pageId && selected.element === elementId
  //filters, to be removed from here maybe
  const brightness = imageFilter?.filter.brightness
  const contrast = imageFilter?.filter.contrast
  const blur = imageFilter?.filter.blur


  const dispatch = useAppDispatch()



  useEffect(() => {
    if (image && imageRef.current) {
      image.src = data.imageSRC
      image.onload = () => {
        imageRef.current.cache();
        layerRef.current.draw();
      }

    }
  }, [imageRef.current, imageRef])

  const [cropParams, setCropParams] = useState<{ x: number, y: number, width: number, height: number } | undefined>(undefined)


  useEffect(() => {
    if (data.crop || data.cropRectangle.width === undefined) return
    layerRef.current.draw()
  }, [data.crop])

  useEffect(() => {
    if (data.crop) return
    // setCropParams(data.cropRectangle)
    console.log(`cropParams:`, cropParams)

    // dwa

  }, [data.cropRectangle.width])


  return (
    <>
      <KonvaImage
        onClick={() => handleSelect(pageId, elementId, dispatch)}
        onTap={() => handleSelect(pageId, elementId, dispatch)}
        ref={imageRef}
        x={data.x}
        y={data.y}
        scaleX={data.scaleX}
        scaleY={data.scaleY}
        image={image}
        width={data.width}
        height={data.height}
        filters={[Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.Blur,]}
        brightness={brightness ? brightness.value / 100 : 0}
        contrast={contrast ? contrast.value : 0}
        blurRadius={blur ? blur.value : 0}
        //ROTATION TODO
        draggable
        onDragEnd={(e) => { handleMovePosition(e, pageId, elementId, dispatch) }}
        onTransformEnd={(e) => {
          handleScaling(imageRef, pageId, elementId, dispatch)
        }}
        // crop={cropParams}
        cropX={data.cropRectangle.x}
        cropY={data.cropRectangle.x}
        cropWidth={data.cropRectangle.width}
        cropHeight={data.cropRectangle.height}

      // crop={data.cropRectangle}
      />
      {isSelected && !data.crop && (
        <TransformerComp isSelected={isSelected} elementRef={imageRef}
        />
      )}
      {data.crop && (
        <CropComponent data={data} elementRef={imageRef} />
      )}
    </>
  )

}
export default CanvasImage