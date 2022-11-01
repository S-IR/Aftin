import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

import { Provider } from 'react-redux'
import { store } from '../Redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store} >
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}
export default MyApp
