import { InputAdornment, TextField } from '@mui/material'
import React, { DOMAttributes, useEffect, useState } from 'react'
import ShortTextIcon from '@mui/icons-material/ShortText';
import { canvasElemsCount, canvasElemSlice } from '../../features/canvas-elements/canvasElemSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';

import { Alert } from '@mui/material';
import { uploadTextToCanvas } from '../../model/image-editor/Upload';
interface props {
}

const TextButtons = ({  }: props) => {
  const [alert, setAlert] = useState<null | string>(null)
  const dispatch = useAppDispatch()
  const isTheCanvasEmpty = useAppSelector(canvasElemsCount).present.length === 0
  useEffect(() => {
    setAlert(null)
  }, [useAppSelector(canvasElemsCount).present.length])
  

  //TODO
  let alertMessage: null | string = null
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(isTheCanvasEmpty) return setAlert('Add an image to the canvas before adding text')
    setAlert(null)
    switch (e.target.id) {
      case 'big-text-button':
        return uploadTextToCanvas(dispatch, undefined, undefined, undefined, 32)
      case 'medium-text-button':
        uploadTextToCanvas(dispatch, undefined, undefined, undefined,16)
      case 'small-text-button':
        return uploadTextToCanvas(dispatch, undefined, undefined, undefined, 12)
    }
  }
  return (
    <section className='flex flex-col items-center'>
      <button id='big-text-button' onClick={(e) => handleClick(e)} className="general-buttons !w-56 !h-16 bg-gray-500 hover:bg-gray-900 text-white rounded-xl shadow-lg !shadow-blue-500 !hover:shadow-red-500 transition-all duration-300 !text-lg">Add a Heading!
      </button>
      <button id='medium-text-button' onClick={(e) => handleClick(e)} className="general-buttons !w-56 !h-16 bg-gray-500 hover:bg-gray-900 text-white rounded-xl shadow-lg !shadow-blue-500 !hover:shadow-red-500 transition-all duration-300 !text-md">Add a medium-sized text
      </button>
      <button id='small-text-button' onClick={(e) => handleClick(e)} className="general-buttons !w-56 !h-16 bg-gray-500 hover:bg-gray-900 text-white rounded-xl shadow-lg !shadow-blue-500 !hover:shadow-red-500 transition-all duration-300 !text-sm">Add a small text
      </button>
      {alert !== null? <Alert severity='error'>{alert}</Alert> : <></>}
    </section>

  )
}

export default TextButtons