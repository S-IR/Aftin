export interface filter{
  name: string
  property: string
  value: number
  range: {
    min: number,
    max: number
  },
  unit: '%' | 'deg'| 'px'
}

export const DEFAULT_OPTIONS: Array<filter> = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 0,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  // {
  //   name: 'Saturation',
  //   property: 'saturate',
  //   value: 100,
  //   range: {
  //     min: 0,
  //     max: 200
  //   },
  //   unit: '%'
  // },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  },
  // {
  //   name: 'Grayscale',
  //   property: 'grayscale',
  //   value: 0,
  //   range: {
  //     min: 0,
  //     max: 100
  //   },
  //   unit: '%'
  // },
  // {
  //   name: 'Sepia',
  //   property: 'sepia',
  //   value: 0,
  //   range: {
  //     min: 0,
  //     max: 100
  //   },
  //   unit: '%'
  // },
  // {
  //   name: 'Hue Rotate',
  //   property: 'hue-rotate',
  //   value: 0,
  //   range: {
  //     min: 0,
  //     max: 360
  //   },
  //   unit: 'deg'
  // },
]