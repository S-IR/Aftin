import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import { useGesture } from '@use-gesture/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated, config, to } from 'react-spring'
import FreeImageModal from './freeImageModal'
import PaidImageModal from './PaidImageModal'
import PremiumIcon from './PremiumIcon'

function SingleImage({ doc }) {

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
        hovering ? api({ rotateX: 0, rotateY: 0, scale: 1.1 }) : api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { target, eventOptions: { passive: false } }
  )

  return (
    <div className='w-auto h-auto'>
      {doc.paid ? <PaidImageModal open={open} setOpen={setOpen} /> : <FreeImageModal url={doc.url} open={open} setOpen={setOpen} />}
      <animated.div
        ref={target}
        className="w-auto h-auto relative  border-gray-300 cursor-pointer shadow-md shadow-black hover:shadow-2xl hover:translate-y-1 transition ease-in-out duration-300 rounded-lg " onMouseEnter={() => {
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
          src={doc.url}
          alt='pizza-cliparts'
          width={512}
          height={512}
          objectFit='scale-down'
          className='rounded-2xl overflow-hidden   '
        />
        {doc.paid && <PremiumIcon premiumText={premiumText} />}

      </animated.div>
    </div>


  )
}

export default SingleImage