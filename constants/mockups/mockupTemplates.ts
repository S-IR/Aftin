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
  placement: placement[];
  src: null | string | Blob | Url;
};
type placement = {
  bg: mockupBg;
  sentImg: sentImgPlacement;
};

export const previewPhone: mockupTemplate = {
  placement: [
    {
      bg: {
        w: 1920,
        h: 1080,
        x: 0,
        y: 0,
        src: "/mockups/phoneMockup/1.png",
      },
      sentImg: {
        w: 512,
        h: 512,
        x: 500,
        y: 300,
      },
    },
    {
      bg: {
        w: 1920,
        h: 1080,
        x: 0,
        y: 0,
        src: "/mockups/phoneMockup/2.png",
      },
      sentImg: {
        w: 512,
        h: 512,
        x: 500,
        y: 300,
      },
    },
  ],
  src: null,
};

export const previewDayHand: mockupTemplate = {
  placement: [
    {
      bg: {
        w: 1296,
        h: 912,
        x: 0,
        y: 0,
        src: "/mockups/in-hand-day-environment/1.png",
      },
      sentImg: {
        w: 512,
        h: 512,
        x: 500,
        y: 300,
      },
    },
    {
      bg: {
        w: 1456,
        h: 816,
        x: 0,
        y: 0,
        src: "/mockups/in-hand-day-environment/2.png",
      },
      sentImg: {
        w: 512,
        h: 512,
        x: 500,
        y: 300,
      },
    },
  ],
  src: null,
};
