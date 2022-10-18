import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const FreeImageModal = ({url, open, setOpen}) => {
  return (
    <Modal
    open={open}
    onClose={(_, reason) => reason === 'backdropClick' && setOpen(false)}
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <button className='general-buttons  !p-0' onClick={() => setOpen(false)}>Close</button>
      <img
        id='modal-modal-description'
        src={url}
        width="full"
        height="full"
        alt='pizza-cliparts'
        className='rounded-2xl overflow-hidden '
      />
      <div className='flex flex-col'>
        <button className='general-buttons  !p-0' onClick={() => setOpen(false)}>Edit Picture</button>
        <button className='general-buttons  !p-0' onClick={() => setOpen(false)}>Preview</button>
        <button className='general-buttons  !p-0' onClick={() => setOpen(false)}>Download</button>

      </div>
    </Box>

  </Modal>
  )
}

export default FreeImageModal