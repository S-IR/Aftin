import axios, { AxiosError } from 'axios'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { GetServerSideProps, NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SortingSidebar from '../../components/SortingSidebar'
import { db } from '../../firebase'
import { ImgDoc, SMALL_CATEGORY_OF_IMG } from '../../typings/image-types/ImageTypes'
import { useQuery, QueryClient, dehydrate, DehydratedState, UseQueryResult } from 'react-query'
import Loading from '../../components/Loading'
import { requestImageDocs } from '../../model/image-functions/requestImages'
import { AppContext } from 'next/app'
import SiteGallery from '../../components/SiteGallery'

interface props {
}
const Index: NextPage<props> = ({ }) => {

  return (
    <div className='flex w-full h-auto'>
      <SortingSidebar />
      <main className=' flex-grow'>
        {/* <SiteGallery  /> */}
      </main>
    </div>
  )
}

export default Index

// export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: { dehydratedState: DehydratedState } | {} }> => {
  
//   if (context.params === undefined) return { props: {} }
  
//   const {subCat, ...queryParams} = context.query
 
  
//   const queryClient = new QueryClient()
//   if(subCat){
//     await queryClient.prefetchQuery(`${subCat}`, () => requestImageDocs(`graphic-designs`, subCat as string, queryParams))
  
//   }

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }, // will be passed to the page component as props
//   }
// }