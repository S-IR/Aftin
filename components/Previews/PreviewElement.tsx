import React, { LegacyRef, useEffect, useRef } from 'react'
import { previewBG, sentImgPlacement } from '../../constants/previews/previewTemplates'
import { Image as KonvaImage, KonvaNodeComponent, Transformer } from 'react-konva'
import { ImageConfig } from 'next/dist/shared/lib/image-config'


interface sourcedImgPlacement extends sentImgPlacement{
  src: string
}

interface props {
  data: previewBG | sourcedImgPlacement
  layerRef : React.MutableRefObject<KonvaNodeComponent<Layer, LayerConfig> | null>
}



const PreviewElement = ({data, layerRef}: props) => {
  const image = new Image()
  image.src = data.src

  image.onload = () => {
    image.src = data.src
    imageRef.current.cache();
    if(!layerRef || layerRef.current) return
    layerRef.current?.draw()
  }
  const imageRef = useRef<LegacyRef<KonvaNodeComponent<Image, ImageConfig>>>();
  

  useEffect(() => {
    if (image && imageRef.current) {

    }
  }, [])


  useEffect(() => { 
    console.log(`image.src:`, image.src);
    console.log('image:', image);
    
  

  }, [image.src, image])


  return (
    <KonvaImage
      x={data.x}
      y={data.y}
      ref={imageRef}
      image={image}
      width={data.w}
      height={data.h}
      
    //ROTATION TODO
    />
  )
}

export default PreviewElement