import React, { useState } from 'react'
import { MdFindReplace, MdFontDownload, MdOutlineFontDownload, MdRotateRight } from 'react-icons/md'
import { fontFamilies } from '../../../constants/image-editor/fontFamilies'
import { textData } from '../../../features/canvasPages/canvas-elements/textHandlingReducer'
import { changeStrokeColor, changeStrokeWidth, handleDelete } from '../../../model/client-side/image-editor/EditCanvasElement'
import { AppDispatch } from '../../../Redux/store'
import Button from '../../general/Button'
import { default as MUIButton } from '@mui/material/Button';

import { Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Box, FormControl, Select, OutlinedInput, TextField, MenuItem, InputAdornment } from '@mui/material';
import { BiColorFill, BiFontSize } from 'react-icons/bi'
import { fillColors } from '../../../constants/image-editor/fillColors'
import { fontSizes } from '../../../constants/image-editor/fontSizes'

import { changeCanvasText, changeFontColor, changeFontFamily, changeFontSize, changeFontVariant } from '../../../model/client-side/image-editor/EditCanvasText'
import { textFilter } from '../../../features/canvasPages/canvas-elements/filtersSlice'
import { canvasSelected } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'
import SelectComp from '../../general/SelectComp'


interface props {
  textData: textData
  dispatch: AppDispatch
  selected: canvasSelected
  textFilter: textFilter
}
const TextElementProperties = ({ textData, dispatch, selected, textFilter }: props) => {

  const { page: pageId, element: elementId } = selected as { page: number, element: number }



  return (
    <>
      {/* change text */}
      <TextField
        className=' bg-gradient-to-b from-yellow-700 to-yellow-800 w-full shadow-md cursor-pointer shadow-black   hover:shadow-sm active:shadow-none  transition-all duration-300 mb-2 mt-6 '

        InputLabelProps={{
          className: `text-black flex items-center justify-center align-middle italic mt-3`,
        }}
        id="select-text" label="Change Text" defaultValue={textData.text} variant="outlined" onKeyDown={(e) => {
          if (e.key === 'Enter') {
            changeCanvasText(dispatch, pageId, elementId, e.target.value)
          } else {
            return
          }
        }} />

      {/* Font family selector */}
      {/* I cannot refactor this as a select component due to the fact that I need to separate the list of options in two  */}

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { my: 2, width: 'full' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            className=' bg-gradient-to-b from-yellow-700 to-yellow-800 shadow-md cursor-pointer shadow-black w-full hover:shadow-sm active:shadow-none  transition-all duration-300 '
            id={`select-font-family`}
            variant='filled'
            multiline={true}
            color='primary'
            fullWidth={true}
            select
            InputLabelProps={{
              className: `text-black flex items-center justify-center align-middle italic`,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {<MdFontDownload className='w-4 h-4 mb-4' />}
                </InputAdornment>
              ),
            }}

            label={'Font Family'}
            value={textData.fontFamily}
            onChange={(e) => { changeFontFamily(dispatch, pageId, elementId, e.target.value) }}
          >
            <h3 className='font-bold pl-2'>Most common fonts</h3>
            <div className='bg-yellow-300'>
              <MenuItem value='Arial' >Arial</MenuItem>
              <MenuItem value='Basketville' ><p className='font-[Basketville]'  >Basketville</p></MenuItem>
              <MenuItem value='Calibri' ><p className='font-[Calibri]'  >Calibri</p></MenuItem>
              <MenuItem value='Helvetica' ><p className='font-[Helvetica]'  >Helvetica</p></MenuItem>
              <MenuItem value='Lavenda' ><p className='font-[Lavenda]'  >Lavenda</p></MenuItem>
              <MenuItem value='Times_New_Roman' ><p className='font-[Times_New_Roman]'  >Times New Roman</p></MenuItem>

            </div>
            <h3 className='font-bold pl-2'>All fonts</h3>

            {fontFamilies.map((font: string) => (
              <MenuItem key={font} value={font} ><p className={`font-['${font.replace(' ', '_')}']`}>{font}</p></MenuItem>
            ))}
          </TextField>
        </div>
      </Box>

      {/* Font size selector */}
      <SelectComp
        label='Font Size'
        Icon={<BiFontSize className='w-4 h-4 mb-4' />}
        onChangeFunction={(e) => { changeFontSize(dispatch, pageId, elementId, Number(e.target.value),) }}
        value={textData.fontSize}
        options={
          fontSizes.map((size: number) => (
            <MenuItem key={size} value={size} ><p>{size}</p></MenuItem>
          ))
        }
      />

      {/* Font variant selector */}
      <SelectComp
        label='Font Variant'
        Icon={<BiFontSize className='w-4 h-4 mb-4' />}
        onChangeFunction={(e) => changeFontVariant(dispatch, pageId, elementId, e.target.value)}
        value={textData.fontVariant}
        options={
          [<MenuItem key={'normal'} value={'normal'} ><p>{'normal'}</p></MenuItem>,
          <MenuItem key={'italic'} value={'italic'} ><p>{'italic'}</p></MenuItem>,
          <MenuItem key={'bold'} value={'bold'} ><p>{'bold'}</p></MenuItem>,
          <MenuItem key={'italic bold'} value={'italic bold'} ><p>{'italic bold'}</p></MenuItem>]


        }
      />

      {/* Color picker */}
      <TextField
        className='my-2 bg-gradient-to-b from-yellow-700 to-yellow-800 w-full shadow-md cursor-pointer shadow-black   hover:shadow-sm active:shadow-none  transition-all duration-300  ' type={'color'}
        InputLabelProps={{
          className: `text-black flex items-center justify-center align-middle italic mt-3`,
        }}
        id="select-color" label="Color" value={textFilter.fill} variant="outlined" onChange={(e) => changeFontColor(dispatch, pageId, elementId, e.target.value as `#${string}`)} />

      {/* stroke width */}
      <TextField
        className='my-2 bg-gradient-to-b from-yellow-700 to-yellow-800 w-full shadow-md cursor-pointer shadow-black hover:shadow-sm active:shadow-none  transition-all duration-300 '
        InputLabelProps={{
          className: `text-black flex items-center justify-center align-middle italic mt-3`,
        }}
        id="select-stroke-width" label="Stroke Width" defaultValue={textData.strokeWidth} variant="outlined" onChange={(e) => changeStrokeWidth(dispatch, pageId, elementId, Number(e.target.value))} />

      {/* stroke color */}
      <TextField
        className='my-2 bg-gradient-to-b from-yellow-700 to-yellow-800 w-full shadow-md cursor-pointer shadow-black   hover:shadow-sm active:shadow-none  transition-all duration-300  ' type={'color'}
        InputLabelProps={{
          className: `text-black flex  items-center justify-center align-middle italic mt-3`,
        }}
        id="select-stroke-color" label="Stroke Color" value={textFilter.filter.stroke} variant="outlined" onChange={(e) => changeStrokeColor(dispatch, pageId, elementId, e.target.value as `#${string}`)} />
      <div className='flex items-center justify-center align-middle '>
        <Button className='m-3' text={
          <div className='flex align-middle items-center font-bold justify-center  '>
            <MdFindReplace className='w-6 h-6' />
            Replace
          </div>
        }
          handleOnClick={(e) => handleDelete(dispatch, pageId, elementId)}
        />

        <Button className='m-3 font-bold' text='Delete Component' handleOnClick={(e) => handleDelete(dispatch, pageId, elementId)} />
      </div>




    </>
  )
}

export default TextElementProperties