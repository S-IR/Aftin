import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { IconType } from 'react-icons/lib'
import styles from '../../../styles/image-editor/image-editor.module.css'

interface props {
  Icon: JSX.Element
  Text: string
  setActiveSidebar: Dispatch<React.SetStateAction<string>>
  activeSidebar: string
  showMore: boolean
}

const SidebarIcon = ({ Icon, Text, setActiveSidebar, activeSidebar, showMore }: props) => {
  const isBelowShowMore = ['Crop','Filters','Draw'].includes(Text)
  const displayIcon = showMore && isBelowShowMore

  
  return (
    <div className={`w-full h-[90px] 
    ${activeSidebar === Text ? "bg-black border-l-2 border-white" : ""}
    ${!isBelowShowMore || displayIcon? 'opacity-1' : 'pointer-events-none opacity-0'}
    transition-all duration-700
    flex items-center justify-center`}
    
    >
      <button className={`${styles.sidebarIcons}`} onClick={() => setActiveSidebar(Text)}>
        {Icon}
        <p className='font-serif'>{Text}</p>
      </button>
    </div>

  )
}

export default SidebarIcon