import React, { ChangeEvent, useEffect } from 'react'
import { uploadImageToCanvas } from '../../model/image-editor/Upload'
import { useAppDispatch } from '../../Redux/hooks'

interface props{
  firstImage:boolean
  setFirstImage: React.Dispatch<React.SetStateAction<boolean>>
}


const UploadButtons = ({firstImage, setFirstImage}:props) => {
  const dispatch = useAppDispatch();
  return (
    <div className='text-white flex flex-col items-center'>
      <label
      htmlFor="image_input"
      className='block mb-2 text-sm text-white font-bold dark:text-gray-300 md:text-xl pt-2 '
      >
      Upload Image
      </label>
      <input className=" rounded cursor-pointer  " id="image_input" 
      type="file"
      onChange={(e:ChangeEvent<HTMLInputElement>)=> uploadImageToCanvas(e.target.files, firstImage, setFirstImage, dispatch)}
      ></input>

    </div>
  )
}

export default UploadButtons