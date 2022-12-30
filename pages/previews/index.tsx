import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { previewCategoryValue } from '../../constants/previews/previewCategories';
import  ChoosePreview  from '../../components/Previews/ChoosePreview';
import dynamic from 'next/dynamic';


const PreviewCanvas = dynamic(
  () => import('../../components/Previews/PreviewCanvas'),
  { ssr: false }
);

const Index: NextPage = () => {
  const router = useRouter()

  
  const [selectedCategory, setSelectedCategory] = useState<{ name: string, value: previewCategoryValue }>({ name: 'Phone', value: 'phone' })

  return (
    <div className='flex h-screen m-10 shadow-lg shadow-black'>
      <ChoosePreview selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <PreviewCanvas selectedCategory={selectedCategory} />

    </div>
  )
}

export default Index