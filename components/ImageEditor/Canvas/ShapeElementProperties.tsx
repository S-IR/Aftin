import React, { ChangeEvent } from 'react'
import { MdFindReplace } from 'react-icons/md'
import { shapeData } from '../../../features/canvasPages/canvas-elements/shapeHandlingReducer'
import { AppDispatch } from '../../../Redux/store'
import Button from '../../Button'

import { Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Box, FormControl, Select, OutlinedInput, TextField, MenuItem, InputAdornment } from '@mui/material';
import { changeStrokeColor, handleDelete } from '../../../model/image-editor/EditCanvasElement'
import { useAppSelector } from '../../../Redux/hooks'
import { changeShapeFill, fillWithPattern, setStrokeWidth } from '../../../model/image-editor/EditCanvasShape'
import { shapeFilter } from '../../../features/canvasPages/canvas-elements/filtersSlice'
import { handleRemovePattern } from '../../../model/image-editor/EditCanvasImage'
import { canvasPagesCount, canvasSelected } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'


interface props {
  shapeData: shapeData
  dispatch: AppDispatch
  selected : canvasSelected
  shapeFilter: shapeFilter
}






const ShapeElementProperties = ({ shapeData, dispatch, selected,  shapeFilter }: props) => {
  const {page: pageId, element: elementId} = selected
  
  
  if (pageId === null || elementId === null) {
    console.log('this shape element property somehow appeared without there being something selected');
    return null
  }
  return (
    <>
      {/* Delete button */}
      <Button className='m-3' text='Delete Component' handleOnClick={(e) => handleDelete(dispatch, pageId, elementId)} />
      {/* Color Fill */}
      <TextField
        className='mt-2 bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-48 ml-2 hover:shadow-2xl transition-all duration-300 cursor-pointer ' type={'color'}
        InputLabelProps={{
          className: `text-white flex items-center justify-center align-middle`,
        }}
        id="select-stroke-width" label="Color" value={shapeFilter.filter.fill} variant="outlined" onChange={(e) => changeShapeFill(dispatch, pageId, elementId, e.target.value as `#${string}`)} />

      {/* Stroke width */}
      <TextField
        className='mt-5 bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-80 ml-2 hover:shadow-2xl transition-all duration-300'
        InputLabelProps={{
          className: `text-white font-bold flex items-center justify-center align-middle`,
        }}
        id="select-stroke-width" label="Stroke Width" value={shapeData.strokeWidth} variant="outlined" onChange={(e) => setStrokeWidth(dispatch, pageId, elementId, Number(e.target.value))} />

      {/* Stroke color */}
      <TextField
        className='mt-5 bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-80 ml-2 hover:shadow-2xl transition-all duration-300'
        InputLabelProps={{
          className: `text-white font-bold flex items-center justify-center align-middle`,
        }}
        type="color"
        id="select-stroke-width" label="Stroke Color" defaultValue={shapeFilter.filter.stroke} variant="outlined" onChange={(e) => changeStrokeColor(dispatch, pageId, elementId, e.target.value as `#${string}`)} />

      {/* image pattern         */}
      <TextField
        className='p-8 mt-5 bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-80 ml-2 hover:shadow-2xl transition-all duration-300'
        InputLabelProps={{
          className: ` text-white font-bold flex items-center justify-center align-middle`,
        }}
        type="file"
        id="select-stroke-width" label="Fill with an image pattern" variant="outlined" onChange={(e: ChangeEvent<HTMLInputElement>) => fillWithPattern(dispatch, pageId, elementId, e.target.files)} />

      {/* remove image pattern */}

      <Button className='m-3' text='Remove Pattern image' handleOnClick={(e) => handleRemovePattern(dispatch, pageId, elementId)} />

      <button className='bg-blue-500 bg-opacity-70 rounded-full w-32 h-10 m-1 flex align-middle hover:bg-blue-900 transition-all duration-300 mt-2 '>
        <div className='flex align-middle items-center font-bold justify-center'>
          <MdFindReplace className='w-5 h-5 m-2' />
          Replace
        </div>
      </button>
    </>
  )
}

export default ShapeElementProperties