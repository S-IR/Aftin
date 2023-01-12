import Cookies from 'js-cookie'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import * as gtag from '../lib/gtag'

export default function Document() {



  const ad_storage_consent: undefined | 'granted' | 'denied' | string = Cookies.get('ad_storage_consent')
  const analytics_storage_consent: undefined | 'granted' | 'denied' | string = Cookies.get('analytics_storage_consent')


  const isConsent = ad_storage_consent !== undefined && analytics_storage_consent !== undefined


  return (
    <Html>
      <Head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
          `,
          }}
        />
        {/* {isConsent &&
          <Script
            id="gtag-update"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
gtag('consent', 'update', {
  'ad_storage': ${ad_storage_consent},
  'analytics_storage': ${analytics_storage_consent}
});
        `,
            }}
          /> */}


      </Head>
      <body>

        <Main />
        <NextScript />

      </body>
    </Html >
  )
}