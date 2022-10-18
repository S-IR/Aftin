import React, { ChangeEvent, DragEventHandler, useCallback, useEffect } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDropzone } from 'react-dropzone';
import { uploadImage } from '../../model/image-editor/Upload';


interface props{
  firstImage:boolean
  setFirstImage: React.Dispatch<React.SetStateAction<boolean>>
  setImages: React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
}

const DropzoneComp = ({firstImage, setFirstImage, setImages}:props) => {

  const onDrop:DragEventHandler<HTMLDivElement> = useCallback((acceptedFiles:FileList | null) => {
    uploadImage(acceptedFiles, firstImage, setFirstImage, setImages)
  }, [])
  const onChange:ChangeEventHandler<HTMLInputElement> = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    uploadImage(e.target.files, firstImage, setFirstImage, setImages)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
    <div className="flex justify-center items-center w-full h-full">
      <label htmlFor="dropzone-file" className={`flex flex-col justify-center items-center w-full h-[90vh] bg-gray-800 bg-opacity-40 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer   hover:bg-gray-400 hover:opacity-50 ${isDragActive? 'bg-purple-500':''} transition-all duration-400`}>
        <div 
        {...getRootProps({
          className:"flex flex-col justify-center items-center pt-5 pb-6 h-full w-full" ,
        })}
        >
          <UploadFileIcon className='m-4  ' />
          <p className="flex flex-col text-center mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload an image</span>or drag and drop</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPEG or JPG. Anything bigger than 1550 width or 1000 height will be scaled down </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" {...getInputProps({
          id:"dropzone-file",
          type:"file",
          className:"hidden",
          onChange: onChange,
          onDrop: onDrop
        })}/>
      </label>
    </div>
  )
  }

export default DropzoneComp