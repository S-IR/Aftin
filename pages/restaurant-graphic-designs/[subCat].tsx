import { GetServerSideProps, NextPage, NextPageContext } from 'next'
import React, { useState } from 'react'
import SiteGallery from '../../components/general/SiteGallery'
import SortingSidebar from '../../components/general/SortingSidebar'

interface props {
}
const Index: NextPage<props> = ({ }) => {
  const [showSidebar, toggleSidebar] = useState(true)


  return (
    <div className='flex w-full h-auto'>
      <SortingSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <main className=' flex-grow'>
        <SiteGallery showSidebar={showSidebar}  />
      </main>
    </div>
  )
}

export default Index
