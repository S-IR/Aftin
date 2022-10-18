import Image from 'next/image'
import React, { useState } from 'react'

const PremiumIcon = ({premiumText}) => {

  
  return (
    <div className='absolute flex bottom-5 right-5 bg-gray-500 bg-opacity-60 rounded-lg '  >
      <Image
      src="/frontend-used-images/PremiumIcon.png"
      width={32}
      height={32}
      alt= "Premium image icon"
      />
      {premiumText? <p>Premium</p> : <p></p>}
    </div>
  )
}

export default PremiumIcon