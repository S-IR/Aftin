import Image from 'next/image'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { useSpringRef, useTransition, animated, AnimatedProps } from 'react-spring';
import styles from '../../styles/Home.module.css'
import { useTrail, animated as a, useSpring } from "react-spring";
import { useInView } from 'react-intersection-observer'



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

  const { ref: hOneRef, inView: hOneVisible } = useInView({triggerOnce:true});


  const hOneStyles = useSpring({ opacity: hOneVisible? 1 : 0, transform: `translateY(${hOneVisible? 0 : 20}%)` })

  useEffect(() => {
    transRef.start()
  }, [index])
  return (
    <section >
      <div className={`relative max-w-full  h-[900px] border-b-4 border-gray-400 border-dotted`}  >

        <a.h1 className={`absolute top-32 left-10 z-50 font-[600] text-6xl md:text-8xl text-center text-orange-300  opacity-70  border-t-4  rounded drop-shadow-lg shadow-black  border-white/80 ${styles.homeBannerHOne} `}
        ref={hOneRef}
        style={hOneStyles}
        >
          The graphic persuader <br></br> of the food industry
        </a.h1>


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