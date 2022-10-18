import { LegacyRef } from "react"
import { DEFAULT_OPTIONS, filter } from "../../constants/image-editor/filters"
import { useAppSelector } from "../../Redux/hooks"


export const canvasFilters = (filters: filter[]) => {
  const filtersString = filters.map((filter) => {
    return `${filter.property}(${filter.value}${filter.unit})`
  })
  return filtersString.join(' ')
}

console.log('hi')


export const handleDownload = (
  filters: filter[],
  canvas: HTMLCanvasElement | null,
  downloadRef: HTMLAnchorElement
) => {
  const a = document.createElement('a')
  const filtersString = filters.map((filter) => {
    return `${filter.property}(${filter.value}${filter.unit})`
  })
  if (ctx === null || canvas === null || downloadRef === null) return
  const ctx = canvas.getContext('2d')
  // context.filter = filtersString.join(' ')
  ctx.filter = 'contrast(1.4) sepia(1) drop-shadow(-9px 9px 3px #e81)';
  a.href = canvas.toDataURL()
  a.download = "image.png"
  console.log(canvas)
  document.body.appendChild(a)
  a.click()

}

