import { InputAdornment, TextField } from '@mui/material'
import React, { DOMAttributes, useEffect, useState } from 'react'
import ShortTextIcon from '@mui/icons-material/ShortText';

import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { uploadTextToCanvas } from '../../../model/image-editor/Upload';
import { canvasPagesCount } from '../../../features/canvasPages/canvas-elements/canvasPageSlice';
import { activeSidebarType } from '../../../pages/image-editor';
interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>
}

const TextButtons = ({ setActiveSidebar }: props) => {
  const [alert, setAlert] = useState<null | string>(null)
  const dispatch = useAppDispatch()
  const {pages, selected} = useAppSelector(canvasPagesCount).present
  const isTheCanvasEmpty = pages.length === 1 && pages[0].length < 1
  
  console.log('pagesLen:', pages.length, 'pages[0]Len:', pages[0].length);
  
  
  const selectedPage = selected?.page as number

  useEffect(() => {
    setAlert(null)
  }, [useAppSelector(canvasPagesCount).present.pages[0].length])
  

  //TODO
  let alertMessage: null | string = null
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(isTheCanvasEmpty) return setAlert('Add an image to the canvas before adding text')
    setAlert(null)
    switch (e.target.id) {
      case 'big-text-button':
        uploadTextToCanvas(dispatch,  selectedPage, {fontSize: 32})
        return setActiveSidebar('Stylize')
      case 'medium-text-button':
        uploadTextToCanvas(dispatch, selectedPage,  {fontSize: 16})
        return setActiveSidebar('Stylize')
      case 'small-text-button':
         uploadTextToCanvas(dispatch, selectedPage,  {fontSize: 12})
        return setActiveSidebar('Stylize')
    }
  }
  return (
    <section className='flex flex-col items-center h-[100vh] w-64 bg-gradient-to-br bg-white'>
      <button id='big-text-button' onClick={(e) => handleClick(e)} className="general-buttons !w-56 !h-16 bg-gray-500 hover:bg-gray-900 text-white rounded-xl shadow-lg !shadow-gray-500 !hover:shadow-red-500 transition-all duration-300 !text-lg !my-10">Add a Heading!
      </button>
      <button id='medium-text-button' onClick={(e) => handleClick(e)} className="general-buttons !w-56 !h-16 bg-gray-500 hover:bg-gray-900 text-white rounded-xl shadow-lg !shadow-gray-500 !hover:shadow-red-500 transition-all duration-300 !text-md !my-10">Add a medium-sized text
      </button>
      <button id='small-text-button' onClick={(e) => handleClick(e)} className="general-buttons !w-56 !h-16 bg-gray-500 hover:bg-gray-900 text-white rounded-xl shadow-lg !shadow-gray-500 !hover:shadow-red-500 transition-all duration-300 !text-sm !my-10">Add a small text
      </button>
      {alert !== null? <Alert severity='error'>{alert}</Alert> : <></>}
    </section>

  )
}

export default TextButtons