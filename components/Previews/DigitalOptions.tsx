import React from 'react'
import Popover from '@mui/material/Popover'
import { dayCategories, digitalCategories, previewCategoryType, previewCategoryValue } from '../../constants/previews/previewCategories'
import Image from 'next/image'



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
const DigitalOptions = ({open, anchorEl, setAnchorEl, selectedCategory, setSelectedCategory}: props) => {
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
      <div className='w-auto h-auto p-2 md:p-6 bg-gray-800 grid grid-cols-2 space-x-1 md:grid-cols-4  align-middle justify-center items-center shadow-lg shadow-black'>
        {digitalCategories.map((digitalCategory)=> {
          const selected = selectedCategory.value === digitalCategory.value

          return (
            <div key={digitalCategory.value} className='w-full cursor-pointer hover:bg-gray-200 transition-all duration-300 rounded-md flex flex-col space-y-4 items-center align-middle justify-center h-full md:m-4' onClick={() => setSelectedCategory({name: digitalCategory.name, value: digitalCategory.value})}> 
              <Image
              src={digitalCategory.source}
              width={100}
              height={100}
              className={'rounded-full drop-shadow-md shadow-black '}
              alt={`preview image for ${digitalCategory.name}`}
              />
              <button onClick={()=> setSelectedCategory({name: digitalCategory.name, value: digitalCategory.value})} className={`w-36 h-16 drop-shadow-2xl shadow-orange-500 rounded-l-md rounded-r-md border-t-2 border-gray-500 hover:border-gray-300 transition-all duration-300 font-serif text-white  ${selected? `bg-gray-500`: `bg-gray-700`} transition-all duration-300 `}>{digitalCategory.name}</button>
            </div>
          )
        })}
      </div>
    </Popover>
  )
}

export default DigitalOptions