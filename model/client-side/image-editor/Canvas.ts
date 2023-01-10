import { Filter } from "konva/lib/Node"
import { Stage } from "konva/lib/Stage"
import { NextRouter } from "next/router"
import { KonvaNodeComponent, StageProps } from "react-konva"
import { canvasPagesActions } from "../../../features/canvasPages/canvas-elements/canvasPageSlice"
import { filtersActions } from "../../../features/canvasPages/canvas-elements/filtersSlice"
import { previewActions } from "../../../features/previews/previewsSlice"
import { AppDispatch } from "../../../Redux/store"


export const canvasFilters = (filters: Filter[]) => {
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
export const handleExport = (dispatch: AppDispatch, stageRefs: React.RefObject<KonvaNodeComponent<Stage, StageProps>>[], pageToDownload: number | 'all') => {
  const { SELECT_ELEMENT } = canvasPagesActions
  dispatch(SELECT_ELEMENT({pageId: null, elementId: null}) )
  console.log('pageToDownload: ', pageToDownload, 'stageRefs:', stageRefs );
  
  if (pageToDownload === 'all') {
    stageRefs.forEach((stageRef) => {
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

export const handlePreview = async (router: NextRouter, dispatch: AppDispatch, stageRef: React.RefObject<KonvaNodeComponent<Stage>>) => {
  const { SELECT_ELEMENT } = canvasPagesActions
  dispatch(SELECT_ELEMENT({pageId: null, elementId: null}) )
  if (!stageRef.current) return
  const { SET_PREVIEW_IMAGE } = previewActions
  let img = stageRef.current.toDataURL()

  dispatch(SET_PREVIEW_IMAGE(img))
  
  

  return router.push(`/previews`)

  
}