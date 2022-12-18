import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { uploadShapeToCanvas } from '../../model/image-editor/Upload';
import { canvasElemsCount } from '../../features/canvas-elements/canvasElemSlice';

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<string>>
}
const 





DrawButtons = ({ setActiveSidebar }: props) => {
  const isTheCanvasEmpty = useAppSelector(canvasElemsCount).present.elements.length === 0

  const [alert, setAlert] = useState<null | string>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setAlert(null)
  }, [useAppSelector(canvasElemsCount).present.length])


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isTheCanvasEmpty) return setAlert('Add an image to the canvas before adding text')
    setAlert(null)
    switch (e.target.id) {
      case 'circle-button':
        uploadShapeToCanvas(dispatch, { shape: 'Circle' })
        return setActiveSidebar('Stylize')
      case 'square-button':
        uploadShapeToCanvas(dispatch, { shape: 'Rect' })
        return setActiveSidebar('Stylize')
      case 'rectangle-button':
        uploadShapeToCanvas(dispatch, { shape: 'Rect', width: 150, height: 75 })
        return setActiveSidebar('Stylize')
    }
  }


  return (
    <section className='flex flex-col items-center bg-gradient-to-br bg-gray-400 h-full w-52 py-10 space-y-5'>
      <button id=' circle-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-20 !h-20  hover:bg-gray-700 text-white !rounded-full shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a circle
      </button>
      <button id=' square-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-20 !h-20  hover:bg-gray-700 text-white rounded-sm shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a square
      </button>
      <button id=' rectangle-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-32 !h-16  hover:bg-gray-700 text-white rounded-sm shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add rectangle
      </button>
      {alert !== null ? <Alert severity='error'>{alert}</Alert> : <></>}
    </section>
  )
}

export default DrawButtons