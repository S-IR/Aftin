import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useGesture } from '@use-gesture/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated, config, to } from 'react-spring'
import FreeImageModal from './freeImageModal'
import PaidImageModal from './PaidImageModal'
import PremiumIcon from './PremiumIcon'

interface props{
  doc: object
  w: number
  h: number
}

function SingleImage({ doc, w, h }: props) {


  const [premiumText, setPremiumText] = useState(false)
  const [open, setOpen] = useState(false)
  const target = useRef(null)
  
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      config: { mass: 5, tension: 350, friction: 40, duration:0 },
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

  useGesture(
    {
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),

    },
    { target, eventOptions: { passive: false } }
  )

  return (
    <div className=''>
      {doc.paid ? <PaidImageModal open={open} setOpen={setOpen} /> : <FreeImageModal url={doc.url} open={open} setOpen={setOpen} />}
      <animated.div
        ref={target}
        className="w-auto h-auto relative border-gray-300 cursor-pointer shadow-[5px_10px_10px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0px_15px_30px_-10px_rgba(255,255,255,0.4)]  hover:translate-y-1 transition ease-in-out duration-300 rounded-lg " onMouseEnter={() => {
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

        <Image
          src={doc.source}
          alt={doc.description}
          width={w}
          height={h}
          objectFit='cover'
          className='rounded-2xl   '
        />
        {doc.paid && <PremiumIcon premiumText={premiumText} />}

      </animated.div>
    </div>


  )
}

export default SingleImage