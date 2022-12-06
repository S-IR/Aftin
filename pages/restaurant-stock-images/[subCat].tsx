import { GetServerSideProps, NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import SortingSidebar from '../../components/SortingSidebar'
import { useQuery, QueryClient, dehydrate, DehydratedState, UseQueryResult, useInfiniteQuery } from 'react-query'
import SiteGallery from '../../components/SiteGallery'

interface props {
}
const Index: NextPage<props> = ({ }) => {

  return (
    <div className='flex w-full h-auto'>
      <SortingSidebar />
      <main className=' flex-grow'>
        <SiteGallery  />
      </main>
    </div>
  )
}

export default Index

// export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: { dehydratedState: DehydratedState } | {} }> => {

//   if (context.params === undefined) return { props: {} }


//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }, // will be passed to the page component as props
//   }
// }