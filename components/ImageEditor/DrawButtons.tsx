import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { uploadShapeToCanvas } from '../../model/image-editor/Upload';
import { canvasElemsCount } from '../../features/canvas-elements/canvasElemSlice';

interface props {
}
const DrawButtons = ({}: props) => {
  const isTheCanvasEmpty = useAppSelector(canvasElemsCount).present.length === 0

  const [alert, setAlert] = useState<null | string>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setAlert(null)  
  }, [useAppSelector(canvasElemsCount).present.length])
  

  
  

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(isTheCanvasEmpty) return setAlert('Add an image to the canvas before adding text')
    setAlert(null)
    switch (e.target.id) {
      case 'circle-button':
        return uploadShapeToCanvas(dispatch, 'Circle')
      case 'square-button':
        return uploadShapeToCanvas(dispatch, 'Rect' )
      case 'rectangle-button':
        return uploadShapeToCanvas(dispatch, 'Rect', 150, 75)
    }
  }


  return (
    <section className='flex flex-col items-center'>
      <button id='circle-button' onClick={(e) => handleClick(e)} className="general-buttons !w-20 !h-20 bg-gray-500 hover:bg-gray-900 text-white !rounded-full shadow-lg !shadow-blue-500 !hover:shadow-red-500 transition-all duration-300 !text-md">Add a circle
      </button>
      <button id='square-button' onClick={(e) => handleClick(e)} className="general-buttons !w-20 !h-20 bg-gray-500 hover:bg-gray-900 text-white rounded-xl shadow-md !shadow-blue-500 !hover:shadow-red-500 transition-all duration-300 !text-md">Add a square
      </button>
      <button id='rectangle-button' onClick={(e) => handleClick(e)} className="general-buttons !w-32 !h-16 bg-gray-500 hover:bg-gray-900 text-white rounded-xl shadow-lg !shadow-blue-500 !hover:shadow-red-500 transition-all duration-300 !text-md">Add rectangle
      </button>
      {alert !== null? <Alert severity='error'>{alert}</Alert> : <></>}
    </section>
  )
}

export default DrawButtons