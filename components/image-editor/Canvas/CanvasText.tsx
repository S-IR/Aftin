import { RGB } from "konva/lib/filters/RGB";
import React, { useRef } from "react";
import { Text as KonvaText, Transformer } from "react-konva";
import { canvasSelected } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { textFilter } from "../../../features/canvasPages/canvas-elements/filtersHandlingReducers";
import { textData } from "../../../features/canvasPages/canvas-elements/textHandlingReducer";

import { useAppDispatch } from "../../../Redux/hooks";
import {
  changeElementPosition,
  selectElement,
} from "../../../zustand/CanvasStore/store";
import { textFilterProperties } from "../../../zustand/textHandlers";
import TransformerComp from "./TransformerComp";

interface props {
  data: textData;
  pageId: number;
  elementId: number;
  selected: canvasSelected;
  textFilter: textFilterProperties;
  CHANGE_ELEMENT_POSITION: changeElementPosition;
  SELECT_ELEMENT: selectElement;
}

const CanvasText = ({
  data,
  pageId,
  elementId,
  selected,
  textFilter,
  CHANGE_ELEMENT_POSITION,
  SELECT_ELEMENT,
}: props) => {
  // properties related to the HTML element

  const textRef = useRef<Text | undefined>();

  const isSelected =
    selected?.page === pageId && selected.element === elementId;

  return (
    <>
      <KonvaText
        onClick={() => SELECT_ELEMENT(pageId, elementId)}
        onTap={() => SELECT_ELEMENT(pageId, elementId)}
        fill={textFilter.fill}
        ref={textRef}
        x={data.x}
        y={data.y}
        text={data.text}
        fontSize={data.fontSize}
        fontFamily={data.fontFamily}
        fontVariant={data.fontVariant}
        align={data.align}
        verticalAlign={data.verticalAlign}
        stroke={textFilter.stroke}
        textDecoration={isSelected ? "underline" : ""}
        strokeWidth={Number(data.strokeWidth)}
        rotation={data.rotation}
        draggable
        onDragEnd={(e) =>
          CHANGE_ELEMENT_POSITION(pageId, elementId, e.target.x(), e.target.y())
        }
      />
      {isSelected && (
        <TransformerComp isSelected={isSelected} elementRef={textRef} />
      )}
    </>
  );
};

export default CanvasText;
