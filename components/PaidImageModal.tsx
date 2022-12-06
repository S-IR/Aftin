import { Box, Dialog, DialogTitle, Modal } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'
import { PhotographIcon, CakeIcon, PencilIcon, DeviceMobileIcon, VariableIcon } from '@heroicons/react/solid'
import { AiFillEdit } from 'react-icons/ai';


interface props {
  open: boolean
  setOpen: React.SetStateAction<boolean>
}

const PaidImageModal: FC<props> = ({ open, setOpen }) => {
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick') return setOpen(false) }}
      maxWidth="lg"
    >
      <div className='flex rounded-3xl p-4 '>
        <div className='flex flex-col w-full text-center w-[300px]'>
          <h2 className='my-2 mx-2 bold text-3xl text-fuchsia-800'>Try Aftin Premium for <span className='underline'>Free</span></h2>
          <p>
            Get this image alongside our exquisite collection of images, banners, logos and more
          </p>
          <p className='text-bold text-1xl mt-4'>Here is what you will get :</p>
          <ul className='flex flex-col'>
            <li className='flex align-top items-center'>
              <PencilIcon className='w-32 h-32 ' />
              <p>Hundreds of templates of banners, artworks, etc. that are made to stand out</p>
            </li>
            <li className='flex align-top items-center'>
              <PhotographIcon className='w-32 h-32 ' />
              <p>Thousands of stock images that are made to fit your marketing needs</p>
            </li>
            <li className='flex align-top items-center'>
              <AiFillEdit className='w-32 h-32 ' />
              <p>Thousands of stock images that are made to fit your marketing needs</p>
            </li>

          </ul>
        </div>

        <Image
          src="/frontend-used-images/paidModalPoppup.png"
          width={1024}
          height={1024}
          
          alt="Paid dialogue box image poppup"
        />

      </div>

    </Dialog>
  )
}

export default PaidImageModal