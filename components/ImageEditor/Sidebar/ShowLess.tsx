import React from 'react'
import { MdExpandLess } from 'react-icons/md'
import styles from '../../../styles/image-editor/image-editor.module.css'
interface props{
  showMore:boolean
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowLess = ({ showMore, setShowMore }:props) => {
  return (
    <div className={`w-full h[90px] flex items-center justify-center
    ${showMore ? 'opacity-1' : 'pointer-events-none opacity-0'}
    transition-all duration-700
    `}>
      <button className={`${styles.sidebarIcons}`} onClick={() => setShowMore(!showMore)}>
        <MdExpandLess className='w-[32px] h-[32px]' />
        <p className='font-serif'>Show More</p>
      </button>
    </div>
  )
}

export default ShowLess