import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import Button from '../../components/general/Button'
import { GrDesignLinks } from '../../constants/imageCategories'
import { handleRequestDesigner } from '../../model/handleRequestDesigner'
import { useSpring, animated, config, to } from 'react-spring'
import { useGesture } from '@use-gesture/react'
import SingleImage from '../../components/SingleImage'
import ImgSubcatOption from '../../components/ImgLink'
import ImgLink from '../../components/ImgLink'
import Link from 'next/link'

const Index = () => {

  return (
    <div className='bg-black/40 w-screen h-[135vh] md:h-screen'>
      <div className="absolute -z-10 w-screen h-screen invisible md:visible">
        <Image
          alt='restaurant graphic design image example'
          src={`/frontend-used-images/grDesignsBanner.png`}
          layout={'fill'}
          objectFit={'cover'}
        />
      </div>

      <div className='absolute z-0 w-screen h-screen flex flex-col items-center'>
        <h1 className='text-xl md:text-4xl text-center w-screen m-8 font-serif  text-white'>
          What kind of graphic design do you need?
        </h1>
        <button className='text-center  p-4 rounded-full bg-fuchsia-800 text-lg font-serif hover:bg-blue-800 hover:translate-y-1   transition-all duration-300 ' onClick={() => handleRequestDesigner()} >Request a custom design</button>
        <section className='grid grid-rows-2 md:grid-rows-4 lg:grid-cols-5 '>
          {GrDesignLinks.map((grDesLink) => {
            return (
              <div className='w-[125px] h-[125px] m-2 md:m-6 flex flex-col text-center' key={grDesLink.name}>
                <p >{grDesLink.name}</p>
                <Link href={grDesLink.href} >
                  <a>
                    <ImgLink url={grDesLink.source} alt={`example of ${grDesLink.name} image`} w={125} h={125} />
                  </a>
                </Link>

              </div>
            )
          })}
        </section>
      </div>

    </div>
  )
}

export default Index