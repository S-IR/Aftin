import { ArrowRightIcon, InboxIcon } from '@heroicons/react/solid'
import React, { useMemo, useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { MdExpandLess, MdOutlineDoubleArrow } from 'react-icons/md'
import { useSpring, animated, config } from 'react-spring'
import { BrandTailorModal } from './SortingSidebar/index'
import { SidebarSorts } from '../typings/typings'
import { restaurantType } from '../constants/SortingSidebar/restaurantTypes'
import { colorPallet } from '../constants/SortingSidebar/colorPallets'
import {ListItemButton, List, Tooltip, ListSubheader, ListItemIcon, ListItemText } from '@mui/material';
import {SortRestaurantType, SortColorPallet} from './SortingSidebar/index'


interface props {
  sorts: SidebarSorts
  setSorts: React.Dispatch<React.SetStateAction<SidebarSorts>>
}

const SortingSidebar = ({ sorts, setSorts }: props) => {
  
  // These selected values also represent if the sort field exists. They are used as boolean checks

  const [show, toggleSidebar] = useState(true)
  const selectedRestaurantType= sorts.restaurantType
  const selectedColorPallet= sorts.colorPallet


  
  return (
    <section className='sticky h-[150vh] w-auto scroll  '>
      {show ? <></> :
        <Tooltip title='Toggle sidebar' arrow >
          <button className={` ${show ? ` opacity-0` : ` opacity-1`} absolute top-0 left-0 transition-all duration-500 h-8 w-8  bg-stone-900 shadow-lg hover:bg-stone-500 `} onClick={() => toggleSidebar((v) => (!v))}>
            <MdOutlineDoubleArrow className='w-8 h-8' />
          </button>
        </Tooltip>
      }
      <animated.div className={`${show ? `left-0 opacity-1 w-16 md:w-48` : `-left-52 opacity-0 w-[0px]`} transition-all duration-500 h-full  bg-[url('/frontend-used-images/SortingSidebar/SidebarBG.svg')] items-center flex flex-col relative `} >
        <Tooltip title='Toggle sidebar' arrow >
          <button className=' z-10 w-auto absolute top-3 -right-2 ' onClick={() => toggleSidebar((v) => (!v))}>
            <FaAngleDoubleLeft direction={'right'} className={'w-6 h-6'} />
          </button>
        </Tooltip>
        <div className='border-y-2 border-white/60 h-16 w-full flex items-center mt-3 '>
          <h2 className=' h-min  ml-3 font-serif text-white font-bold text-md md:text-xl  border-1 border-white/60   '>Filters</h2>
        </div>
        <List
          sx={{ width: '100%', maxWidth: 200 }}
          component="nav"
          aria-labelledby="Filter-Options"

        >
          {sorts.hasOwnProperty('restaurantType') && 
          // selectedRestaurantType cannot be undefined if it exists as a property in object. Ignore the compiler
          <SortRestaurantType selectedRestaurantType={selectedRestaurantType} setSorts={setSorts} /> }
          {sorts.hasOwnProperty('colorPallet') && 
          <SortColorPallet selectedColorPallet={selectedColorPallet} setSorts={setSorts}/>
          }
        </List>
      </animated.div>
    </section>

  )
}

export default SortingSidebar