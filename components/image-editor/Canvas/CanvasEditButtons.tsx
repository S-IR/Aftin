import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
// import { handleAddPage, handleExport, handlePreview, handleSelectPage } from '../../../model/image-editor/Canvas'
import { KonvaNodeComponent, StageProps } from 'react-konva'
import { Stage } from 'konva/lib/Stage'
import { canvasPagesCount } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { useRouter } from 'next/router'
import { handleAddPage, handleExport, handlePreview, handleSelectPage } from '../../../model/client-side/image-editor/Canvas'

interface props {
  stageRefs: React.RefObject<KonvaNodeComponent<Stage, StageProps>>[]
  downloadRef: React.RefObject<HTMLButtonElement>

}
const CanvasEditButtons = ({ stageRefs, downloadRef }: props) => {
  const router = useRouter()
  const canvasPages = useAppSelector(canvasPagesCount)
  const dispatch = useAppDispatch()
  const pageId = useAppSelector(canvasPagesCount).present.selected?.page
  const pagesLength = useAppSelector(canvasPagesCount).present.pages.length

  
  const optionValues: number[] = []
  for (let i = 0; i < pagesLength; i++) {
    optionValues.push(i)
  }
  const w = useAppSelector(canvasPagesCount).present.w
  


  return (
    <section className={`  w-min h-[60px] bg-gradient-to-br bg-gray-600 flex  `}>
      {pageId !== null && pageId !== undefined &&
        <div className='flex align-middle justify-center items-center'>
          <InputLabel className='my-2 mx-2 text-white' id="pageId-select">{`Selected Page `}</InputLabel>
          <Select
            labelId="pageId-select"
            id="demo-simple-select"
            defaultValue={1}
            label="Age"
            value={pageId}
            className={`text-white`}
            onChange={(e) => handleSelectPage(dispatch, Number(e.target.value))}
          >
            {optionValues.map((value, index) =>
              <MenuItem key={index} value={value}>{value + 1}</MenuItem>
            )
            }
          </Select>
        </div>
      }
      <div className='grow flex space-x-20 p-5 justify-center align-middle items-center'>
        <button className='bg-gray-800 p-2 rounded-sm w-32 shadow-md font-serif hover:bg-gray-500 hover:underline hover:  transition-all duration-300 ease-in-out disabled:bg-gray-200/80 disabled:text-black/40  shadow-black active:shadow-none '
          onClick={() => handleAddPage(dispatch)}
        >Add Page
        </button>

        <button className='bg-gray-800 p-2 rounded-sm w-32 shadow-md font-serif hover:bg-gray-500 hover:underline hover:  transition-all duration-300 ease-in-out disabled:bg-gray-200/80 disabled:text-black/40  shadow-black active:shadow-none '
          ref={downloadRef}
          onClick={() => handleExport(dispatch, stageRefs, 'all')}
        >Download
        </button>
        <button className='bg-gray-800 p-2 rounded-sm w-32 shadow-md font-serif hover:bg-gray-500 hover:underline hover:  transition-all duration-300 ease-in-out disabled:bg-gray-200/80 disabled:text-black/40  shadow-black active:shadow-none '
          disabled={canvasPages.past.length === 0}
          onClick={() => dispatch(UndoActionCreators.undo())}
        >Undo
        </button>
        <button className='bg-gray-800 p-2 rounded-sm w-32 shadow-md font-serif hover:bg-gray-500 hover:underline hover:  transition-all duration-300 ease-in-out disabled:bg-gray-200/80 disabled:text-black/40  shadow-black active:shadow-none '
          disabled={canvasPages.future.length === 0}
          onClick={() => dispatch(UndoActionCreators.redo())}
        >Redo
        </button>


        <button className='bg-gray-800 p-2 rounded-sm w-32 shadow-md font-serif hover:bg-gray-500 hover:underline hover:  transition-all duration-300 ease-in-out disabled:bg-gray-200/80 disabled:text-black/40  shadow-black active:shadow-none '
          onClick={() => handlePreview(router, dispatch, stageRefs[0])}
        >Preview
        </button>
      </div>
    </section>
  )
}

export default CanvasEditButtons