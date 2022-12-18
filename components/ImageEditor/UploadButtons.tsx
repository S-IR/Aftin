import React, { ChangeEvent, useEffect } from 'react'
import { canvasElemsCount } from '../../features/canvas-elements/canvasElemSlice'
import { uploadImageToCanvas } from '../../model/image-editor/Upload'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'

interface props{





  setActiveSidebar: React.Dispatch<React.SetStateAction<string>>
}


const UploadButtons = ({ setActiveSidebar}:props) => {
  const elementsLength = useAppSelector(canvasElemsCount).present.elements.length
  const handleUpload =  (e: React.ChangeEvent<HTMLInputElement>) =>{
    uploadImageToCanvas(e.target.files, elementsLength, dispatch)
    setActiveSidebar('Stylize')
  }
  const dispatch = useAppDispatch();
  return (
    <div className='text-white flex flex-col pt-10 items-center h-[100vh] w-auto bg-gradient-to-br bg-white drop-shadow-xl shadow-white'>
      <label
      htmlFor="image_input"
      className='block mb-2 text-4xl text-black font-serif font-[800] dark:text-gray-300 md:text-xl pt-2 '
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