import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CategoryList } from '../../constants/CategoryList'



function LinksToCategories() {
  return (
    <>
    <div className='flex text-middle justify-center my-10 sm:text-2xl text-8xl font-bold text-gray-300'>Browse our categories </div>
    <div className='w-full grid grid-cols-4 gap-4 mx-3 md:mx-6 align-center '>
      {CategoryList.map((category) => (
        <Link href={category.href} key={category.href} >
          <div className='w-[300px] h-[300px] relative shadow-lg border-2 border-gray-300 cursor-pointer hover:border-4 hover:border-fuchsia-800 hover:translate-y-1 transition ease-in-out duration-300 '>
            <Image
            src={category.source}
            alt={`Food ${category.title}`}
            width={300}
            height={300}
            objectFit='cover'
            />
           <p className='absolute top-1/4 left-1/4 bottom-1/2 right-1/2 flex text-center justify-center font-bold text-black w-32 h-16 bg-fuchsia-600 bg-opacity-70 rounded-2xl'>{category.title} </p>
          </div>
        </Link>
      ))}
    </div>
    </>
  )
}

export default LinksToCategories