import React, { FC } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'


const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div  >
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout