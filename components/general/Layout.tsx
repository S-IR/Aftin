import React, { FC } from 'react'
import Footer from './Footer'
import WebsiteNavbar from './WebsiteNavbar'


const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div  >
      <WebsiteNavbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout