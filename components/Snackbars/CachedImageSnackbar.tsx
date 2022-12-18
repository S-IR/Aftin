import { LockClosedIcon, XIcon } from '@heroicons/react/solid'
import { IconButton, Snackbar, SnackbarContent, Tooltip } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdOutlineImage } from 'react-icons/md'
import { cachedImage, cachedImageActions } from '../../features/cachedImage/cachedImageSlice'
import { useAppDispatch } from '../../Redux/hooks'
import Button from '../Button'

interface props {
  cachedImage: cachedImage | null
}

const CachedImageSnackbar = ({ cachedImage }: props) => {
  const [previewImage, setPreviewImage] = useState(false)
  const dispatch = useAppDispatch()

  const onClose = () => {
    const {CLEAR_CACHED_IMAGE} = cachedImageActions
    dispatch(CLEAR_CACHED_IMAGE())
  }
  return (
    <Snackbar
      open={!!cachedImage}
    >
      <SnackbarContent
        message={
          <div className='flex relative flex-col' >
            <div className='flex items-center justify-center align-middle space-x-2'>
              <span className=' text-lg font-sans text-red-500 '>Do you still want to use the image that you clicked on before logging in?</span>
            </div>

            <div className='flex'>
              <Tooltip
                placement='top-end'
                title={
                  <div className='w-auto h-auto'>
                    <Image
                      src={cachedImage?.url as string}
                      width={cachedImage?.w}
                      height={cachedImage?.h}
                      alt={`preview of an image`}
                    />
                  </div>
                }
              >
                <button className='bg-gradient-to-br from-orange-400 via-red-300 to-orange-400 rounded w-32 h-8'>
                  See image again</button>
              </Tooltip>

            </div>


          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <XIcon color='red' width={32} height={32} />
          </IconButton>
        ]}


      />
    </Snackbar>
  )
}

export default CachedImageSnackbar