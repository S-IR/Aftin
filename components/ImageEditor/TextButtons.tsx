import { InputAdornment, TextField } from '@mui/material'
import React, { DOMAttributes, useState } from 'react'
import ShortTextIcon from '@mui/icons-material/ShortText';
import { canvasElemSlice } from '../../features/canvas-elements/canvasElemSlice';
import { useAppDispatch } from '../../Redux/hooks';
import { uploadCanvasText } from '../../model/image-editor/Upload';
import { Alert } from '@mui/material';
interface props {
  firstImage: boolean
}

const TextButtons = ({ firstImage }: props) => {
  const [alert, setAlert] = useState<null | string>(null)
  const dispatch = useAppDispatch()
  let alertMessage: null | string = null
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(!firstImage){
      setAlert('Add an image to the canvas before adding text')
    }
    setAlert(null)
    switch (e.target.id) {
      case 'big-text-button':
        uploadCanvasText(dispatch, undefined, undefined, undefined, 32)
        break
      case 'medium-text-button':
        uploadCanvasText(dispatch, undefined, undefined, undefined, 16)
        break
      case 'small-text-button':
        uploadCanvasText(dispatch, undefined, undefined, undefined, 12)
        break
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


    // <form className='flex flex-col'>
    //   <TextField
    //     className='mx-4 mt-2 bg-gradient-to-r from-fuchsia-300 to-blue-300 font-bold '
    //     label='Text'
    //     variant='filled'
    //     id='canvas text input'
    //     type='text'
    //     InputProps={{
    //       startAdornment: (
    //         <InputAdornment position="start">
    //           <ShortTextIcon />
    //         </InputAdornment>
    //       )
    //     }}
    //   />
    //   <TextField
    //     className='mx-4 bg-gradient-to-r from-fuchsia-300 to-blue-300 font-bold '
    //     type='number'
    //     label='Font Size'
    //     variant='filled'
    //     defaultValue="12"
    //     InputProps={{
    //       startAdornment: (
    //         <InputAdornment position="start">
    //           <MdFormatSize />
    //         </InputAdornment>
    //       )
    //     }}
    //   />
    //   <TextField
    //     className='mx-4 bg-gradient-to-r from-fuchsia-300 to-blue-300 font-bold '
    //     select
    //     label='Font Family'
    //     variant='filled'
    //     defaultValue="Calibri"
    //     InputProps={{
    //       startAdornment: (
    //         <InputAdornment position="start">
    //           <MdFontDownload />
    //         </InputAdornment>
    //       )
    //     }}
    //   />
    //   <Button text={'Insert Text'} handleOnClick={(e) => handleSubmit(e)} type='submit' />
    // </form>

  )
}

export default TextButtons