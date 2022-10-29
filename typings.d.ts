export interface UploadPictures {
  alt_text : string
  checkbox: boolean
  collection_name : string
  description: string
  file: File
  storage_address: string
}

export interface Genre {
  id: number
  name: string
}

export interface Movie {
  title: string
  backdrop_path: string
  media_type?: string
  release_date?: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface image_products {
  type:
    | 'Logos'
    | 'Menus'
    | 'Flyers'
    | 'Banners'
    | 'Stickers'
    | 'Cliparts'
    | 'Photos'
    | 'Arts'
}

export type color = "black"| "white"| "gray"| "silver"| "maroon"| "red"| "purple"| "fuchsia"| "green"| "lime"| "olive"| "yellow"| "navy"| "blue"| "teal"| "aqua"

export type HTMLHexColor = `#${string}`