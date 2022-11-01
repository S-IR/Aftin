import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'


function index() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
        <title>Cliparts</title>
      </Head>
      <main className='pt-[95px]'>
        <h1 className='text-white text-center font-serif font-bold text-4xl md:text-6xl'>Which type of clipart would you like?</h1>
        <div className='grid grid-cols-4 gap-1 w-auto items-center pb-[160px]'>
          <a  className='general-buttons cursor-pointer' href='/food-cliparts'>General food cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/pizza-cliparts'>Pizza cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/popcorn-cliparts'>Popcorn cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/bread-cliparts'>Bread cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/burger-cliparts'>Burger cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/cheese-cliparts'>Cheese cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/taco-cliparts'>Taco cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/vegetables-cliparts'>Vegetables cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/ice-cream-cliparts'>Ice Cream cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/hot-dog-cliparts'>Hot Dog cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/donut-cliparts'>Donut cliparts</a>
          <a className='general-buttons cursor-pointer' href='/cliparts/milk-cliparts'>Milk cliparts</a>

        </div>
      </main>
      <Footer />
    </>
  )
}

export default index