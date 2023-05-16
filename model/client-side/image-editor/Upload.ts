import React from "react";
import { DEFAULT_OPTIONS } from "../../../constants/image-editor/imageFilters";
import { HTMLHexColor } from "../../../typings/typings";
import { addImage } from "../../../zustand/CanvasStore/imageHandlers";
import {
  changePageSize,
  useCanvasState,
} from "../../../zustand/CanvasStore/store";
import { addText, textData } from "../../../zustand/CanvasStore/textHandlers";
import {
  addShape,
  addShapePatternImage,
  shapeData,
} from "../../../zustand/CanvasStore/shapeHandlers";

// eslint-disable-next-line react-hooks/rules-of-hooks

/**
 * Uploads an image to the image editor canvas
 * @param ADD_IMAGE The adds image function from zustand
 * @param CHANGE_PAGE_SIZE Zustand function to change the page size if this image is the first image that is uploaded (meaning that width and height are null)
 * @param w the width of the canvas, only used to check if it is null (meaning the canvas was empty prior to this)
 * @param h the height of the canvas, used same as width
 * @param pageId the page that you want to upload this image to
 * @param imagesArray you can drop an image array from a dropzone component to upload the image directly
 * @param url The url of the image that you would want to be uploaded
 * @returns {void}
 */
export const uploadImageToCanvas = (
  ADD_IMAGE: addImage,
  CHANGE_PAGE_SIZE: changePageSize,
  w: null | number,
  h: null | number,
  pageId: number | null,
  imagesArray?: File[] | null | FileList,
  url?: string
) => {
  const image = new Image();
  if (imagesArray) {
    let selected = imagesArray[0];
    image.src = URL.createObjectURL(selected);
  } else if (url) {
    image.src = url;
  }

  return (image.onload = () => {
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
    if (w === null || h === null) CHANGE_PAGE_SIZE(image.width, image.height);
    return ADD_IMAGE(pageId ? pageId : 0, data, filterData);
  });
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
    fillPatternImageSRC: shapeData.fillPatternImageSRC
      ? shapeData.fillPatternImageSRC
      : null,
    fillGradientDirection: shapeData.fillGradientDirection
      ? shapeData.fillGradientDirection
      : null,
    fillLinearGradientColorStops: shapeData.fillLinearGradientColorStops
      ? shapeData.fillLinearGradientColorStops
      : null,
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
  imagesArray: FileList | null | File[]
) => {
  if (!imagesArray) return console.log("no image was provided");
  let image = new Image();
  const selected = imagesArray[0];
  image.src = URL.createObjectURL(selected);
  image.onload = () => {
    ADD_SHAPE_PATTERN_IMAGE(pageId, elementId, image.src);
  };
};
