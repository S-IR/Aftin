import Image from 'next/image'
import React, { useState } from 'react'
import homeImageInPhone from '../../public/frontend-used-images/homeImageInPhone.png'
import styles from '../../styles/Home.module.css'




function HomeBanner() {

  return (
    <section >
      <div className={`relative max-w-full ${styles.homeBannerBG} h-[900px] border-b-4 border-gray-400 border-dotted`}  >
        {/* SVG BLOB SECTION */}
        <svg className='opacity-60 ' width="1920" height="900" viewBox="0 0 1920 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1_2)">
            <g filter="url(#filter0_f_1_2)">
              <path d="M354.447 119.052C155.447 310.052 88.4468 368.552 -138.553 551.052C-153.22 605.552 -747.6 714.5 -606 714.5C-429 714.5 354.447 628.552 625.447 531.552C896.308 434.602 963.378 324.165 1087.76 119.367L1087.95 119.052C1212.45 -85.948 924.447 -212.948 841.447 -209.948C758.447 -206.948 553.447 -71.948 354.447 119.052Z" fill="url(#paint0_linear_1_2)" />
            </g>
          </g>
          <defs>
            <filter id="filter0_f_1_2" x="-777.788" y="-360" width="2046.51" height="1224.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_1_2" />
            </filter>
            <linearGradient id="paint0_linear_1_2" x1="157.947" y1="47.052" x2="791.947" y2="614.552" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FB0606" />
              <stop offset="0.244792" stop-color="#3AF2BB" />
              <stop offset="0.546875" stop-color="#307DF0" />
              <stop offset="0.760417" stop-color="#B21CCB" />
              <stop offset="1" stop-color="#FB0606" />
            </linearGradient>
            <clipPath id="clip0_1_2">
              <rect width="1920" height="900" fill="white" />
            </clipPath>
          </defs>
        </svg>





        {/* SVG BLOB SECTION */}

        <h1 className='absolute top-32 left-10 z-50 font-bold text-4xl md:text-8xl text-center text-fuchsia-600 drop-shadow-xl opacity-70'
        >
          The graphic persuader <br></br> of the food industry
        </h1>
        <div className='absolute-top-25 right-30'>
        </div>

        <figure className='invisible md:visible absolute md:top-32 md:right-2 rounded-2xl border-gray-200 border-8 md:h-[533px] md:w-[264px] shadow-md shadow-gray-500/50 -rotate-[15deg] bg-gray-300 transition-opacity'>
          <Image
            src={homeImageInPhone}
            width={264}
            height={533}
            alt='home banner'
            objectFit='inherit'
          />
        </figure>
      </div>
    </section>
  )
}

export default HomeBanner