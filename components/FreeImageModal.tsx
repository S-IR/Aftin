import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import React, { FC } from 'react'


interface props {
  url : string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  width: number
  height: number
  alt: string
}


const FreeImageModal: FC<props> = ({url, open, setOpen, width, height, alt}) => {

  return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    sx={{
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`
    }}
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: `auto`,
        height: `auto`
      }}
    >
      <button className='general-buttons  !p-0 justify-center' onClick={() => setOpen(false)}>Close</button>
      <Image
        id='modal-modal-description'
        src={url}
        width={width}
        height={height}
        objectFit={`cover`}
        className='rounded-2xl overflow-hidden '
        alt={alt}
      />
      <div className='flex flex-col ml-4'>
        <button className='general-buttons  !p-0' onClick={() => setOpen(false)}>Edit Picture</button>
        <button className='general-buttons  !p-0' onClick={() => setOpen(false)}>Preview</button>
        <button className='general-buttons  !p-0' onClick={() => setOpen(false)}>Download</button>

      </div>
    </Box>

  </Modal>
  )
}

export default FreeImageModal