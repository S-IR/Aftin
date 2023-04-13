import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/general/Layout";
import Script from "next/script";

import { Provider } from "react-redux";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { initializeCookieConsent } from "../model/client-side/general/CookiesFunctions";
import { DefaultSeo } from "next-seo";
// import TagManager, { TagManagerArgs } from "react-gtm-module";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeCookieConsent();
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20 * 1000,
          },
        },
      })
  );

  return (
    <>
      {/* react query code */}
      <QueryClientProvider client={queryClient}>
        <DefaultSeo
          openGraph={{
            url: "https://www.aftin.net/",
            locale: "en_us",
            title: "Aftin - The Graphic Persuader of the Food Industry",
            description:
              "Aftin is a graphic design library for unique, colorful and elegant restaurants. Express your restaurant through images",
            images: [
              {
                url: "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o/aftin-logo.png?alt=media&token=60fa0bee-a5c2-43bf-ae95-a933a6a8dd5d",
                width: 1200,
                height: 630,
                alt: "Aftin Logo",
                type: "image",
              },
            ],
            siteName: "aftin.net",
          }}
          twitter={{
            handle: "@Aftin",
            site: "@Aftin",
            cardType: "summary_large_image",
          }}
        />
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
