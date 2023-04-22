import { Url } from "url";

export type sentImgPlacement = {
  w: number;
  h: number;
  x: number;
  y: number;
  extraCSS?: string;
};

export type mockupBg = {
  w: number;
  h: number;
  x: number;
  y: number;
  src: string;
  extraCSS?: string;
};

export type mockupTemplate = {
  bg: mockupBg[];
  sentImgPlacement: sentImgPlacement[];
  src: undefined | string | Blob | Url;
};

export const previewPhone: mockupTemplate = {
  bg: [
    {
      w: 1920,
      h: 1080,
      x: 0,
      y: 0,
      src: "/mockups/phoneMockup/1.png",
    },
    {
      w: 1920,
      h: 1080,
      x: 0,
      y: 0,
      src: "/mockups/phoneMockup/2.png",
    },
  ],
  sentImgPlacement: [
    {
      w: 512,
      h: 512,
      x: 20,
      y: 20,
    },
    {
      w: 256,
      h: 256,
      x: 400,
      y: 400,
    },
  ],
  src: undefined,
};
