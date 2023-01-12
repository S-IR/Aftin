import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'
import { NavbarImageLink, StockImageLinks } from '../../constants/imageCategories'
import NavbarImageCategory from './NavbarImageCategory'


interface props {
  setActiveSidebar: Dispatch<SetStateAction<"ProfileDropdown" | "ProductsDropdown" | "ImagesDropdown" | "GrDesignsDropdown" | null>>
}
const StockImagesDropdown = ({setActiveSidebar}: props) => {
  return (
    <section className='bg-gradient-to-br from-orange-800 to-gray-900 p-2 absolute top-[50px] -left-10  overflow-hidden z-50 rounded-lg w-max h-auto shadow-md shadow-gray-800  '
    onMouseLeave={() => setActiveSidebar(null)}
    >
      <div className='grid grid-cols-3'>
        {StockImageLinks.map((StockImageLink: NavbarImageLink) => (
          <NavbarImageCategory Category={StockImageLink} key={StockImageLink.name} />
        ))}
      </div>
    </section>
  )
}

export default StockImagesDropdown