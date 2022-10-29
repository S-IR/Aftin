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
      '& .MuiTextField-root': { m: 1, width: '40ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        className='bg-gradient-to-r from-red-900/80 via-blue-800 to-red-900/80 shadow-lg shadow-black w-full hover:shadow-2xl transition-all duration-300 '
        id={`select-${label}`}
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