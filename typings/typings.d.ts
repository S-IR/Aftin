interface Gtag {
  (
    command: "config",
    targetId: string,
    config?: ControlParams | EventParams | CustomParams
  ): void;
  (command: "set", config: CustomParams): void;
  (command: "js", config: Date): void;
  (
    command: "event",
    eventName: EventNames | string,
    eventParams?: ControlParams | EventParams | CustomParams
  ): void;
}
declare global {
  interface Window {
    gtag: Gtag;
  }
}

export type color =
  | "black"
  | "white"
  | "gray"
  | "red"
  | "purple"
  | "fuchsia"
  | "green"
  | "lime"
  | "yellow"
  | "blue"
  | "orange"
  | "indigo"
  | "violet"
  | "light red"
  | "light purple"
  | "light fuchsia"
  | "light green"
  | "light lime"
  | "light yellow"
  | "light blue"
  | "light orange"
  | "light indigo"
  | "light violet"
  | "dark red"
  | "dark purple"
  | "dark fuchsia"
  | "dark green"
  | "dark lime"
  | "dark yellow"
  | "dark blue"
  | "dark orange"
  | "dark indigo"
  | "dark violet"
  | `light gray`
  | `dark gray`
  | "brown"
  | "light brown"
  | "dark brown";
export type HTMLHexColor = `#${string}`;

export type SidebarSorts = {
  restaurantType?: string;
  colorPallet?: string;
  colorPallet: { colorPalletName: "Custom"; colors: [] }?;
};
export type LoginStatus =
  | "not logged in"
  | "unauthorized"
  | "bronze"
  | "silver"
  | "gold"
  | undefined;
export type Base64Data<imageType extends string> =
  `data:image/${imageType};base64,${string}`;
export type UTF8Data<imageType extends string> =
  `data:image/${imageType};utf8,${string}`;

export type paidFeature =
  | "svg-convert"
  | "upscale-image"
  | "stylize-image"
  | "deblur-image";
// TO BE FILLED
