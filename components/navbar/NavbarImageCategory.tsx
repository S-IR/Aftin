import Link from 'next/link'
import React, { CSSProperties, useEffect, useMemo, useState } from 'react'
import { NavbarImageLink } from '../../constants/imageCategories'
import Tooltip from '@mui/material/Tooltip';
import { useTransition, animated, config, AnimatedProps, useSpringRef } from 'react-spring';
import Image from 'next/image';

interface props {
  Category: NavbarImageLink
}


const NavbarImageCategory = ({ Category }: props) => {

  return (
    <Link href={Category.href}  >
      <div className='flex align-middle justify-center'>
        <p className=' w-24 flex text-center justify-center align-middle font-bold text-white rounded-2xl font-serif mt-12'>{Category.name} </p>
        <Tooltip
          title={
            <figure className=' overflow-hidden w-[188px] h[200px] '>
              <p>{Category.description}</p>
            </figure>
          }
          arrow
          placement='bottom-start'
        >
          <div className='w-[128px] h-[128px] m-1 relative   cursor-pointer filter-none hover:filter brightness-75 shadow-sm hover:shadow-md  shadow-white rounded-sm  transition ease-in-out duration-300 '>
            <Image
              src={Category.source}
              alt={`Food ${Category.name}`}
              layout='fill'
            />
          </div>
        </Tooltip>

      </div>
    </Link >
  )
}

export default NavbarImageCategory