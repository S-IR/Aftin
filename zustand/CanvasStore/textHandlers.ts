export interface textData {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontVariant: "normal" | "italic" | "bold" | "italic bold";
  align: "left" | "center" | "right";
  verticalAlign: "top" | "middle" | "bottom";
  strokeWidth: number;
  rotation: number;
}
export type addText = (
  pageId: number,
  data: textData,
  filters: textFilterProperties
) => void;
export type changeText = (
  pageId: number,
  elementId: number,
  text: string
) => void;
export type changeFontFamily = (
  pageId: number,
  elementId: number,
  fontFamily: string
) => void;
export type changeFontSize = (
  pageId: number,
  elementId: number,
  fontSize: number
) => void;
export type changeFontVariant = (
  pageId: number,
  elementId: number,
  fontVariant: "normal" | "bold" | "italic" | "italic bold"
) => void;

export type changeStrokeWidth = (
  pageId: number,
  elementId: number,
  strokeWidth: number
) => void;

export type changeFontColor = (
  pageId: number,
  elementId: number,
  fill: `#${string}`
) => void;
export interface textFilterProperties {
  fill: `#${string}`;
  stroke: `#${string}`;
}
