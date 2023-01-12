import React, { ReactNode } from 'react'
import { BiBox } from 'react-icons/bi'

import { Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Box, FormControl, Select, OutlinedInput, TextField, MenuItem, InputAdornment } from '@mui/material';

interface props {
  label: string
  value: number | string | boolean | number[] | string[] 
  Icon: JSX.Element
  onChangeFunction: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  options: JSX.Element | JSX.Element[]
}

const SelectComp = ({label, value, Icon, onChangeFunction, options}: props) => {
  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { my:2,  width: 'full' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        className=' bg-gradient-to-b from-yellow-700 to-yellow-800 shadow-md shadow-black w-full hover:shadow-sm active:shadow-none transition-all duration-300 '
        id={`select-${label}`}
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
              {Icon}
            </InputAdornment>
          ),
        }}

        label={label}
        value={value}
        onChange={onChangeFunction}
      >
        {options}
      </TextField>
    </div>
  </Box>
  )
}

export default SelectComp