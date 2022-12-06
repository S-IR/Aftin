import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import Button from '../../components/Button'
import { GrDesignLinks } from '../../constants/Navbar/GrDesignLinks'
import { handleRequestDesigner } from '../../model/handleRequestDesigner'
import { useSpring, animated, config, to } from 'react-spring'
import { useGesture } from '@use-gesture/react'
import SingleImage from '../../components/SingleImage'
import ImgSubcatOption from '../../components/ImgLink'
import ImgLink from '../../components/ImgLink'
import { StockImageLinks } from '../../constants/Navbar/StockImageCategories'
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
          What image do you need?
        </h1>
        <button className='text-center  p-4 rounded-full bg-fuchsia-800 text-lg font-serif hover:bg-blue-800 hover:translate-y-1   transition-all duration-300 ' handleOnClick={() => handleRequestDesigner()} >Request a custom design</button>
        <section className='grid grid-rows-2 md:grid-rows-4 lg:grid-cols-5 '>
          {StockImageLinks.map((stockImage) => {
            return (
              <div className='w-[125px] h-[125px] m-2 md:m-6 flex flex-col text-center' key={stockImage.name}>
                <p >{stockImage.name}</p>
                <Link href={stockImage.href} >
                  <a>
                    <ImgLink url={stockImage.source} alt={`example of ${stockImage.name} image`} w={125} h={125} />
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