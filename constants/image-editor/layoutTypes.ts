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
    dimensions: " 8.5” by 14”",
    value: { w: 2640, h: 4080 },
    url: "/image-editor/layoutTypes/physicalLayouts/tabloid.png",
  },
  {
    name: "A4",
    dimensions: " 8.5” by 14”",
    value: { w: 2640, h: 4080 },
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
    dimensions: "1200 X 630",
    value: { w: 1200, h: 630 },
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
    dimensions: "1200 X 628",
    value: { w: 1200, h: 628 },
    url: "/image-editor/layoutTypes/socialMediaLayouts/twitter.png",
  },
] as const;
