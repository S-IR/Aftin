import Konva from 'konva'
import { Image, ImageConfig } from 'konva/lib/shapes/Image'
import { TransformerConfig } from 'konva/lib/shapes/Transformer'
import React, { LegacyRef, useEffect, useRef } from 'react'
import { Image as KonvaImage, KonvaNodeComponent, Transformer } from 'react-konva'
import { filter } from '../../../constants/image-editor/filters'
import { imageData } from '../../../features/canvas-elements/canvasElemSlice'
import { filtersCount } from '../../../features/image-editor/filtersSlice'
import { useAppSelector } from '../../../Redux/hooks'

interface props {
  data: imageData
  id: number
  selectedId: null | number
  selectShape: React.Dispatch<React.SetStateAction<number | null>>
}


const CanvasImage = ({ data, id, selectedId, selectShape }: props) => {
  const filters: filter[] = useAppSelector(filtersCount)
  const imageRef = useRef<LegacyRef<KonvaNodeComponent<Image, ImageConfig>>>();
  const trRef = useRef<LegacyRef<KonvaNodeComponent<Transformer, TransformerConfig>>>()
  const isSelected = selectedId === id
  useEffect(() => {
    if (isSelected) {
      if (trRef.current === null || trRef.current === undefined) return
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId])


  useEffect(() => {
    if (data.image && imageRef.current) {
      imageRef.current.cache();
    }
  }, [data.image])

  let imgX, imgY = 0


  return (
    <>
      <KonvaImage
        onClick={() => selectShape(id)}
        onTap={() => selectShape(id)}
        ref={imageRef}
        x={imgX}
        y={imgY}
        image={data.image}
        width={data.width}
        height={data.height}
        filters={[Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.Blur,]}
        brightness={filters[0].value / 100}
        contrast={filters[1].value}
        blurRadius={filters[2].value}
        //ROTATION TODO
        draggable
        onDragEnd={(e) => {
          imgX = e.target.x();
          imgY = e.target.y();
        }}
        onTransformEnd={(e) => {
          const node = imageRef.current;
          if (!node) return
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>

  )
}

export default CanvasImage