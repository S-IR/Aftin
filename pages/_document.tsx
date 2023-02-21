import Cookies from "js-cookie";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  console.log('GTM_ID', GTM_ID)

  return (
    <Html>
      <Head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GTM_ID}', {
            page_path: window.location.pathname,
          });
          gtag('consent', 'default', {
            functionality_storage: 'denied',
            ad_storage: 'denied',
            analytics_storage: 'denied',
            security_storage: 'denied'
          });

        `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
