import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { useEffect } from 'react'
import TagManager, { TagManagerArgs } from 'react-gtm-module';

export default function Document() {

  const tagManagerArgs: TagManagerArgs = {
    gtmId: 'GTM-KGH696Z',



  }

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)


  }, [])


  return (
    <Html>
      <Head>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-S080YZKD48');
        `}
        </Script>
        <Script
          src="https://www.google-analytics.com/analytics.js"
          strategy="afterInteractive"
        />

      </Head>
      <body>
        {/* <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KGH696Z"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript> */}
        <Main />
        <NextScript />
      </body>
    </Html >
  )
}