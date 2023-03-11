import React, { LegacyRef, useEffect, useRef } from "react";
import {
  mockupBg,
  sentImgPlacement,
} from "../../constants/mockups/mockupTemplates";
import {
  Image as KonvaImage,
  KonvaNodeComponent,
  Transformer,
} from "react-konva";
import { ImageConfig } from "next/dist/shared/lib/image-config";
import { animated } from "react-spring";

interface props {
  src: undefined | string | Blob | Url;

  placementData: sentImgPlacement;
  layerRef: Layer | LayerConfig | null;
}

const PreviewElement = ({ src, placementData, layerRef }: props) => {
  console.log();
  const image = new Image();
  image.src = src;

  image.onload = () => {
    image.src = src as string;
    if (!imageRef || !imageRef.current || !layerRef || layerRef.current) return;

    imageRef.current.cache();
    layerRef.current?.draw();
  };
  const imageRef = useRef<LegacyRef<KonvaNodeComponent<Image, ImageConfig>>>();

  useEffect(() => {
    if (image && imageRef.current) {
    }
  }, []);

  return (
    <KonvaImage
      x={placementData.x}
      y={placementData.y}
      ref={imageRef}
      image={image}
      width={placementData.w}
      height={placementData.h}

      //ROTATION TODO
    />
  );
};

export default PreviewElement;
