import { collection, getDocs, query, where } from 'firebase/firestore'
import { GetServerSideProps, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import SortingSidebar from '../../components/SortingSidebar'
import { db } from '../../firebase'
import { ImgFields } from '../../typings/image-types/ImageTypes'

interface props {
  docsArray: ImgFields[]
}
const Index = ({ docsArray }: props) => {
  const router = useRouter()
  const subCat = router.query.subCat
  console.log(docsArray[0]);
  

  return (
    <div>
      <SortingSidebar sorts={docsArray[0]}/>
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) return { props: {} }
  const subCat = context.query.subCat
  
  const food_type = context.query.food_type
  const subCatRef = collection(db, `/stock-images/${subCat}/Images`)
  

  const q = query(subCatRef, where("food_type", "array-contains", food_type))
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs);
  
  let docsArray = []
  querySnapshot.docs.forEach((doc) =>
    docsArray.push({ ...doc.data() })
  )

  return {
    props: { docsArray }, // will be passed to the page component as props
  }
}