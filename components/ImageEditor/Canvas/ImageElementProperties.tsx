import React from 'react'
import { BiCrop, BiFilter } from 'react-icons/bi'
import { MdFindReplace, MdRotateRight, MdTune } from 'react-icons/md'
import { imageData } from '../../../features/canvasPages/canvas-elements/imageHandlingReducer'
import { filtersCount, imageFilter } from '../../../features/canvasPages/canvas-elements/filtersSlice'
import { handleDelete } from '../../../model/image-editor/EditCanvasElement'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { AppDispatch } from '../../../Redux/store'
import Button from '../../Button'
import SelectComp from '../../SelectComp'
import { handleCrop, handleResetFilters } from '../../../model/image-editor/EditCanvasImage'
import { Delete } from '@mui/icons-material'
import { Filter } from '../Sidebar'
import { canvasSelected } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'

interface props {
  imageData: imageData
  dispatch: AppDispatch
  selected: canvasSelected
  imageFilter: imageFilter
}


const ImageElementProperties = ({ imageData, dispatch, selected, imageFilter }: props) => {
  const {page : pageId , element: elementId} = selected

  const brightness = imageFilter?.filter.brightness
  const contrast = imageFilter?.filter.contrast
  const blur = imageFilter?.filter.blur

  if (imageData.crop) {
    return (
      <button className='mt-10 my-2 font-serif justify-center bg-gradient-to-r from--red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-full font-bold hover:bg-fuchsia-900  p-2 hover:shadow-2xl hover:text-lg transition-all duration-300 flex items-center group' onClick={() => handleCrop(dispatch, pageId as number, elementId as number)}>
        Save Crop
      </button>

    )
  }
  if(pageId === null || elementId === null) {
    console.log('there is no selected image or page for the filter component');
    return<></>
    
  }

  return (
    <>
      <div className='mt-4 border-b-4 border-gray-200 py-5 w-full'>
        <Filter key={'brightness'} option={brightness} label={'brightness'} pageId={pageId} elementId={elementId}/>
        <Filter key={'contrast'} option={contrast} label={'contrast'} pageId={pageId} elementId={elementId}/>
        <Filter key={'blur'} option={blur} label={'blur'} pageId={pageId} elementId={elementId}/>
        <div className='flex items-center w-full justify-center'>
          <button className='bg-orange-500 my-6 bg-opacity-70  h-12  flex align-middle hover:bg-gray-400 transition-all duration-300 w-56 justify-center hover:text-lg items-center drop-shadow-lg shadow-gray-200' onClick={() => handleResetFilters(dispatch, pageId , elementId )} >Reset Filters</button>
        </div>

      </div>


      {/* Edit buttons div */}
      <div className='w-full flex items-center justify-center align-middle flex-col space-y-6 mt-6'>
        <button className=' bg-brown-900 bg-opacity-70  h-12  flex align-middle hover:bg-gray-400 transition-all duration-300 w-56 justify-center hover:text-lg items-center drop-shadow-lg shadow-gray-200' onClick={() => handleCrop(dispatch, pageId , elementId )}>
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
          <button className=' bg-brown-900 bg-opacity-70  h-12  flex align-middle hover:bg-gray-400 transition-all duration-300 w-56 justify-center hover:text-lg items-center drop-shadow-lg shadow-gray-200' onClick={(e) => handleDelete(dispatch, pageId , elementId )} >
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