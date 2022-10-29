import Konva from 'konva'
import { ImageConfig } from 'konva/lib/shapes/Image'
import { TransformerConfig } from 'konva/lib/shapes/Transformer'
import React, { LegacyRef, useEffect, useRef } from 'react'
import { Image as KonvaImage, KonvaNodeComponent, Transformer } from 'react-konva'
import { filter } from '../../../constants/image-editor/imageFilters'
import { imageData } from '../../../features/canvas-elements/imageHandlingReducer'
import { filtersCount, imageFilter } from '../../../features/canvas-elements/filtersSlice'
import { handleMovePosition, handleScaling, handleSelect } from '../../../model/image-editor/CanvasElements'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import TransformerComp from './TransformerComp'

interface props {
  data: imageData
  id: number
  selectedElement: number | null
  imageFilter: imageFilter
}

const CanvasImage = ({ data, id, selectedElement, imageFilter }: props) => {
  // properties related to the HTML element
  const image = new Image()

  const imageRef = useRef<LegacyRef<KonvaNodeComponent<Image, ImageConfig>>>();



  const isSelected = selectedElement === id
  //filters, to be removed from here maybe
  const brightness = imageFilter?.filter.brightness
  const contrast = imageFilter?.filter.contrast
  const blur = imageFilter?.filter.blur


  const dispatch = useAppDispatch()

  useEffect(() => {
    if (image && imageRef.current) {
      image.src = data.imageSRC

      imageRef.current.cache();
    }
  }, [image])
  return (
    <>
      <KonvaImage
        onClick={() => handleSelect(id, dispatch)}
        onTap={() => handleSelect(id, dispatch)}
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
        onDragEnd={(e) => { handleMovePosition(e, id, dispatch) }}
        onTransformEnd={(e) => {
          handleScaling(imageRef, id, dispatch)
        }}
      />
      {isSelected && (
        <TransformerComp isSelected={isSelected} elementRef={imageRef}
        />
      )}
    </>
  )

}
export default CanvasImage