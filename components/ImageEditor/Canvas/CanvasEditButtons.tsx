import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { handleExport } from '../../../model/image-editor/Canvas'
import { KonvaNodeComponent, StageProps } from 'react-konva'
import { Stage } from 'konva/lib/Stage'
import { canvasElemsCount } from '../../../features/canvas-elements/canvasElemSlice'

interface props{
  stageRef: React.RefObject<KonvaNodeComponent<Stage, StageProps>>
  downloadRef: React.RefObject<HTMLButtonElement>

}
const CanvasEditButtons = ({stageRef, downloadRef}:props) => {
  const canvasElems = useAppSelector(canvasElemsCount)
  const dispatch = useAppDispatch()

  return (
    <div className=' absolute bottom-0 w-full h-[60px] bg-gradient-to-br from-[#4952bd] via-purple-900 to-[#4952bd] flex '>
    <button className='general-buttons '
      ref={downloadRef}
      onClick={() => handleExport(stageRef)}
    >Download
    </button>
    <button className='general-buttons '
      ref={downloadRef}
      disabled={canvasElems.past.length === 0}
      onClick={() => dispatch(UndoActionCreators.undo())}
    >Undo
    </button>
    <button className='general-buttons '
      ref={downloadRef}
      disabled={canvasElems.future.length === 0}
      onClick={() => dispatch(UndoActionCreators.redo())}
    >Redo
    </button>
  </div>
  )
}

export default CanvasEditButtons