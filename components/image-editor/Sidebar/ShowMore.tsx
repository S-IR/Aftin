import React from 'react'
import styles from '../../../styles/image-editor/image-editor.module.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface props{
  showMore:boolean
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowMore = ({showMore, setShowMore}:props) => {
  if (showMore) return <></>
  return (
    <div className={`w-full h[90px] flex items-center justify-center border-l-2 border-white`}>
      <button className={`${styles.sidebarIcons}`} onClick={() => setShowMore(!showMore)}>
        <ExpandMoreIcon className='w-[32px] h-[32px]' />
        <p className='font-serif'>Show More</p>
      </button>
    </div>
  )
}

export default ShowMore