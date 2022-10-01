import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { CreateWithUs, HomeBanner, HomeIntro, HomePricingComponent, LinksToCategories, StudiesBox } from '../components/Homepage'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
      <title>Aftin</title>
    </Head>
    <Navbar />
      <main className='website-theme-image'>
        <HomeBanner />
        <HomeIntro />
        <StudiesBox />
        <CreateWithUs/>
        <HomePricingComponent />
        <LinksToCategories/>
        <Footer/>
      </main>
    </>
  )
}

export default Home
