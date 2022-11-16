import { collection, query } from 'firebase/firestore'
import { GetServerSideProps, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { db } from '../../firebase'

interface props{
  params: object
  query: object
}
const Index = ({params, query}: props) => {
  console.log(params);
  console.log(query)
  

    
  return (
    <div>hey</div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  if(!context.params) return {props: {}}
  const query = context.query
  

  return {
    props: {params, query}, // will be passed to the page component as props
  }
}