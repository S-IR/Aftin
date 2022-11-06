import { IMAGES_MANIFEST } from 'next/dist/shared/lib/constants'
import React, { useState } from 'react'
import { Masonry } from '@mui/lab'
import useFirestore from '../hooks/useFirestore'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase'
import Image from 'next/image'
import PremiumIcon from './PremiumIcon'
import SingleImage from './SingleImage'


function SiteGallery({ queryCollection } ) {
  const { docs } = useFirestore(queryCollection)

  const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  }



  return (
    <div className=' grid grid-cols-4 gap-10 mt-5 mx-5'  >
      {docs && docs.map(doc => (
        <SingleImage key={doc.id} doc={doc} />
      ))}
      <div>Hello world</div>
    </div>
  )
}

export default SiteGallery
