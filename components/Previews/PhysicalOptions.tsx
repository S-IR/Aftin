import Popover from '@mui/material/Popover'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { dayCategories, nightCategories, previewCategoryType, previewCategoryValue } from '../../constants/previews/previewCategories'

interface props {
  open: boolean
  anchorEl: HTMLButtonElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  selectedCategory: { name: string, value: string }
  setSelectedCategory: React.Dispatch<React.SetStateAction<{
    name: string;
    value: previewCategoryValue;
  }>>
}

const PhysicalOptions = ({ open, anchorEl, setAnchorEl, selectedCategory, setSelectedCategory }: props) => {


  
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      transitionDuration={500}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
    >
      <div className='w-auto h-auto bg-gray-800 flex flex-col align-middle justify-center items-center md:flex-row overflow-hidden p-8  '>
        {/* DAY PART  */}
        <div className='grow flex flex-col align-middle justify-center items-center'>
          <h2 className='text-white text-4xl font-serif '>Day Environments</h2>

          <div className=' grid grid-cols-2  md:grid-cols-3 p-1  md:p-4 shadow-lg shadow-black md:mr-1  '>

            {dayCategories.map((dayCategory) => {
              const selected = selectedCategory.value === dayCategory.value

              return (
                <div key={dayCategory.value} className='w-full cursor-pointer hover:bg-gray-200 transition-all duration-300 rounded-md flex flex-col space-y-4 items-center align-middle justify-center h-full md:m-4 ' onClick={() => setSelectedCategory({name: dayCategory.name, value: dayCategory.value})} >
                  <Image
                    src={dayCategory.source}
                    width={75}
                    height={75}
                    className={'rounded-full drop-shadow-md shadow-black '}
                    alt={`preview image for ${dayCategory.name}`}
                  />
                  <button onClick={() => setSelectedCategory({ name: dayCategory.name, value: dayCategory.value })} className={`w-36 h-8 drop-shadow-2xl shadow-orange-500 rounded-l-md rounded-r-md border-t-2 border-gray-500 hover:border-gray-300 transition-all duration-300 font-serif text-white  ${selected ? `bg-gray-500` : `bg-gray-700`} transition-all duration-300 `}>{dayCategory.name}</button>
                </div>
              )
            })}

          </div>

        </div>
        {/* NIGHT PART  */}
        <div className='grow flex flex-col items-center justify-center align-middle '>
          <h2 className='text-white text-4xl  font-serif'>Night Environments</h2>
          <div className=' grid grid-cols-2  md:grid-cols-3 p-1  md:p-4 shadow-lg shadow-black md:ml-1 '>

            {nightCategories.map((nightCategory) => {
              const selected = selectedCategory.value === nightCategory.value
              
              return (
                <div key={nightCategory.value} className=' w-full cursor-pointer hover:bg-gray-200 transition-all duration-300 rounded-md flex flex-col space-y-4 items-center align-middle justify-center h-full md:m-4  ' onClick={() => setSelectedCategory({name: nightCategory.name, value: nightCategory.value})}>
                  <Image
                    src={nightCategory.source}
                    width={75}
                    height={75}
                    className={'rounded-full drop-shadow-md shadow-black '}
                    alt={`preview image for ${nightCategory.name}`}
                  />
                  <button onClick={() => setSelectedCategory({ name: nightCategory.name, value: nightCategory.value })} className={`w-36 h-8 drop-shadow-2xl shadow-orange-500 rounded-l-md rounded-r-md border-t-2 border-gray-500 group-hover:border-gray-300 transition-all duration-300 font-serif text-white  ${selected ? `bg-gray-400` : `bg-gray-700`} transition-all duration-300 `}>{nightCategory.name}
                  </button>
                </div>
              )
            })}

          </div>


        </div>


      </div>
    </Popover>
  )
}
export default PhysicalOptions