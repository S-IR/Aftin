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

// TO BE FILLED
