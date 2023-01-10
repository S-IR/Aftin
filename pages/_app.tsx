import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/general/Layout'
import Script from "next/script"

import { Provider } from 'react-redux'
import { store } from '../Redux/store'
import { Hydrate, QueryClient, QueryClientProvider, } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url:string) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);



  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 20 * 1000
        }
      }
    })
  );



  return (
    <>

      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-S080YZKD48" />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S080YZKD48', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />

      {/* react query code */}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store} >
            <Layout>
              <ReactQueryDevtools initialIsOpen={false} />
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
export default MyApp
