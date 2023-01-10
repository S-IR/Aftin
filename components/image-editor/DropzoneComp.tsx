import React, { ChangeEvent, ChangeEventHandler, DragEventHandler, useCallback, useEffect } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { uploadImageToCanvas } from '../../model/client-side/image-editor/Upload';
import { canvasPagesCount } from '../../features/canvasPages/canvas-elements/canvasPageSlice';


interface props{
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>
  showSidebar : boolean
}

const DropzoneComp = ({ setActiveSidebar, showSidebar}:props) => {
  const dispatch = useAppDispatch();
  const pageId = useAppSelector(canvasPagesCount).present.pages.length -1


  const onDrop:DragEventHandler<HTMLDivElement> = useCallback((acceptedFiles:FileList | null) => {
    uploadImageToCanvas(dispatch, pageId, acceptedFiles)
    setActiveSidebar('Stylize')
  }, [])
  const onChange:ChangeEventHandler<HTMLInputElement> = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    uploadImageToCanvas(dispatch, pageId, e.target.files)
    setActiveSidebar('Stylize')
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
    <div className={`${showSidebar? `ml-[520px]`:  'ml-20'} flex justify-center items-center w-full h-full mt-4 transition-all duration-300 `}>
      <label htmlFor="dropzone-file" className={`flex flex-col justify-center items-center w-full h-[100vh] bg-gray-800 bg-opacity-40 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer  hover:bg-gray-400 hover:opacity-50 ${isDragActive? 'bg-purple-500':''} transition-all duration-400`}>
        <div 
        {...getRootProps({
          className:"flex flex-col justify-center items-center pt-5 pb-6 h-full w-full" ,
        })}
        >
          <UploadFileIcon className='m-4  ' />
          <p className="flex flex-col text-center mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload an image</span>or drag and drop</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPEG or JPG. Anything bigger than 1550 width or 1000 height will be scaled down </p>
        </div>
        <input {...getInputProps({
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