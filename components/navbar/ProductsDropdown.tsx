import { ShareIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import { BiPalette } from 'react-icons/bi'
import { MdBlurOff, MdDesignServices, MdHighQuality, MdWeb } from 'react-icons/md'

interface props {
  setActiveSidebar: Dispatch<SetStateAction<"ProfileDropdown" | "ProductsDropdown" | "ImagesDropdown" | "GrDesignsDropdown" | null>>
}

const ProductsDropdown = ({ setActiveSidebar }: props) => {
  return (
    <section className='bg-gradient-to-br from-orange-800 to-gray-900 p-2 absolute top-[50px] left-0 overflow-hidden  z-50 rounded-lg w-max h-auto shadow-md shadow-gray-800 flex flex-col '
      onMouseLeave={() => setActiveSidebar(null)}
    >
      <div className=' flex flex-col w-72 mx-1 items-center border-b-2 border-gray-800'>
        <p className='text-lg font-serif m-2 '>Enhance your images</p>
        {/* Edit images */}
        <Link href='/image-editor'>
          <a className='bg-black/30 w-full h-12 flex items-center rounded-lg group cursor-pointer hover:bg-black/50 transition-all duration-300 m-1'>
            <BiPalette className='w-[32px] h-[32px] group-hover:w-[40px] group-hover:h-[40px] transition-all duration-300' />
            <p className='w-auto m-2 flex-nowrap text-gray-300 font-serif font-bold   group-hover:translate-x-1 transition-all duration-300'> Edit images</p>
          </a>
        </Link>
        {/* Increase image resolution */}
        <Link href='/image-scaler'>
          <a className='bg-black/30 w-full h-12 flex items-center rounded-lg group cursor-pointer hover:bg-black/50 transition-all duration-300 m-1'>
            <MdHighQuality className='w-[32px] h-[32px] group-hover:w-[40px] group-hover:h-[40px] transition-all duration-300' />
            <p className='w-auto m-2 flex-nowrap text-gray-300 font-serif font-bold   group-hover:translate-x-1 transition-all duration-300'> Increase image resolution</p>
          </a>
        </Link>
        {/* AI based image enhancer */}
        <Link href='/image-enhancer'>
          <a className='bg-black/30 w-full h-12 flex items-center rounded-lg group cursor-pointer hover:bg-black/50 transition-all duration-300 m-1'>
            <MdBlurOff className='w-[32px] h-[32px] group-hover:w-[40px] group-hover:h-[40px] transition-all duration-300' />
            <p className='w-auto m-2 flex-nowrap text-gray-300 font-serif font-bold   group-hover:translate-x-1 transition-all duration-300'>Fix images</p>
          </a>
        </Link>
      </div>
      {/* Hire a professional */}
      <div className=' flex flex-col w-72 drop-shadow-2xl mx-1 items-center'>
        <p className='text-lg font-serif m-2 '>Hire a professional</p>
        {/* Request a graphic design */}
        <a className='bg-black/30 w-full h-12 flex items-center rounded-lg group cursor-pointer hover:bg-black/50 transition-all duration-300 m-1'>
          <MdDesignServices className='w-[32px] h-[32px] group-hover:w-[40px] group-hover:h-[40px] transition-all duration-300' />
          <p className='w-auto m-2 flex-nowrap text-gray-300 font-serif font-bold   group-hover:translate-x-1 transition-all duration-300'> Request a graphic design</p>
        </a>

        {/* Manage social media */}
        <a className='bg-black/30 w-full h-12 flex items-center rounded-lg group cursor-pointer hover:bg-black/50 transition-all duration-300 m-1'>
          <ShareIcon className='w-[32px] h-[32px] group-hover:w-[40px] group-hover:h-[40px] transition-all duration-300' />
          <p className='w-auto m-2 flex-nowrap text-gray-300 font-serif font-bold  group-hover:translate-x-1 transition-all duration-300'> Manage social media</p>
        </a>
      </div>
    </section>
  )
}

export default ProductsDropdown