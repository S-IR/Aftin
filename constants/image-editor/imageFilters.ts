export interface CSSFilter {
  property: string
  value: number
  range: {
    min: number,
    max: number
  },
  unit: '%' | 'deg' | 'px'
}
export interface imageFilterProperties {
  'brightness': CSSFilter,
  'contrast': CSSFilter,
  'blur': CSSFilter
}

export const DEFAULT_OPTIONS = {
  'brightness': {
    property: 'brightness',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  'contrast': {
    property: 'contrast',
    value: 0,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  'blur': {
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  },
}