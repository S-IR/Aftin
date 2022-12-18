import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useGesture } from '@use-gesture/react'
import NextImage from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated, config, to, AnimatedComponent } from 'react-spring'
import { ImgDoc } from '../typings/image-types/ImageTypes'
import FreeImageModal from './FreeImageModal'
import PaidImageModal from './PaidImageModal'
import PremiumIcon from './PremiumIcon'
import {isMobile} from 'react-device-detect';

interface props {
  doc: ImgDoc
  loginStatus: 'not logged in'|'unauthorized'| 'bronze' | 'silver'| 'gold'
}

function SingleImage({ doc, loginStatus }: props) {

  // states that change based on mouse events
  const [premiumText, setPremiumText] = useState(false)
  const [open, setOpen] = useState(false)

  // function to get the w and h of the image
  const [w, setWidth] = useState(0)
  const [h, setHeight] = useState(0)


  const target = useRef<null | HTMLDivElement >(null)


  //get the image width and height 
  useEffect(() => {
    const img = new Image()
    img.src = doc.url
    img.onload = () =>{
      setWidth(()=> {if(isMobile){ return img.width / 4} else {return img.width / 2}})
      setHeight(()=> {if(isMobile){ return img.height / 4} else {return img.height / 2}})
    }
  }, [])
  
 

  return (
    <div className='relative w-max h-max flex align-middle justify-center rounded-md'>
      {doc.paid === `silver` || doc.paid === 'gold' ? 
      <PaidImageModal open={open} setOpen={setOpen}  /> : 
      <FreeImageModal url={doc.url} open={open} setOpen={setOpen} w={w} h={h} alt={doc.description} loginStatus={loginStatus}  />}
      <animated.div
        ref={target}
        className="w-auto h-auto relative  cursor-pointer   hover:scale-105 transition ease-in-out duration-300 rounded-lg " onMouseEnter={() => {
          setPremiumText(true)
        }} onMouseLeave={() => {
          setPremiumText(false)
        }
        } onClick={() => setOpen(true)}

      >

        <NextImage
          src={doc.url}
          alt={doc.description}
          width={w}
          height={h}
          onLoad={({ target }: { target: HTMLImageElement }) => {
            
            const { width, height } = target as HTMLImageElement
            setWidth(width)
            setHeight(height)
          }}
          objectFit={`scale-down`}
          className='rounded-xl   '
        />
        {doc.paid === `silver` || doc.paid === 'gold' && <PremiumIcon premiumText={premiumText} />}

      </animated.div>
    </div>


  )
}

export default SingleImage