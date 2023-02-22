import React from "react";
import { DEFAULT_OPTIONS } from "../../../constants/image-editor/imageFilters";
import { canvasPagesActions } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { filtersActions } from "../../../features/canvasPages/canvas-elements/filtersSlice";
import { shapeData } from "../../../features/canvasPages/canvas-elements/shapeHandlingReducer";
import { textData } from "../../../features/canvasPages/canvas-elements/textHandlingReducer";
import { AppDispatch } from "../../../Redux/store";

export const uploadImageToCanvas = (
  dispatch: AppDispatch,
  pageId: number | null,
  imagesArray?: FileList | null,
  url?: string
) => {
  if (pageId === null) pageId = 0;
  const image = new Image();
  if (imagesArray) {
    let selected = imagesArray[0];
    image.src = URL.createObjectURL(selected);
  } else if (url) {
    image.src = url;
  }

  image.onload = () => {
    const { ADD_IMAGE } = canvasPagesActions;
    dispatch(
      ADD_IMAGE({
        pageId,
        data: {
          imageSRC: image.src,
          width: image.width,
          height: image.height,
          scaleX: 1,
          scaleY: 1,
          borderWidth: 0,
          borderColor: "",
          x: 0,
          y: 0,
          rotate: 0,
          crop: false,
          cropRectangle: {
            x: undefined,
            y: undefined,
            width: undefined,
            height: undefined,
          },
        },
      })
    );
    const { ADD_IMAGE_FILTER } = filtersActions;
    dispatch(
      ADD_IMAGE_FILTER({
        pageId,
        data: { type: "image", filter: DEFAULT_OPTIONS },
      })
    );
  };
};

export const uploadTextToCanvas = (
  dispatch: AppDispatch,
  pageId: number,
  textData: Partial<textData>
) => {
  const { ADD_TEXT } = canvasPagesActions;
  const { ADD_TEXT_FILTER } = filtersActions;

  dispatch(
    ADD_TEXT({
      pageId,
      data: {
        text: textData.text || "Your desired text",
        x: textData.x || 20,
        y: textData.y || 20,
        fontSize: textData.fontSize || 12,
        fontFamily: textData.fontFamily || "Arial",
        fontVariant: textData.fontVariant || "normal",
        align: textData.align || "center",
        verticalAlign: textData.verticalAlign || "middle",
        strokeWidth: textData.strokeWidth || 0,
        rotation: textData.rotation || 0,
      },
    })
  );
  dispatch(
    ADD_TEXT_FILTER({
      pageId,
      data: {
        type: "text",
        filter: {
          fill: `#000000`,
          stroke: `#000000`,
        },
      },
    })
  );
};

export const uploadShapeToCanvas = (
  dispatch: AppDispatch,
  pageId: number,
  shapeData: Partial<shapeData>
) => {
  const { ADD_SHAPE } = canvasPagesActions;
  const { ADD_SHAPE_FILTER } = filtersActions;

  dispatch(
    ADD_SHAPE({
      pageId,
      data: {
        shape: shapeData.shape || "Circle",
        width: shapeData.width || 100,
        height: shapeData.height || 100,
        x: shapeData.x || 50,
        y: shapeData.y || 50,
        fillPatternImageSRC: shapeData.fillPatternImageSRC || "",
        fillGradientDirection: shapeData.fillGradientDirection || null,
        fillLinearGradientColorStops:
          shapeData.fillLinearGradientColorStops || null,
        strokeWidth: shapeData.strokeWidth || 0,
        ...(shapeData.innerRadius !== undefined && {
          innerRadius: shapeData.innerRadius,
        }),
        ...(shapeData.outerRadius !== undefined && {
          outerRadius: shapeData.outerRadius,
        }),
      },
    })
  );
  dispatch(
    ADD_SHAPE_FILTER({
      pageId,
      data: {
        type: "shape",
        filter: {
          fill: `#000000`,
          stroke: `#000000`,
        },
      },
    })
  );
};
