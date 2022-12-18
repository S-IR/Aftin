import React from 'react'
import { BiCrop, BiFilter } from 'react-icons/bi'
import { MdFindReplace, MdRotateRight, MdTune } from 'react-icons/md'
import { canvasElemsCount } from '../../../features/canvas-elements/canvasElemSlice'
import { imageData } from '../../../features/canvas-elements/imageHandlingReducer'
import { filtersCount, imageFilter } from '../../../features/canvas-elements/filtersSlice'
import { handleDelete } from '../../../model/image-editor/EditCanvasElement'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { AppDispatch } from '../../../Redux/store'
import Button from '../../Button'
import SelectComp from '../../SelectComp'
import Filter from '../Filter'
import { handleCrop, handleResetFilters } from '../../../model/image-editor/EditCanvasImage'
import { Delete } from '@mui/icons-material'

interface props {
  imageData: imageData
  dispatch: AppDispatch
  id: number
  imageFilter: imageFilter

}


const ImageElementProperties = ({ imageData, dispatch, id, imageFilter }: props) => {

  const brightness = imageFilter?.filter.brightness
  const contrast = imageFilter?.filter.contrast
  const blur = imageFilter?.filter.blur

  if (imageData.crop) {
    return (
      <button className='mt-10 my-2 font-serif justify-center bg-gradient-to-r from--red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-full font-bold hover:bg-fuchsia-900  p-2 hover:shadow-2xl hover:text-lg transition-all duration-300 flex items-center group' onClick={() => handleCrop(id, dispatch)}>
        Save Crop
      </button>

    )
  }

  return (
    <>
      <div className='mt-4 border-b-4 border-gray-200 py-5'>
        <Filter key={'brightness'} option={brightness} label={'brightness'} id={id} />
        <Filter key={'contrast'} option={contrast} label={'contrast'} id={id} />
        <Filter key={'blur'} option={blur} label={'blur'} id={id} />
        <div className='flex items-center w-full justify-center'>
          <button className='bg-orange-500 my-6 bg-opacity-70  h-12  flex align-middle hover:bg-gray-400 transition-all duration-300 w-56 justify-center hover:text-lg items-center drop-shadow-lg shadow-gray-200' onClick={() => handleResetFilters(id, dispatch)} >Reset Filters</button>
        </div>

      </div>


      {/* Edit buttons div */}
      <div className='w-full flex items-center justify-center align-middle flex-col space-y-6 mt-6'>
        <button className=' bg-brown-900 bg-opacity-70  h-12  flex align-middle hover:bg-gray-400 transition-all duration-300 w-56 justify-center hover:text-lg items-center drop-shadow-lg shadow-gray-200' onClick={() => handleCrop(id, dispatch)}>
          <BiCrop className='w-8 h-8 group-hover:-translate-x-1 transition-all duration-300' />
          Crop
        </button>
        <button className='bg-brown-900 bg-opacity-70  h-12  flex align-middle hover:bg-gray-400 transition-all duration-300 w-56 justify-center hover:text-lg items-center drop-shadow-lg shadow-gray-200 '>
          <div className='flex align-middle items-center font-bold justify-center'>
            <MdFindReplace className='w-8 h-8 m-2' />
            Replace
          </div>
        </button>
        <div className=' flex justify-center'>
          <button className=' bg-brown-900 bg-opacity-70  h-12  flex align-middle hover:bg-gray-400 transition-all duration-300 w-56 justify-center hover:text-lg items-center drop-shadow-lg shadow-gray-200' onClick={(e) => handleDelete(id, dispatch)} >
            <Delete className='w-8 h-8 m-2' />
            Delete Component</button>
        </div>
      </div>
      {/* Crop button */}

      <div className='absolute bottom-0 left-16  bg-blue-800 bg-opacity-60 m-2 rounded-full w-60 h-12 font-bold  flex items-center justify-center shadow-md shadow-gray-500'>
        H : <p className='underline m-2'>{(imageData.height * imageData.scaleY).toFixed(0)}</p>
        W : <p className='underline m-2'>{(imageData.width * imageData.scaleX).toFixed(0)}</p> |
        <MdRotateRight className='w-5 h-5 m-2' />
        <p>{imageData.rotate}</p>
      </div>



    </>
  )
}

export default ImageElementProperties