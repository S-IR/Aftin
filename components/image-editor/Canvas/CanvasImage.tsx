import Konva from "konva";
import { ImageConfig } from "konva/lib/shapes/Image";
import { TransformerConfig } from "konva/lib/shapes/Transformer";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import {
  Image as KonvaImage,
  KonvaNodeComponent,
  Transformer,
} from "react-konva";
import TransformerComp from "./TransformerComp";
import CropComponent from "./CropComponent";
import { imageFilterProperties } from "../../../constants/image-editor/imageFilters";
import {
  canvasSelected,
  changeElementPosition,
  changeElementScale,
  selectElement,
} from "../../../zustand/CanvasStore/store";
import { imageData } from "../../../zustand/CanvasStore/imageHandlers";
import { useImage } from "react-konva-utils";

interface props {
  data: imageData;
  pageId: number;
  elementId: number;
  selected: canvasSelected;
  imageFilter: imageFilterProperties;
  layerRef: undefined | Layer | null;
  CHANGE_ELEMENT_POSITION: changeElementPosition;
  CHANGE_ELEMENT_SCALE: changeElementScale;
  SELECT_ELEMENT: selectElement;
}

/**
 * The image component that is meant to appear in the canvas editor
 */
const CanvasImage = ({
  data,
  pageId,
  elementId,
  selected,
  imageFilter,
  layerRef,
  CHANGE_ELEMENT_POSITION,
  CHANGE_ELEMENT_SCALE,
  SELECT_ELEMENT,
}: props) => {
  // properties related to the HTML element
  const imageRef = useRef<Image>();
  const [image] = useImage(data.imageSRC);

  const isSelected =
    selected?.page === pageId && selected.element === elementId;
  //filters, to be removed from here maybe
  const brightness = imageFilter.brightness;
  const contrast = imageFilter.contrast;
  const blur = imageFilter.blur;

  useEffect(() => {
    if (data.cropRectangle.width === undefined) return;
    // imageRef.current.cache();
    imageRef.current.crop = data.cropRectangle;
    imageRef.current.cache();
    layerRef.current.draw();
  }, [data.hasCrop]);

  return (
    <>
      <KonvaImage
        onClick={() => {
          return SELECT_ELEMENT(pageId, elementId);
        }}
        onTap={() => SELECT_ELEMENT(pageId, elementId)}
        ref={imageRef}
        x={data.cropRectangle.x && !data.crop ? data.cropRectangle.x : data.x}
        y={data.cropRectangle.y && !data.crop ? data.cropRectangle.y : data.y}
        scaleX={data.scaleX}
        scaleY={data.scaleY}
        image={image}
        width={
          data.cropRectangle.width && !data.crop
            ? data.cropRectangle.width
            : data.width
        }
        height={
          data.cropRectangle.height && !data.crop
            ? data.cropRectangle.height
            : data.height
        }
        filters={[
          Konva.Filters.Brighten,
          Konva.Filters.Contrast,
          Konva.Filters.Blur,
        ]}
        brightness={brightness ? brightness.value / 100 : 0}
        contrast={contrast ? contrast.value : 0}
        blurRadius={blur ? blur.value : 0}
        //ROTATION TODO
        draggable
        onDragEnd={(e) => {
          CHANGE_ELEMENT_POSITION(
            pageId,
            elementId,
            e.target.x(),
            e.target.y()
          );
        }}
        onTransformEnd={(e) => {
          CHANGE_ELEMENT_SCALE(
            pageId,
            elementId,
            imageRef.current.scaleX(),
            imageRef.current.scaleY()
          );
        }}
      />
      {isSelected && !data.crop && (
        <TransformerComp isSelected={isSelected} elementRef={imageRef} />
      )}
      {data.crop && <CropComponent data={data} elementRef={imageRef} />}
    </>
  );
};
export default CanvasImage;
