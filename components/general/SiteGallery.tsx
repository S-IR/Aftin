import React, { FC, useEffect, useState } from 'react'
import { Masonry } from '@mui/lab'
import { collection, getDocs, query } from 'firebase/firestore'
import Image from 'next/image'
import PremiumIcon from './PremiumIcon'
import SingleImage from './SingleImage'
import InfiniteScroll from 'react-infinite-scroll-component'
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router'
import Loading from './Loading'
import { useInfiniteQuery } from 'react-query'
import { useAuthState } from "react-firebase-hooks/auth"
import { config, useSpring, animated } from 'react-spring'
import { FirebaseError } from 'firebase/app'
import { requestImageDocs } from '../../model/client-side/image-functions/requestImages'
import { handleOptionClick } from '../../model/client-side/SortingSidebar/handleClick'
import { ImgDoc } from '../../typings/image-types/ImageTypes'
import { auth } from '../../firebase'

interface props {
  showSidebar: boolean
}
const SiteGallery: FC<props> = ({ showSidebar }) => {

  // request image docs code
  const router = useRouter()

  // find the big category name
  const { subCat, ...queryParams } = router.query
  let category: "stock-images" | "graphic-designs" = "graphic-designs"
  if (router.pathname.includes('stock-images')) {
    category = 'stock-images'
  } else if (router.pathname.includes(`graphic-designs`)) {
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



  const galleryMarginLeft = useSpring({
    marginLeft: showSidebar ? 216 : 40,
    config: { duration: 300 }
  })

  // login status code
  const [user, userLoading] = useAuthState(auth);
  const [loginStatus, setLoginStatus] = useState<null | 'not logged in' | 'unauthorized' | 'bronze' | 'silver' | 'gold'>(null)

  //fetch the user's login status to be sent to each of the image components
  useEffect(() => {

    const fetchUserStatus = async () => {
      if (!user) return setLoginStatus('not logged in')
      const token = await user.getIdToken()
      const fetchRes = await fetch(`${process.env.NEXT_PUBLIC_server}/api/checkUserStatus`, { method: `POST`, body: token }).catch((err: FirebaseError) => console.log(err))
      if (fetchRes === undefined) return console.log('response on fetching user status void');
      const { status } = await fetchRes.json()

      setLoginStatus(status)

    }
    fetchUserStatus()
  }, [user])



  // if there's no query display this text
  if (Object.keys(router.query).length === 0) {
    return (
      <h1 className='flex text-center text-white'>Please select which type of stock image you would like</h1>
    )
  }
  if (isLoading || userLoading || !data) {
    return (
      <Loading />
    )
  }

  if (error) {
    return (
      <div>{error.message} </div>
    )
  }


  const handleDescriptionEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (e.key === `Enter`) {
      handleOptionClick(target.value, `description`, router)
    } else {
      return
    }
  }
  let imgDocs: ImgDoc[] = []
  data.pages.map((page) => {
    if (!page || !page.docsArray) return;
    return page.docsArray.map((imgDoc => imgDocs.push(imgDoc)))
  })

  // description query variable
  const description = router.query.description
  return (
    <animated.section className={`w-full `} style={galleryMarginLeft} >
      <InfiniteScroll
        dataLength={data?.pages.length * 15}
        next={fetchNextPage}
        hasMore={hasNextPage as boolean}
        loader={<Loading />}
        className={`flex-grow w-auto h-auto items-center justify-center max-w-6xl ml-5`}
        style={{ overflow: `hidden` }}

      >
        <div className='w-full flex items-center align-middle justify-center'>
          <input type="text" onKeyDown={(e) => handleDescriptionEnter(e)} placeholder="Describe what you need " className="!w-48 md:!w-96 my-10 searchbox  h-8 !ml-1  !text-center" defaultValue={description} ></input>
        </div>
        {imgDocs.length !== 0 && loginStatus ?
          <Masonry
            columns={4}
            spacing={2}
            defaultHeight={450}
            defaultColumns={4}
            defaultSpacing={2}
            className={"max-w-6xl"}
          >

            {imgDocs.map((doc) => (
              <SingleImage key={doc.url} doc={doc} loginStatus={loginStatus} />
            ))}


          </Masonry>
          :
          <div className='text-4xl font-serif text-center w-full  '>No image fits your applied search filters</div>}

        <div className='flex items-center align-middle justify-center w-full'>
          <div className='w-full h-28 flex items-center justify-center align-middle'  >
            {/* if there are no images sent don not render any of the following 2 components  */}
            {data.pages[0] ?
              hasNextPage ?
                <button className='w-[128px] h-[128px] rounded-full bg-black/40 bg-button-svg'>Load more images</button> :
                <div className='mx-10 w-96 font-bold h-[32px] py-2   rounded bg-brown-800 shadow-md shadow-gray-900/60 text-gray-200  text-center text-xs justify-center' >No more images to load</div>

              :
              <></>
            }

          </div>

        </div>
      </InfiniteScroll>
    </animated.section >

  )
}

export default SiteGallery

