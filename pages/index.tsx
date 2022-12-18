import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { CreateWithUs, HomeBanner, HomeIntro, HomePricingComponent, LinksToCategories, StudiesBox } from '../components/Homepage'
import Footer from '../components/Footer'
import { useAppSelector } from '../Redux/hooks'
import { cachedImageCount } from '../features/cachedImage/cachedImageSlice'
import { Snackbar, SnackbarContent } from '@mui/material'
import { MdOutlineImage } from 'react-icons/md'
import CachedImageSnackbar from '../components/Snackbars/CachedImageSnackbar'

const Home: NextPage = () => {

  const cachedImage = useAppSelector(cachedImageCount).image
  const handleClose = () => {
    console.log(`handleClsoe`);

  }
  console.log(`cachedImage:`, cachedImage);
  

  return (
    <>
      <Head>
        <title>Aftin</title>
        <style>  </style>
      </Head>
      <main className='website-theme-image'>
        <HomeBanner />
        <HomeIntro />
        <StudiesBox />
        <CreateWithUs />
        <HomePricingComponent />
        <LinksToCategories />
        <CachedImageSnackbar cachedImage={cachedImage} />

      </main>
    </>
  )
}

export default Home
