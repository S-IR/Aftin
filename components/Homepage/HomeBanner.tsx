import Image from 'next/image'
import React, { CSSProperties, useEffect, useState } from 'react'
import { useSpringRef, useTransition, animated, AnimatedProps } from 'react-spring';
import styles from '../../styles/Home.module.css'

const imageArray = [
  '/frontend-used-images/homeImageInPhone1.png',
  '/frontend-used-images/homeImageInPhone2.png',
  '/frontend-used-images/homeImageInPhone3.png'
]
const pages: ((props: AnimatedProps<{ style: CSSProperties }>) => React.ReactElement)[] = imageArray.map((image) => (
  // eslint-disable-next-line react/display-name
  ({ style }) => (
    <animated.div style={{ ...style, position: 'absolute' }}>
      <img
        src={image}
        layout={'fill'}
      />
    </animated.div>))
)

console.log(pages);
function HomeBanner() {

  const [index, set] = useState(0)
  useEffect(() => {
    setInterval(() => {
      set((index) => (index + 1) % 3)
    }
      , 3000)

  }, [])


  const transRef = useSpringRef()
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { transform: 'translate3d(100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { transform: 'translate3d(-100%,0,0)' },
  })

  useEffect(() => {
    transRef.start()
  }, [index])
  return (
    <section >
      <div className={`relative max-w-full ${styles.homeBannerBG} h-[900px] border-b-4 border-gray-400 border-dotted`}  >
        {/* SVG BLOB SECTION */}

        <svg className='opacity-60 hidden md:inline ' width="100vw" height="100vh" viewBox="0 0 1920 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1_2)">
            <g filter="url(#filter0_f_1_2)">
              <path d="M354.447 119.052C155.447 310.052 88.4468 368.552 -138.553 551.052C-153.22 605.552 -747.6 714.5 -606 714.5C-429 714.5 354.447 628.552 625.447 531.552C896.308 434.602 963.378 324.165 1087.76 119.367L1087.95 119.052C1212.45 -85.948 924.447 -212.948 841.447 -209.948C758.447 -206.948 553.447 -71.948 354.447 119.052Z" fill="url(#paint0_linear_1_2)" />
            </g>
          </g>
          <defs>
            <filter id="filter0_f_1_2" x="-777.788" y="-360" width="2046.51" height="1224.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_1_2" />
            </filter>
            <linearGradient id="paint0_linear_1_2" x1="157.947" y1="47.052" x2="791.947" y2="614.552" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB0606" />
              <stop offset="0.244792" stopColor="#3AF2BB" />
              <stop offset="0.546875" stopColor="#307DF0" />
              <stop offset="0.760417" stopColor="#B21CCB" />
              <stop offset="1" stopColor="#FB0606" />
            </linearGradient>
            <clipPath id="clip0_1_2">
              <rect width="1920" height="900" fill="white" />
            </clipPath>
          </defs>
        </svg>





        {/* SVG BLOB SECTION */}

        <h1 className='absolute top-32 left-10 z-50 font-bold text-6xl md:text-8xl text-center text-fuchsia-600 drop-shadow-xl opacity-70'
        >
          The graphic persuader <br></br> of the food industry
        </h1>
        <div className='absolute-top-25 right-30'>
        </div>

        <figure className='invisible md:visible absolute md:top-32 md:right-2 rounded-2xl border-gray-200 border-8 md:h-[533px] md:w-[264px] shadow-md shadow-gray-500/50 -rotate-[15deg] bg-gray-300 transition-opacity overflow-hidden'>
          {transitions((style, i) => {
            const Page = pages[i]
            return <Page style={style} />
          })}
        </figure>

      </div>
    </section>
  )
}

export default HomeBanner