import React, { useEffect, useMemo, useRef } from "react";
import {
  previewPhone,
  previewTemplate,
} from "../../constants/previews/previewTemplates";
import PreviewImg from "./PreviewImg";
import PreviewElement from "./PreviewElement";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { previewsCount } from "../../features/previews/previewsSlice";
import {
  Stage as KonvaStage,
  Layer,
  Rect,
  KonvaNodeComponent,
} from "react-konva";
import { usePreviewsStore } from "../../zustand/PreviewsStore/store";
import { previewSelectedCategory } from "../../pages/previews";

interface props {
  selectedCategory: previewSelectedCategory;
}

const PreviewCanvas = ({ selectedCategory }: props) => {
  const [images, currentlyPreviewed] = usePreviewsStore((state) => [
    state.images,
    state.currentlyPreviewed,
  ]);

  const determinePreviewIMG = (
    selectedCategory: previewSelectedCategory
  ): previewTemplate | null => {
    switch (selectedCategory.value) {
      case "phone":
        return previewPhone;
      default:
        return null;
    }
  };

  const placementData = useMemo(
    () => determinePreviewIMG(selectedCategory),
    [selectedCategory]
  );
  const stageRef = useRef<KonvaNodeComponent<Stage, StageProps>>(null);
  const canvasBGRef = useRef<null | KonvaNodeComponent<Rect, RectConfig>>(null);
  const layerRef = useRef<null | KonvaNodeComponent<Layer, LayerConfig>>(null);

  if (placementData === null) {
    console.log("placement Data is null");
    return <></>;
  }
  placementData.sentImgPlacement.src = images[currentlyPreviewed as number].url;

  return (
    <section className="p-2">
      <KonvaStage
        width={1920}
        height={1080}
        ref={stageRef}
        willReadFrequently={true}
      >
        <Layer ref={layerRef}>
          <Rect
            ref={canvasBGRef}
            width={1920}
            height={1080}
            x={0}
            y={0}
            fill={`white`}
          />
          {/* if the background data is NOT an array, do this  */}
          {!Array.isArray(placementData.bg) ? (
            <>
              <PreviewElement data={placementData.bg} layerRef={layerRef} />
              <PreviewElement
                data={placementData.sentImgPlacement}
                layerRef={layerRef}
              />
            </>
          ) : (
            <></>
          )}
        </Layer>
      </KonvaStage>
    </section>
  );
};

export default PreviewCanvas;
