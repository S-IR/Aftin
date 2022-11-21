import axios from 'axios'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { GetServerSideProps, NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SortingSidebar from '../../components/SortingSidebar'
import { db } from '../../firebase'
import { ImgFields } from '../../typings/image-types/ImageTypes'
import { useQuery, QueryClient, dehydrate, DehydratedState, UseQueryResult } from 'react-query'
import Loading from '../../components/Loading'
import { requestImageDocs } from '../../model/image-functions/requestImages'
import { AppContext } from 'next/app'

interface props {
}
const Index: NextPage<props> = ({ }) => {
  const router = useRouter()
  const subCat = router.query.subCat
  const { isLoading, isError, error, data }: UseQueryResult<string | null, Error> = useQuery<string | null, Error>(`${subCat}`, () => requestImageDocs(router.query), {enabled: router.query !== undefined})
  if(isLoading) {
    return(
      <Loading />
    )
  }
  if (isError){
    return(
      <div>{error.message} </div>
    )
  }
  console.log(data)
  
  return (
    <div>
      hi
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: { dehydratedState: DehydratedState } | {} }> => {
  if (context.params === undefined) return { props: {} }
  const queryParams = context.params
  const subCat = context.params.subCat

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(`${subCat}`, () => requestImageDocs(queryParams))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }, // will be passed to the page component as props
  }
}