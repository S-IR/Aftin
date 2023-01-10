import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/WebsiteNavbar'
import SiteGallery from '../../../components/SiteGallery'
import { getImageSize } from 'next/dist/server/image-optimizer'
import SortingSidebar from '../../../components/SortingSidebar'
import { restaurantType } from '../../../constants/SortingSidebar/restaurantTypes'
import { colorPallet } from '../../../constants/SortingSidebar/colorPallets'
import { SidebarSorts } from '../../../typings/typings'
import useFirestore from '../../../hooks/useFirestore'

interface props {

}
const Index = ({  }: props) => {
  const DEFAULT_SORT = { restaurantType: 'Not Specified', colorPallet: 'Not Specified'}
  const [sorts, setSorts] = useState<SidebarSorts>(DEFAULT_SORT)
  console.log(sorts)
  
  return (
    <>
      <Head>
        <title>Pizza Cliparts</title>
      </Head>
      <div className='flex w-full'>
        <SortingSidebar  />
        <main className=''>
          <div className='w-[1000px] h-[1080px] bg-black/60' ></div>
          {/* <SiteGallery queryCollection="pizza cliparts"/> */}
        </main>
      </div>
    </>
  )
}

export default Index


