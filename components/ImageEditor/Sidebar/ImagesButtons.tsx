import { SearchIcon } from '@heroicons/react/solid'
import { ArrowLeft, ArrowRight, Filter, Tune } from '@mui/icons-material'
import { Card, Grid, Popover } from '@mui/material'
import { FirebaseError } from 'firebase/app'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FormEvent, useEffect, useMemo, useState } from 'react'

import Loading from '../../Loading'
import PremiumIcon from '../../PremiumIcon'
import SingleImage from '../../SingleImage'
import { useSpring, animated, config, to, AnimatedComponent } from 'react-spring'
import {CategoriesPopover, FilterPopover, ImagesGrid} from './ImageButtonsComps/index'
import { SMALL_CATEGORY_OF_IMG } from '../../../typings/image-types/ImageTypes'
import { handleOptionClick } from '../../../model/SortingSidebar/handleClick'



const ImagesButtons = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<{ name: string, value: SMALL_CATEGORY_OF_IMG }>({ name: 'Fast Foods', value: 'fast-foods' })


  //POPOVER CODE
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleDescriptionEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (e.key === `Enter`) {
      handleOptionClick(target.value, `description`, router)
    } else {
      return
    }
  }
  const description = router.query.description

  return (
    <section className='h-[90vh] w-[416px] bg-gradient-to-br bg-gray-200 text-white shadow-md shadow-gray-500 flex flex-col'>
      {/* SELECT THE CATEGORY CODE */}
      <div className='flex flex-col items-center justify-center align-middle space-y-10'>
        <button className=' !w-full !h-14 bg-gray-500 hover:bg-gray-700 text-white rounded-sm shadow-md !shadow-gray-600 !hover:shadow-sm transition-all duration-300 !text-lg !my-5 active:shadow-none font-serif ' onClick={openPopover} id={'category-popover'}>
          {selectedCategory.name}
        </button>
        <CategoriesPopover open={anchorEl?.id === 'category-popover'} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </div>

      {/* INPUT TEXT ELEMENTS  */}
      <div className='w-full flex items-center align-middle justify-center flex-shrink relative '>
        <input id={'description-input'} type="text" onKeyDown={(e) => handleDescriptionEnter(e)} placeholder="Describe your desired image" className="!w-48 md:!w-96 my-1 bg-gray-900 focus:bg-gray-700 transition-all duration-300 rounded-md  h-12 !ml-1  !text-center active:border-none" defaultValue={description} ></input>
        <button onClick={openPopover} id={'filter-popover'}>
          <Tune htmlColor='#fb923c' className='w-10 h-10 absolute top-2 right-8  rounded-full p-2 hover:scale-110  hover:bg-slate-300/20 transition-all duration-300 ease-in-out ' />
        </button>
        <FilterPopover open={anchorEl?.id === 'filter-popover'}  anchorEl={anchorEl} setAnchorEl={setAnchorEl} subCat={selectedCategory.value} />

      </div>

      {/* SHOW IMAGES */}
      <ImagesGrid selectedCategory={selectedCategory} />


    </section>
  )
}

export default ImagesButtons