import { Stage } from "konva/lib/Stage"
import { KonvaNodeComponent, StageProps } from "react-konva"
import { DEFAULT_OPTIONS, filter } from "../../constants/image-editor/imageFilters"

export const canvasFilters = (filters: filter[]) => {
  const filtersString = filters.map((filter) => {
    return `${filter.property}(${filter.value}${filter.unit})`
  })
  return filtersString.join(' ')
}


export function downloadURI(uri: string ) {
  var link = document.createElement('a');
  link.download = ''
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export const handleExport = (stageRef : React.RefObject<KonvaNodeComponent<Stage, StageProps>>) => {
  if(!stageRef.current) return
  const uri = stageRef.current.toDataURL();
  downloadURI(uri);
};



