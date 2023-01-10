import { Tooltip } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction } from 'react'
import { NavbarImageLink, GrDesignLinks } from '../../constants/imageCategories'
import NavbarImageCategory from './NavbarImageCategory'

interface props {
  setActiveSidebar: Dispatch<SetStateAction<"ProfileDropdown" | "ProductsDropdown" | "ImagesDropdown" | "GrDesignsDropdown" | null>>
}

const GrDesignsDropdown = ({ setActiveSidebar }: props) => {
  return (
    <section className='bg-gradient-to-br from-orange-800 to-gray-900 p-2 absolute top-[50px] -left-10  overflow-hidden z-50 rounded-lg w-max h-max shadow-md shadow-gray-800 '
      onMouseLeave={() => setActiveSidebar(null)}
    >
      <div className="grid grid-cols-3">
        {GrDesignLinks.map((GrDesignLink: NavbarImageLink) => (
          <NavbarImageCategory Category={GrDesignLink} key={GrDesignLink.name} />
        ))}
      </div>
    </section>
  )
}

export default GrDesignsDropdown