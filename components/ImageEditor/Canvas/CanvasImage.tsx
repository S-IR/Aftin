import Konva from 'konva'
import { ImageConfig } from 'konva/lib/shapes/Image'
import { TransformerConfig } from 'konva/lib/shapes/Transformer'
import React, { LegacyRef, useEffect, useRef } from 'react'
import { Image as KonvaImage, KonvaNodeComponent, Transformer } from 'react-konva'
import { filter } from '../../../constants/image-editor/filters'
import { imageData } from '../../../features/canvas-elements/imageHandlingReducer'
import { filtersCount } from '../../../features/image-editor/filtersSlice'
import { handleMovePosition, handleScaling, handleSelect } from '../../../model/image-editor/CanvasElements'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import TransformerComp from './TransformerComp'

interface props {
  data: imageData
  id: number
  isSelected: boolean
}

const CanvasImage = ({ data, id, isSelected}: props) => {
  // properties related to the HTML element
  const image = new Image()
  image.src = data.imageSRC
  const imageRef = useRef<LegacyRef<KonvaNodeComponent<Image, ImageConfig>>>();
  const trRef = useRef<LegacyRef<KonvaNodeComponent<Transformer, TransformerConfig>>>()

  //filters, to be removed from here maybe
  const filters: filter[] = useAppSelector(filtersCount)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (image && imageRef.current) {

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
        brightness={filters[0].value / 100}
        contrast={filters[1].value}
        blurRadius={filters[2].value}
        //ROTATION TODO
        draggable
        onDragEnd={(e) => { handleMovePosition(e, id, dispatch ) }}
        onTransformEnd={() => {handleScaling(imageRef, id, dispatch)}}
      />
      {isSelected && (
        <TransformerComp isSelected={isSelected} elementRef={imageRef}
        />
      )}
    </>

  )
}

export default CanvasImage