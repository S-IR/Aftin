import React from "react";
import { DEFAULT_OPTIONS } from "../../../constants/image-editor/imageFilters";
import { canvasPagesActions } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { shapeData } from "../../../features/canvasPages/canvas-elements/shapeHandlingReducer";
import { textData } from "../../../features/canvasPages/canvas-elements/textHandlingReducer";
import { AppDispatch } from "../../../Redux/store";
import { HTMLHexColor } from "../../../typings/typings";
import { addImage } from "../../../zustand/CanvasStore/imageHandlers";
import { addShape, addShapePatternImage } from "../../../zustand/shapeHandlers";
import { useCanvasState } from "../../../zustand/CanvasStore/store";
import { addText } from "../../../zustand/textHandlers";

// eslint-disable-next-line react-hooks/rules-of-hooks

export const uploadImageToCanvas = (
  ADD_IMAGE: addImage,
  pageId: number | null,
  imagesArray?: FileList | null,
  url?: string
) => {
  const image = new Image();
  if (imagesArray) {
    let selected = imagesArray[0];
    image.src = URL.createObjectURL(selected);
  } else if (url) {
    image.src = url;
  }

  image.onload = () => {
    const data = {
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
      hasCrop: false,
      cropRectangle: {
        x: undefined,
        y: undefined,
        width: undefined,
        height: undefined,
      },
    };
    const filterData = DEFAULT_OPTIONS;
    ADD_IMAGE(pageId ? pageId : 0, data, filterData);
  };
};

export const uploadTextToCanvas = (
  ADD_TEXT: addText,
  pageId: number,
  textData: Partial<textData>
) => {
  const data = {
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
  };
  const filters = {
    fill: `#000000` as HTMLHexColor,
    stroke: `#000000` as HTMLHexColor,
  };

  ADD_TEXT(pageId, data, filters);

  //   dispatch(
  //     ADD_TEXT({
  //       pageId,
  //       data: {
  //         text: textData.text || "Your desired text",
  //         x: textData.x || 20,
  //         y: textData.y || 20,
  //         fontSize: textData.fontSize || 12,
  //         fontFamily: textData.fontFamily || "Arial",
  //         fontVariant: textData.fontVariant || "normal",
  //         align: textData.align || "center",
  //         verticalAlign: textData.verticalAlign || "middle",
  //         strokeWidth: textData.strokeWidth || 0,
  //         rotation: textData.rotation || 0,
  //       },
  //     })
  //   );
  //   dispatch(
  //     ADD_TEXT_FILTER({
  //       pageId,
  //       data: {
  //         type: "text",
  //         filter: {
  //           fill: `#000000`,
  //           stroke: `#000000`,
  //         },
  //       },
  //     })
  //   );
};

export const uploadShapeToCanvas = (
  ADD_SHAPE: addShape,
  pageId: number,
  shapeData: Partial<shapeData>
) => {
  const data = {
    shape: shapeData.shape || "Circle",
    width: shapeData.width || 100,
    height: shapeData.height || 100,
    x: shapeData.x || 50,
    y: shapeData.y || 50,
    fillPatternImageSRC: shapeData.fillPatternImageSRC || null,
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
  };
  const filters = {
    fill: `#000000` as HTMLHexColor,
    stroke: `#000000` as HTMLHexColor,
  };
  ADD_SHAPE(pageId, data, filters);
};
// const { ADD_SHAPE } = canvasPagesActions;
// const { ADD_SHAPE_FILTER } = filtersActions;
// dispatch(
//   ADD_SHAPE({
//     pageId,
//     data: {
//       shape: shapeData.shape || "Circle",
//       width: shapeData.width || 100,
//       height: shapeData.height || 100,
//       x: shapeData.x || 50,
//       y: shapeData.y || 50,
//       fillPatternImageSRC: shapeData.fillPatternImageSRC || "",
//       fillGradientDirection: shapeData.fillGradientDirection || null,
//       fillLinearGradientColorStops:
//         shapeData.fillLinearGradientColorStops || null,
//       strokeWidth: shapeData.strokeWidth || 0,
//       ...(shapeData.innerRadius !== undefined && {
//         innerRadius: shapeData.innerRadius,
//       }),
//       ...(shapeData.outerRadius !== undefined && {
//         outerRadius: shapeData.outerRadius,
//       }),
//     },
//   })
// );
// dispatch(
//   ADD_SHAPE_FILTER({
//     pageId,
// data: {
//   type: "shape",
//   filter: {
//     fill: `#000000`,
//     stroke: `#000000`,
//   },
// },
//   })
// );

export const fillWithPattern = (
  ADD_SHAPE_PATTERN_IMAGE: addShapePatternImage,
  pageId: number,
  elementId: number,
  imagesArray: FileList | null
) => {
  if (!imagesArray) return console.log("no image was provided");
  let image = new Image();
  const selected = imagesArray[0];
  image.src = URL.createObjectURL(selected);
  image.onload = () => {
    ADD_SHAPE_PATTERN_IMAGE(pageId, elementId, image.src);
  };
};
