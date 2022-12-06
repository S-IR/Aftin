import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useGesture } from '@use-gesture/react'
import NextImage from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated, config, to } from 'react-spring'
import { ImgDoc } from '../typings/image-types/ImageTypes'
import FreeImageModal from './FreeImageModal'
import PaidImageModal from './PaidImageModal'
import PremiumIcon from './PremiumIcon'
import {isMobile} from 'react-device-detect';

interface props {
  doc: ImgDoc

}

function SingleImage({ doc }: props) {

  // states that change based on mouse events
  const [premiumText, setPremiumText] = useState(false)
  const [open, setOpen] = useState(false)

  // function to get the w and h of the image
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)


  const target = useRef(null)

  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      config: { mass: 5, tension: 350, friction: 40, duration: 0 },
    })
  )
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', preventDefault)
    document.addEventListener('gesturechange', preventDefault)

    return () => {
      document.removeEventListener('gesturestart', preventDefault)
      document.removeEventListener('gesturechange', preventDefault)
    }
  }, [])
  //get the image width and height 
  useEffect(() => {
    const img = new Image()
    img.src = doc.url
    img.onload = () =>{
      setWidth(()=> {if(isMobile){ return img.width / 4} else {return img.width / 2}})
      setHeight(()=> {if(isMobile){ return img.height / 4} else {return img.height / 2}})
    }
  }, [])
  
  
  useGesture(
    {
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1.1 }),

    },
    { target, eventOptions: { passive: false } }
  )

  

  return (
    <div className='relative w-max h-max flex align-middle justify-center rounded-md'>
      {doc.paid === `true` ? 
      <PaidImageModal open={open} setOpen={setOpen}  /> : 
      <FreeImageModal url={doc.url} open={open} setOpen={setOpen} width={width} height={height} alt={doc.description}  />}
      <animated.div
        ref={target}
        className="w-auto h-auto relative shadow-white cursor-pointer shadow-none hover:shadow-sm hover:translate-y-1 transition ease-in-out duration-300 rounded-lg " onMouseEnter={() => {
          setPremiumText(true)
        }} onMouseLeave={() => {
          setPremiumText(false)
        }
        } onClick={() => setOpen(true)}
        style={{

          transform: 'perspective(600px)',
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}
      >

        <NextImage
          src={doc.url}
          alt={doc.description}
          width={width}
          height={height}
          onLoad={({ target }: { target: HTMLImageElement }) => {
            
            const { width, height } = target as HTMLImageElement
            setWidth(width)
            setHeight(height)
          }}
          objectFit={`scale-down`}
          className='rounded-xl   '
        />
        {doc.paid === true && <PremiumIcon premiumText={premiumText} />}

      </animated.div>
    </div>


  )
}

export default SingleImage