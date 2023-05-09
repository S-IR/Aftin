export const physicalLayouts = [
  {
    name: "Letter",
    dimensions: "8.5″ by 11″",
    value: { w: 2040, h: 2640 },
    url: "/image-editor/layoutTypes/physicalLayouts/letter.png",
  },
  {
    name: "Legal",
    dimensions: " 8.5” by 14”",
    value: { w: 2040, h: 3360 },
    url: "/image-editor/layoutTypes/physicalLayouts/legal.png",
  },
  {
    name: "Tabloid",
    dimensions: " 11” by 17”",
    value: { w: 2640, h: 4080 },
    url: "/image-editor/layoutTypes/physicalLayouts/tabloid.png",
  },
  {
    name: "A4",
    dimensions: " 8.3” by 11.7”",
    value: { w: 1985, h: 2806 },
    url: "/image-editor/layoutTypes/physicalLayouts/A4.png",
  },
  {
    name: "Bi-Fold",
    dimensions: " 4.5” by 11”",
    value: { w: 1080, h: 2640 },
    url: "/image-editor/layoutTypes/physicalLayouts/bi-fold.png",
  },
  {
    name: "Tri-Fold",
    dimensions: " 5.68” by 11”",
    value: { w: 1363, h: 2640 },
    url: "/image-editor/layoutTypes/physicalLayouts/tri-fold.png",
  },
] as const;
export const digitalLayouts = [
  {
    name: "Facebook",
    dimensions: "820 X 460px",
    value: { w: 820, h: 460 },
    url: "/image-editor/layoutTypes/socialMediaLayouts/facebook.png",
  },
  {
    name: "Instagram",
    dimensions: "1080 X 1080",
    value: { w: 1080, h: 1080 },
    url: "/image-editor/layoutTypes/socialMediaLayouts/instagram.png",
  },
  {
    name: "Twitter",
    dimensions: "1500 X 500px",
    value: { w: 1500, h: 500 },
    url: "/image-editor/layoutTypes/socialMediaLayouts/twitter.png",
  },
] as const;
