import { Stage } from "konva/lib/Stage"
import { KonvaNodeComponent, StageProps } from "react-konva"
import { DEFAULT_OPTIONS, filter } from "../../constants/image-editor/imageFilters"
import { canvasPagesActions } from "../../features/canvasPages/canvas-elements/canvasPageSlice"
import { filtersActions } from "../../features/canvasPages/canvas-elements/filtersSlice"
import { AppDispatch } from "../../Redux/store"

export const canvasFilters = (filters: filter[]) => {
  const filtersString = filters.map((filter) => {
    return `${filter.property}(${filter.value}${filter.unit})`
  })
  return filtersString.join(' ')
}


export function downloadURI(uri: string) {
  var link = document.createElement('a');
  link.download = ''
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export const handleExport = (stageRefs: React.RefObject<KonvaNodeComponent<Stage, StageProps>>[], pageToDownload: number | 'all') => {
  console.log('pageToDownload: ', pageToDownload, 'stageRefs:', stageRefs );
  
  if (pageToDownload === 'all') {
    stageRefs.forEach((stageRef) => {
      console.log('arrived at this export moment');
      if (!stageRef.current) return
      const uri = stageRef.current.toDataURL();
      return downloadURI(uri);
    })
  } else {
    const uri = stageRefs[pageToDownload].current.toDataURL()
    return downloadURI(uri);

  }


};
export const handleAddPage = (dispatch: AppDispatch) => {
  const { ADD_PAGE } = canvasPagesActions
  dispatch(ADD_PAGE())
}
export const handleDeletePage = (dispatch: AppDispatch, pageId: number) => {
  const { DELETE_PAGE } = canvasPagesActions
  const { DELETE_PAGE_FILTERS } = filtersActions
  dispatch(DELETE_PAGE_FILTERS({ pageId }))
  dispatch(DELETE_PAGE({ pageId }))
}
export const handleSelectPage = (dispatch: AppDispatch, pageId: number) => {
  const { SELECT_PAGE } = canvasPagesActions
  dispatch(SELECT_PAGE({ pageId }))
}

export const changeCanvasSize = (dispatch: AppDispatch, w: number, h: number) => {
  const { CHANGE_PAGE_SIZE } = canvasPagesActions
  dispatch(CHANGE_PAGE_SIZE({ w, h }))
}

