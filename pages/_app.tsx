import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/general/Layout";
import Script from "next/script";

import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { initializeCookieConsent } from "../model/client-side/general/CookiesFunctions";
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
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <Layout>
              <ReactQueryDevtools initialIsOpen={false} />
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
