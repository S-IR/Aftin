import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'

import { Provider } from 'react-redux'
import { store } from '../Redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store} >
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
export default MyApp
