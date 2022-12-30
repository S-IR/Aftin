import { Popover } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react'
import { previewCategoryType, previewCategoryValue } from '../../constants/previews/previewCategories'
import DigitalOptions from './DigitalOptions';
import PhysicalOptions from './PhysicalOptions';


interface props {
  selectedCategory: { name: string, value: string }
  setSelectedCategory: React.Dispatch<React.SetStateAction<{
    name: string;
    value: previewCategoryValue;
  }>>


}

const ChoosePreview = ({ selectedCategory, setSelectedCategory }: props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);



  return (
    <section className='w-32 md:w-56 py-2 mb-2 h-full flex flex-col px-10 space-y-10 pt-20  bg-gray-900/50 '>

      {/* PUT A LOGO UP THERE */}
      <button id={'digital-button'} onClick={(e) => setAnchorEl(e.currentTarget)} className=' text-gray-300   rounded-md font-serif  text-md w-full  hover:bg-gray-700 transition-all duration-300 font-bold'>Digital  Backgrounds</button>
      <button id={'physical-button'} onClick={(e) => setAnchorEl(e.currentTarget)} className=' text-gray-300   rounded-md font-serif  text-md w-full  hover:bg-gray-700 transition-all duration-300 font-bold'>Physical Backgrounds</button>
      <PhysicalOptions open={anchorEl?.id === 'physical-button'} anchorEl={anchorEl} setAnchorEl={setAnchorEl} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <DigitalOptions open={anchorEl?.id === 'digital-button'} anchorEl={anchorEl} setAnchorEl={setAnchorEl} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

    </section>
  )
}

export default ChoosePreview
