import React, { ChangeEvent, useEffect } from 'react'
import { canvasElemsCount } from '../../features/canvas-elements/canvasElemSlice'
import { uploadImageToCanvas } from '../../model/image-editor/Upload'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'

interface props{
  firstImage:boolean
  setActiveSidebar: React.Dispatch<React.SetStateAction<string>>
}


const UploadButtons = ({firstImage, setActiveSidebar}:props) => {
  const elementsLength = useAppSelector(canvasElemsCount).present.elements.length
  const handleUpload =  (e: React.ChangeEvent<HTMLInputElement>) =>{
    uploadImageToCanvas(e.target.files, elementsLength, dispatch)
    setActiveSidebar('Stylize')
  }
  const dispatch = useAppDispatch();
  return (
    <div className='text-white flex flex-col items-center h-[100vh] w-auto bg-gradient-to-br from-red-900/80 via-black/80 to-red-900/80'>
      <label
      htmlFor="image_input"
      className='block mb-2 text-sm text-white font-bold dark:text-gray-300 md:text-xl pt-2 '
      >
      Upload Image
      </label>
      <input className="p-4 rounded cursor-pointer  " id="image_input" 
      type="file"
      onChange={(e:ChangeEvent<HTMLInputElement>)=> handleUpload(e)}
      ></input>

    </div>
  )
}

export default UploadButtons