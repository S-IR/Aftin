import { Popover } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { GrDesignLinks, AdvertImagesLinks } from '../../../../constants/imageCategories'
import { SMALL_CATEGORY_OF_IMG } from '../../../../typings/image-types/ImageTypes'

interface props {
  open: boolean
  selectedCategory: { name: string, value: string }
  setSelectedCategory: React.Dispatch<React.SetStateAction<{
    name: string;
    value: SMALL_CATEGORY_OF_IMG;
  } >>
  anchorEl: HTMLButtonElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>

}

const CategoriesPopover = ({ open, selectedCategory, setSelectedCategory, anchorEl, setAnchorEl }: props) => {
  return (
    <Popover
      id={"select-image-popover"}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      transitionDuration={500}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <div className='w-[440px] h-[620px] bg-black text-black shadow-lg shadow-gray-900 m-2 flex space-x-1'>
        <div className='flex flex-col flex-grow border-r-2 border-white items-center ' >
          <p className='font-bold italic text-white font-serif text-xl my-2'>Advertisement Images</p>
          {AdvertImagesLinks.map((category) => {
            const isSelected = selectedCategory.name === category.name
            return (
              <button className={`${isSelected ? `bg-gray-500` : `bg-none`}  flex flex-row w-[196px] ml-4 my-3 items-center align-middle shadow-sm shadow-gray-500 rounded-l-full hover:shadow-gray-200 transition-all duration-300`} key={category.name}
                onClick={() => setSelectedCategory({ name: category.name, value: category.value as SMALL_CATEGORY_OF_IMG })}
              >
                <Image
                  src={category.source}
                  width={48}
                  height={48}
                  objectFit={`cover`}
                  alt={`image of ${category.name}`}
                  className={'rounded-full'}

                />
                <p className='text-gray-200 mx-2'>{category.name}</p>
              </button>
            )
          })}

        </div>
        <div className='flex flex-col flex-grow border-l-2 border-white items-center' >
          <div className='flex flex-col flex-grow border-l-2 border-gray-300   items-center' >
            <p className='font-bold italic text-white font-serif text-xl my-2'>Graphic Designs</p>
            {GrDesignLinks.map((category) => {
              const isSelected = selectedCategory.name === category.name
              return (
                <button className={`${isSelected ? `bg-gray-500` : `bg-none`} flex flex-row w-[196px] ml-4 my-3 items-center align-middle shadow-sm shadow-gray-500 rounded-l-full hover:-shadow-gray-200 transition-all duration-300  ease-in-out `} key={category.name}
                  onClick={() => setSelectedCategory({ name: category.name, value: category.value as SMALL_CATEGORY_OF_IMG })}

                >
                  <Image
                    src={category.source}
                    width={48}
                    height={48}
                    objectFit={`cover`}
                    alt={`image of ${category.name}`}
                    className={'rounded-full'}

                  />
                  <p className='text-gray-200 mx-2'>{category.name}</p>
                </button>
              )
            })}

          </div>
        </div>

      </div>
    </Popover>
  )
}

export default CategoriesPopover