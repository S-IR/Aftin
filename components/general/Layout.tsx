import Cookies from 'js-cookie'
import React, { FC, useEffect, useState } from 'react'
import Footer from './Footer'
import ConsentCookiesSnackbar from './snackbars/ConsentCookiesSnackbar'
import WebsiteNavbar from './WebsiteNavbar'


const Layout = ({ children }: React.PropsWithChildren) => {


  const ad_storage_consent: undefined | 'granted' | 'denied' | string = Cookies.get('ad_storage_consent')
  const analytics_storage_consent: undefined | 'granted' | 'denied' | string = Cookies.get('analytics_storage_consent')

  const [cookiesConsentOpen, setCookiesConsent] = useState(false)

  useEffect(() => {
    setCookiesConsent(ad_storage_consent === undefined && analytics_storage_consent === undefined)
  }, [])
  
  return (
    <div  >
      <WebsiteNavbar />
      {children}
      {cookiesConsentOpen ?
          <ConsentCookiesSnackbar open={cookiesConsentOpen} setCookiesConsent={setCookiesConsent} />
          :
          <></>
        }
      <Footer />
    </div>
  )
}

export default Layout