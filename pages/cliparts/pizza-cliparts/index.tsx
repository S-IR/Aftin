import Head from 'next/head'
import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import SiteGallery from '../../../components/SiteGallery'
import { getImageSize } from 'next/dist/server/image-optimizer'
import SortingSidebar from '../../../components/SortingSidebar'

interface props {
  isBrandTailor: boolean
}

const index = ({isBrandTailor}) => {

  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
      <title>Pizza Cliparts</title>
    </Head>
    <div className='flex w-full'>
    <SortingSidebar isBrandTailor={isBrandTailor}  />
    <main className=''>
      <div className='w-[1000px] h-[1080px] bg-black/60' ></div>
      {/* <SiteGallery queryCollection="pizza cliparts"/> */}
    </main>
    </div>
    </>
  )
}

export default index

export async function getServerSideProps(context){
  return{
    props: { isBrandTailor: false }
  }
}
