import { ArrowRightIcon, InboxIcon } from '@heroicons/react/solid'
import React, { useMemo, useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { MdExpandLess, MdOutlineDoubleArrow } from 'react-icons/md'
import { useSpring, animated, config } from 'react-spring'
import { BrandTailorModal } from './SortingSidebar/index'
import { SidebarSorts } from '../typings/typings'
import { restaurantType } from '../constants/SortingSidebar/restaurantTypes'
import { colorPallet } from '../constants/SortingSidebar/colorPallets'
import { ListItemButton, List, Tooltip, ListSubheader, ListItemIcon, ListItemText } from '@mui/material';
import { SortSurrEnv } from './SortingSidebar/For Stock Images'
import { ImgFields } from '../typings/image-types/ImageTypes'
import { SortStyle } from './SortingSidebar/For Graphic Designs'
import { SortColorScheme } from './SortingSidebar/index'


interface props {
  sorts: ImgFields
}

const SortingSidebar = ({ sorts }: props) => {
  

  // These selected values also represent if the sort field exists. They are used as boolean checks

  const [show, toggleSidebar] = useState(true)

  // if these fields exist, then display their corresponding component which sends them the currently selected value for that field

  //These are the basic filters
  const paidBool = sorts.paid
  const size = sorts.size
  const color_scheme = sorts.color_scheme

  const surr_env = sorts.surrounding_environment
  const dish_type = sorts.dish_type
  const soup = sorts.soup
  const food_type = sorts.food_type
  const drink_type = sorts.drink_type
  const utensils_type = sorts.utensil_type
  const ingredients = sorts.ingredients
  const style = sorts.style
  const banner_type = sorts.banner_type
  const artwork_style = sorts.artwork_style
  const stickers_category = sorts.stickers_category
  const logo_type = sorts.logo_type
  const shape = sorts.shape

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
          {/* Depending on if the sent sort has a property, display the sorting component for that property */}
          {style &&
            // selectedRestaurantType cannot be undefined if it exists as a property in object. Ignore the compiler
            <SortStyle style={style} />}
          {color_scheme &&
            <SortColorScheme color_scheme={color_scheme} />
          }
          {surr_env &&
            <SortSurrEnv surr_env={surr_env} />
          }
        </List>
      </animated.div>
    </section>

  )
}

export default SortingSidebar