import { Tooltip } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction } from 'react'
import { NavbarImageLink, GrDesignLinks } from '../../constants/Navbar/GrDesignLinks'
import NavbarImageCategory from './NavbarImageCategory'

interface props {
  setActiveSidebar: Dispatch<SetStateAction<"ProfileDropdown" | "ProductsDropdown" | "ImagesDropdown" | "GrDesignsDropdown" | null>>
}

const GrDesignsDropdown = ({setActiveSidebar}: props) => {
  return (
    <section className='bg-gradient-to-br from-purple-900 to-gray-900 p-2 absolute top-[50px] left-[435px]  overflow-hidden z-50 rounded-lg w-auto h-auto shadow-md shadow-fuchsia-900 '
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