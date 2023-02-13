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
// import TagManager, { TagManagerArgs } from "react-gtm-module";

function MyApp({ Component, pageProps }: AppProps) {
  // const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";
  // const tagManagersArgs: TagManagerArgs = {
  //   gtmId,
  // };

  // useEffect(() => {
  //   TagManager.initialize(tagManagersArgs);
  //   gtag("consent", "default", {
  //     functionality_storage: "granted",
  //     ad_storage: "granted",
  //     analytics_storage: "granted",
  //     security_storage: "granted",
  //   });
  // }, []);

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
