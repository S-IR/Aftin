import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import { getDownloadURL, ref } from 'firebase/storage'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import app, { storage } from '../firebase'
import { handleSubCatDownload, handleSubCatEdit } from '../model/subCat/modalButtons'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { LoginStatus } from '../typings/typings'
import Button from './Button'
import Loading from './Loading'

interface props {
  url: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  w: number
  h: number
  alt: string
  loginStatus: LoginStatus
}


const FreeImageModal: FC<props> = ({ url, open, setOpen, w, h, alt, loginStatus }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
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
          width={w}
          height={h}
          objectFit={`cover`}
          className='rounded-2xl overflow-hidden '
          alt={alt}
        />
        <div className='flex flex-col ml-4'>
          <Button className=' !p-0' handleOnClick={() => handleSubCatEdit(router, dispatch, url, w, h)} text={`Edit Picture`}></Button>
          <Button className=' !p-0' handleOnClick={() => setOpen(false)} text={`Preview`}></Button>
          <Button className=' !p-0' handleOnClick={()=>handleSubCatDownload(loginStatus, router, url, w, h ,dispatch)} text={`Download`}></Button>

        </div>

      </Box>

    </Modal>
  )
}

export default FreeImageModal