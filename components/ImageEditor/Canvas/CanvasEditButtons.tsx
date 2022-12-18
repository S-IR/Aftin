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
    <div className=' absolute bottom-0 w-full h-[60px] bg-gradient-to-br bg-gray-600 flex space-x-20 p-5 justify-center align-middle items-center '>
    <button className='bg-gray-800 p-2 rounded-sm w-32 shadow-md font-serif hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-200/80 disabled:text-black/40  shadow-black active:shadow-none '
      ref={downloadRef}
      onClick={() => handleExport(stageRef)}
    >Download
    </button>
    <button className='bg-gray-800 p-2 rounded-sm w-32 shadow-md font-serif hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-200/80 disabled:text-black/40  shadow-black active:shadow-none '
      ref={downloadRef}
      disabled={canvasElems.past.length === 0}
      onClick={() => dispatch(UndoActionCreators.undo())}
    >Undo
    </button>
    <button className='bg-gray-800 p-2 rounded-sm w-32 shadow-md font-serif hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-200/80 disabled:text-black/40  shadow-black active:shadow-none '
      ref={downloadRef}
      disabled={canvasElems.future.length === 0}
      onClick={() => dispatch(UndoActionCreators.redo())}
    >Redo
    </button>
  </div>
  )
}

export default CanvasEditButtons