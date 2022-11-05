import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import homeIntroBanner from '../../public/frontend-used-images/homeIntroBanner.png';



function HomeIntro() {

  const { ref : animatedDOM, inView : animatedDOMVisible} = useInView({triggerOnce:true});

  

  return (
    <section className='justify-center text-center space-y-8 text-2xl flex-col  '>
    <p ref={animatedDOM} className={`text-fuchsia-600 text-md md: text-lg opacity-0 transition ease-in duration-[1000ms] ${animatedDOMVisible? "opacity-100" : ""}`} > Do you have an<span className=' text-red-900'> exquisite restaurant </span> with an atmosphere that people love?
    </p>
    <p ref={animatedDOM} className={`text-fuchsia-600 text-md md: text-lg opacity-0 transition ease-in duration-[2000ms] ${animatedDOMVisible? "opacity-100" : ""}`} >
      One with <span className=' text-red-900'> mouthwatering </span> food that delights customers?
    </p>
    <p ref={animatedDOM} className={`text-fuchsia-600 text-md md: text-lg opacity-0 transition ease-in duration-[3000ms] ${animatedDOMVisible? "opacity-100" : ""}`} >
      One with a <span className='text-red-900'>dedicated staff</span> willing to make it shine?
    </p>
    <div className='flex relative container justify-center h-[50vh] shadow-2xl shadow-black '>
      <Image
      src={homeIntroBanner}
      alt='website home banner'
      layout='fill'
      className='rounded-3xl'
      objectFit='cover'
      />
      <p className='absolute top-28 text-4xl md:text-8xl italic text-white font-serif drop-shadow-xl'
      
      >Stand out <br></br>against your generic competitors</p>
    </div>

    </section>
  )

  }

export default HomeIntro
