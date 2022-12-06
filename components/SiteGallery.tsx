import { IMAGES_MANIFEST } from 'next/dist/shared/lib/constants'
import React, { FC, useEffect, useState } from 'react'
import { Masonry } from '@mui/lab'
import useFirestore from '../hooks/useFirestore'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase'
import Image from 'next/image'
import PremiumIcon from './PremiumIcon'
import SingleImage from './SingleImage'
import { ImgDoc } from '../typings/image-types/ImageTypes'
import InfiniteScroll from 'react-infinite-scroll-component'
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router'
import { handleOptionClick } from '../model/SortingSidebar/handleClick'
import Loading from './Loading'
import { requestImageDocs } from '../model/image-functions/requestImages'
import { useInfiniteQuery } from 'react-query'

interface props {
}
const SiteGallery: FC<props> = ({ }) => {
  const [hasMore, setHasMore] = useState(false)
  const router = useRouter()
  const {subCat, ...queryParams} = router.query 
  let category: "stock-images" | "graphic-designs"  = "graphic-designs"
  if(router.pathname.includes('stock-images')){
    category = 'stock-images'
  } else if(router.pathname.includes(`graphic-designs`)) {
    category = 'graphic-designs'
  }


  

  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<{ docsArray: ImgDoc[], hasNextPage: boolean }, Error>(
    `${subCat}`,
    ({ pageParam }) => requestImageDocs(pageParam, category, subCat as string, queryParams), {
    getNextPageParam: (lastRow, allRows) => {
      if (lastRow && lastRow.hasNextPage) {
        return allRows.length
      }
    }, enabled: false,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false
  }
  );
  //refetch if the query changes
  useEffect(() => {
    refetch()
  

  }, [router.query])

  // if no query, display this text
  if (Object.keys(router.query).length === 0) {
    return (
      <h1 className='flex text-center text-white'>Please select which type of stock image you would like</h1>
    )
  }
  if (isLoading) {
    return (
      <Loading />
    )
  }



  if (error) {
    return (
      <div>{error.message} </div>
    )
  }
  if (!data) {
    console.log(`the data that's been sent is undefined`)

    return (<></>)
  }

  const columns = isMobile ? 1 : 4
  const handleDescriptionEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === `Enter`) {
      handleOptionClick(e.target.value, `description`, router)
    } else {
      return
    }
  }
  let imgDocs: ImgDoc[] = []
  data.pages.map((page) => {
  if (!page.docsArray) return;
  return page.docsArray.map((imgDoc => imgDocs.push(imgDoc)))
  })

  const description = router.query.description
  return (
    <section className='w-full '>
      <div className='w-full flex items-center align-middle justify-center'>
        <input type="text" onKeyDown={(e) => handleDescriptionEnter(e)} placeholder="Describe what you need " className="!w-48 md:!w-96 my-4 searchbox  h-8 !ml-1 !text-center" defaultValue={description} ></input>
      </div>
      <InfiniteScroll
        dataLength={data?.pages.length * 15}
        next={fetchNextPage}
        hasMore={hasNextPage as boolean}
        loader={<Loading />}
        className={`flex-grow w-auto h-auto items-center justify-center`}
        style={{ overflow: `hidden` }}

      >
        <Masonry
          columns={4}
          spacing={2}
          defaultHeight={450}
          defaultColumns={4}
          defaultSpacing={2}
          className={``}
        >
          
          {imgDocs.length!==0? 
          imgDocs.map((doc) => (
            <SingleImage key={doc.url} doc={doc} />
          )): 
          <div>No image fits your filters</div>
          }

        </Masonry>
        <div className='flex items-center align-middle w-max'>

        {hasNextPage ?
          <div className='w-max h-16 bg-black/40'>Load more images</div> :
          <div className='w-max h-16 bg-black/40' >No more images to load</div>
        }
        </div>

      </InfiniteScroll>

    </section >

  )
}

export default SiteGallery
