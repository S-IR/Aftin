import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GrDesignLink, GrDesignLinks } from '../../constants/Navbar/GrDesignLinks'

const GrDesignsDropdown = () => {
  return (
    <section className='bg-gradient-to-br from-fuchsia-900 to-gray-900 p-2 absolute top-[58px] left-[525px]  overflow-hidden z-50 rounded-lg w-auto h-auto shadow-md shadow-fuchsia-900 '>
      <div className="grid grid-cols-3">
        {GrDesignLinks.map((GrDesignLink: GrDesignLink) => (
          <Link href={GrDesignLink.href} key={GrDesignLink.name} >
            <div className='flex align-middle justify-center'>
              <p className=' w-24 flex text-center justify-center align-middle font-bold text-white rounded-2xl font-serif mt-12'>{GrDesignLink.name} </p>
              <div className='w-[128px] h-[128px] m-1 relative shadow-lg border-2 border-gray-300 cursor-pointer hover:border-4 hover:border-fuchsia-800 hover:translate-y-1 transition ease-in-out duration-300 '>
                <Image
                  src={GrDesignLink.source}
                  alt={`Food ${GrDesignLink.name}`}
                  layout='fill'
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default GrDesignsDropdown