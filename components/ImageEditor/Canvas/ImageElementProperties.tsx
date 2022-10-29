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
import { handleResetFilters } from '../../../model/image-editor/EditCanvasImage'

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



  return (
    <>
      <div className='mt-4'>
        <Filter key={'brightness'} option={brightness} label={'brightness'} id={id} />
        <Filter key={'contrast'} option={contrast} label={'contrast'} id={id} />
        <Filter key={'blur'} option={blur} label={'blur'} id={id} />
      </div>
      <div className='flex items-center w-full justify-center'>
        <Button className='m-5' text='Reset Filters' handleOnClick={() => handleResetFilters(id, dispatch)} />
      </div>
      <button className='my-2 font-serif justify-center  bg-gradient-to-r from--red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-full font-bold hover:bg-fuchsia-900  p-2 hover:shadow-2xl hover:text-lg transition-all duration-300 flex items-center group'>
        <MdTune className='w-8 h-8 group-hover:-translate-x-1 transition-all duration-300' />
        Filters
      </button>
      <button className='my-2 font-serif justify-center bg-gradient-to-r from--red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-full font-bold hover:bg-fuchsia-900  p-2 hover:shadow-2xl hover:text-lg transition-all duration-300 flex items-center group'>
        <BiCrop className='w-8 h-8 group-hover:-translate-x-1 transition-all duration-300' />
        Crop
      </button>
      <button className='bg-blue-500 bg-opacity-70 rounded-full h-10 m-1 flex align-middle hover:bg-blue-900 transition-all duration-300 w-full justify-center hover:text-lg items-center '>
        <div className='flex align-middle items-center font-bold justify-center'>
          <MdFindReplace className='w-5 h-5 m-2' />
          Replace
        </div>
      </button>
      <div className='absolute bottom-0 left-16  bg-blue-800 bg-opacity-60 m-2 rounded-full w-60 h-12 font-bold  flex items-center justify-center shadow-md shadow-gray-500'>
        H : <p className='underline m-2'>{(imageData.height * imageData.scaleY).toFixed(0)}</p>
        W : <p className='underline m-2'>{(imageData.width * imageData.scaleX).toFixed(0)}</p> |
        <MdRotateRight className='w-5 h-5 m-2' />
        <p>{imageData.rotate}</p>
      </div>
      <Button className='m-5' text='Delete Component' handleOnClick={(e) => handleDelete(id, dispatch)} />

    </>
  )
}

export default ImageElementProperties