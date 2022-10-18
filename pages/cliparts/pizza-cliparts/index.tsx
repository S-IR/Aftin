import Head from 'next/head'
import React from 'react'
import Navbar from '../../../components/Navbar'
import SiteGallery from '../../../components/SiteGallery'
import { getImageSize } from 'next/dist/server/image-optimizer'



function index() {

  let pizza_cliparts_ARRAY:Array<String> = [];

  
  
  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
      <title>Pizza Cliparts</title>
    </Head>
    <Navbar/>
    <main className='pt-[75px]'>
      <SiteGallery queryCollection="pizza cliparts"/>
    </main>
    </>
  )
}

export default index