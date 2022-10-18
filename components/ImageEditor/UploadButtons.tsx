import React, { ChangeEvent, useEffect } from 'react'
import { uploadImage } from '../../model/image-editor/Upload'

interface props{
  firstImage:boolean
  setFirstImage: React.Dispatch<React.SetStateAction<boolean>>
  setImages: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
}


const UploadButtons = ({firstImage, setFirstImage, setImages}:props) => {
  return (
    <div className='text-white flex flex-col items-center'>
      <label
      htmlFor="image_input"
      className='block mb-2 text-sm text-white font-bold dark:text-gray-300 md:text-xl pt-2 '
      >
      Upload Image
      </label>
      <input className=" rounded cursor-pointer " id="image_input" 
      type="file"
      onChange={(e:ChangeEvent<HTMLInputElement>)=> uploadImage(e.target.files, firstImage, setFirstImage, setImages)}
      ></input>

    </div>
  )
}

export default UploadButtons