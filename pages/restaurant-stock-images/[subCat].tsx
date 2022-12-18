import { GetServerSideProps, NextPage, NextPageContext } from 'next'
import React, { useEffect, useState } from 'react'
import SortingSidebar from '../../components/SortingSidebar'

import SiteGallery from '../../components/SiteGallery'

interface props {
}
const Index: NextPage<props> = ({ }) => {
  const [showSidebar, toggleSidebar] = useState(true)

  return (
    <div className='flex w-full h-auto'>
      <SortingSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar}  />
      <main className=' flex-grow'>
        <SiteGallery showSidebar={showSidebar}  />
      </main>
    </div>
  )
}

export default Index
