import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  previewPhone,
  mockupTemplate,
} from "../../constants/mockups/mockupTemplates";
import PreviewImg from "./PreviewImg";
import PreviewElement from "./PreviewElement";
import { mockupsCount } from "../../features/mockups/mockupsSlice";
import {
  Stage as KonvaStage,
  Layer,
  Rect,
  KonvaNodeComponent,
} from "react-konva";
import { useMockupsStore } from "../../zustand/MockupsStore/store";
import { previewSelectedCategory } from "../../pages/restaurant-mockups";
import { animated, useSpringRef, useTransition } from "react-spring";
import { Spring } from "@react-spring/konva";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { MockupType } from "../../constants/mockups/previewCategories";
import { determineMockupImg } from "../../model/client-side/mockups/determineMockupImg";

interface props {
  mockupType: MockupType;
}

const PreviewCanvas = ({ mockupType }: props) => {
  const [images, currentlyPreviewed] = useMockupsStore((state) => [
    state.images,
    state.currentlyPreviewed,
  ]);

  const placementData = useMemo(
    () => determineMockupImg(mockupType),
    [mockupType]
  );
  const stageRef = useRef<KonvaNodeComponent<Stage, StageProps>>(null);
  const canvasBGRef = useRef<null | KonvaNodeComponent<Rect, RectConfig>>(null);
  const layerRef = useRef<null | KonvaNodeComponent<Layer, LayerConfig>>(null);

  placementData.src = images[currentlyPreviewed as number].url;
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const transRef = useSpringRef();
  const transitions = useTransition(backgroundIndex, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(0,25%,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-10%,0)" },
  });
  console.log("PreviewCanvas src", placementData.src);

  useEffect(() => {
    transRef.start();
  }, [backgroundIndex]);
  if (placementData === null) {
    console.log("placement Data is null");
    return <></>;
  }
  return (
    <section className="relative h-[540px] w-[960px] bg-white p-2 md:h-[1080px] md:w-[1920px]">
      {transitions((styles, i) => {
        const bg = placementData.bg[i];

        return (
          <animated.div
            style={styles}
            className={
              "absolute top-0 left-0  flex h-[540px] w-[960px] justify-center p-2 pt-10 md:h-[1080px] md:w-[1920px]"
            }
          >
            <Image
              src={bg.src}
              width={bg.w}
              height={bg.h}
              alt={"mockup background"}
            />
          </animated.div>
        );
      })}

      <button
        className="absolute top-2 left-1/2 z-10 h-8 w-8 rounded-full bg-gray-500 transition-all duration-300 hover:bg-gray-700 disabled:bg-black  "
        disabled={backgroundIndex === 4}
        onClick={() => setBackgroundIndex((v) => v + 1)}
      >
        <KeyboardArrowRight />
      </button>
      <button
        className="absolute top-2 left-1/4 z-10 h-8 w-8 rounded-full bg-gray-500 transition-all duration-300 hover:bg-gray-700 disabled:bg-black  "
        disabled={backgroundIndex === 0}
        onClick={() => setBackgroundIndex((v) => v - 1)}
      >
        <KeyboardArrowLeft />
      </button>
      <KonvaStage
        width={isMobile ? 960 : 1920}
        height={isMobile ? 540 : 1080}
        ref={stageRef}
        willReadFrequently={true}
        className={"pt-10"}
      >
        <Layer ref={layerRef}>
          <>
            <Rect
              ref={canvasBGRef}
              width={1920}
              height={1080}
              x={0}
              y={0}
              // fill={`white`}
            />
            <PreviewElement
              src={placementData.src}
              placementData={placementData.sentImgPlacement[backgroundIndex]}
              layerRef={layerRef}
            />
          </>
        </Layer>
      </KonvaStage>
    </section>
  );
};

export default PreviewCanvas;
