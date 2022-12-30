export type sentImgPlacement = {
  w: number
  h: number
  x: number
  y: number
  extraCSS?: string
}

export type previewBG = {
  w: number
  h: number
  x: number
  y: number
  src: string
  extraCSS?: string
}

export type previewTemplate = {
  bg: previewBG[] | previewBG
  sentImgPlacement: sentImgPlacement
}

export const previewPhone: previewTemplate = {
  bg: {
    w: 1920,
    h: 1080,
    x: 0,
    y: 0,
    src: '/frontend-used-images/previews/previewPhone/bg.png'
  },
  sentImgPlacement: {
    w: 512,
    h: 512,
    x: 20,
    y: 20,
  }
} as const

