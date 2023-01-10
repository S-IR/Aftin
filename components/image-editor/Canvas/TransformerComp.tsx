import { Image } from 'canvas';
import { Circle, CircleConfig } from 'konva/lib/shapes/Circle';
import { Rect, RectConfig } from 'konva/lib/shapes/Rect';
import { TransformerConfig } from 'konva/lib/shapes/Transformer';
import { ImageConfig } from 'next/dist/shared/lib/image-config';
import React, { LegacyRef, useEffect, useRef } from 'react'
import { KonvaNodeComponent, Transformer } from 'react-konva';

interface props{
  isSelected:boolean
  elementRef: LegacyRef<KonvaNodeComponent<Image, ImageConfig, Circle, CircleConfig, Rect, RectConfig>>
}

const TransformerComp = ({isSelected, elementRef}: props) => {
  const trRef = useRef<LegacyRef<KonvaNodeComponent<Transformer, TransformerConfig>>>(null)

  useEffect(() => {
    if (isSelected) {
      if (trRef.current === null || trRef.current === undefined) return
      trRef.current.nodes([elementRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected])

  return (
  <Transformer
    ref={trRef}
    anchorFill={'orange'}
    anchorSize={12}
    anchorStroke={'red'}
    borderStroke={'red'}
    anchorCornerRadius={99}
    borderDash={[12, 12]}
    boundBoxFunc={(oldBox, newBox) => {
      
      // limit resize
      if (newBox.width < 5 || newBox.height < 5) {
        return oldBox;
      }
      return newBox;
    }}
  />
  )
}

export default TransformerComp