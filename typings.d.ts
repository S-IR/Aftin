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



export type color = "black"| "white"| "gray"| "red"| "purple"| "fuchsia"| "green"| "lime"| "yellow"|  "blue"| "orange" | "indigo" | "violet" |"light red"| "light purple"| "light fuchsia"| "light green"| "light lime"| "light yellow"|  "light blue"| "light orange" | "light indigo" | "light violet" |"dark red"| "dark purple"| "dark fuchsia"| "dark green"| "dark lime"| "dark yellow"|  "dark blue"| "dark orange" | "dark indigo" | "dark violet" | `light gray` | `dark gray` | 'brown' | 'light brown' | 'dark brown'
export type HTMLHexColor = `#${string}`