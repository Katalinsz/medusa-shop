export interface Pixel {
  color: number
  count: number
}

export interface MotifRow {
  pixels: Pixel[]
  index?: number
}

export interface MotifData {
  width: number
  height: number
  selected_row: number
  colors: string[]
  rows: MotifRow[]
}
