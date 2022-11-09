import React, { useState } from 'react'
import { MdFindReplace, MdFontDownload, MdOutlineFontDownload, MdRotateRight } from 'react-icons/md'
import { fontFamilies } from '../../../constants/image-editor/fontFamilies'
import { textData } from '../../../features/canvas-elements/textHandlingReducer'
import { changeStrokeColor, changeStrokeWidth, handleDelete } from '../../../model/image-editor/EditCanvasElement'
import { AppDispatch } from '../../../Redux/store'
import Button from '../../Button'
import { default as MUIButton } from '@mui/material/Button';

import { Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Box, FormControl, Select, OutlinedInput, TextField, MenuItem, InputAdornment } from '@mui/material';
import { BiColorFill, BiFontSize } from 'react-icons/bi'
import { fillColors } from '../../../constants/image-editor/fillColors'
import { fontSizes } from '../../../constants/image-editor/fontSizes'
import SelectComp from '../../SelectComp'
import { color } from '../../../typings/typings'
import { FaMarsStroke } from 'react-icons/fa'
import { useAppSelector } from '../../../Redux/hooks'
import { canvasElemsCount } from '../../../features/canvas-elements/canvasElemSlice'
import { changeCanvasText, changeFontColor, changeFontFamily, changeFontSize, changeFontVariant } from '../../../model/image-editor/EditCanvasText'
import { textFilter } from '../../../features/canvas-elements/filtersSlice'


interface props {
  textData: textData
  dispatch: AppDispatch
  id : number
  textFilter : textFilter
}
const TextElementProperties = ({ textData, dispatch,id,  textFilter }: props) => {
  if (!id){
    console.log('this text element property somehow appeared without there being something selected');
    return null
  }
  const setStrokeWidth = (e) => {
    console.log(e)
  }
  const handleUpload = (e) => {
    console.log(e)

  }

  return (
    <>
      <Button className='m-3' text='Delete Component' handleOnClick={(e) => handleDelete(id, dispatch)} />
      {/* change text */}
      <TextField
        className='mt-2 bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-48 ml-2 hover:shadow-2xl transition-all duration-300 '
        InputLabelProps={{
          className: `text-white flex items-center justify-center align-middle`,
        }}
        id="select-text" label="Change Text" defaultValue={textData.text} variant="outlined" onKeyDown={(e) => {
          if(e.key === 'Enter') {
            changeCanvasText(e.target.value, id, dispatch)
          } else {
            return
          }
        } } />

      {/* Font family selector */}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            className='bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-full hover:shadow-2xl transition-all duration-300 '
            id={`select-font-family`}
            variant='filled'
            multiline={true}
            color='primary'
            fullWidth={true}
            select
            InputLabelProps={{
              className: `text-white flex items-center justify-center align-middle`,
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
            onChange={(e) => { changeFontFamily(e.target.value, id, dispatch) }}
          >
            <h3 className='font-bold pl-2'>Most common fonts</h3>
            <div className='bg-purple-400/80'>
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
        onChangeFunction={(e) => { changeFontSize(Number(e.target.value), id, dispatch) }}
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
        onChangeFunction={(e) => changeFontVariant(e.target.value, id, dispatch)}
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
        className='mt-2 bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-48 ml-2 hover:shadow-2xl transition-all duration-300 cursor-pointer ' type={'color'}
        InputLabelProps={{
          className: `text-white flex items-center justify-center align-middle`,
        }}
        id="select-color" label="Color" value={textFilter.fill} variant="outlined" onChange={(e) => changeFontColor(e.target.value, id, dispatch)} />

        {/* stroke width */}
      <TextField
        className='mt-2 bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-48 ml-2 hover:shadow-2xl transition-all duration-300 '
        InputLabelProps={{
          className: `text-white flex items-center justify-center align-middle`,
        }}
        id="select-stroke-width" label="Stroke Width" defaultValue={textData.strokeWidth} variant="outlined" onChange={(e) => changeStrokeWidth(Number(e.target.value), id, dispatch)} />

        {/* stroke color */}
      <TextField
        className='mt-2 bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-48 ml-2 hover:shadow-2xl transition-all duration-300 cursor-pointer ' type={'color'}
        InputLabelProps={{
          className: `text-white flex items-center justify-center align-middle`,
        }}
        id="select-stroke-color" label="Stroke Color" value={textFilter.filter.stroke} variant="outlined" onChange={(e) => changeStrokeColor(e.target.value, id, dispatch)} />

      <button className='bg-blue-500 bg-opacity-70 rounded-full w-32 h-10 m-1 flex align-middle hover:bg-blue-900 transition-all duration-300 '>
        <div className='flex align-middle items-center font-bold justify-center'>
          <MdFindReplace className='w-5 h-5 m-2' />
          Replace
        </div>
      </button>


      <div className='absolute top-0 right-2  bg-blue-800 bg-opacity-60 m-2 rounded-full w-60 h-12 font-bold  flex items-center justify-center shadow-md shadow-gray-500'>
        X : <p className='underline m-2'>{textData.x}</p>
        Y : <p className='underline m-2'>{textData.y}</p> |
        <MdRotateRight className='w-5 h-5 m-2' />
        <p>{textData.rotate}</p>
      </div>

    </>
  )
}

export default TextElementProperties