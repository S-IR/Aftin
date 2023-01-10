import Image from 'next/image'
import React, { useState } from 'react'
import { useSpring, animated, config, to } from 'react-spring'


interface props {
  premiumText: boolean
}

const PremiumIcon = ({ premiumText }: props) => {


  const premiumTextWidth = useSpring({
    width: premiumText ? 62 : 0,
    opacity: premiumText? 1 : 0,
    config : {...config.gentle, duration: 300}
  })

  return (
    <div className='absolute flex bottom-5 right-5 rounded-lg '

    >
      <Image
        src="/frontend-used-images/PremiumIcon.png"
        width={32}
        height={32}
        alt="Premium image icon"
      />
      <animated.div
        style={premiumTextWidth}
      >
        <p className='overflow-hidden'  >Premium</p>
      </animated.div>
    </div >
  )
}

export default PremiumIcon