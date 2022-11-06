import { ArrowRightIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { MdOutlineDoubleArrow } from 'react-icons/md'
import { useSpring, animated, config } from 'react-spring'
import { BrandTailorModal } from './FilterSidebar/index'
import Tooltip from '@mui/material/Tooltip';


interface props {
  isBrandTailor: boolean

}

const SortingSidebar = ({ isBrandTailor, sorts, setSorts }: props) => {

  const [show, toggleSidebar] = useState(true)


  return (
    <section className='relative h-[100vh] w-auto '>
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
        <h2 className=' h-min  ml-3 font-serif text-white font-bold text-md md:text-xl  border-1 border-white/60 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400  '>Filters</h2>
        </div>
        <div>

        </div>

      </animated.div>
    </section>

  )
}

export default SortingSidebar