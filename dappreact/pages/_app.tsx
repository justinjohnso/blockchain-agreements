import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import {AccountProvider} from '../context/accountContext';
import {configureWeb3} from '../utils/configureWeb3';
import Web3 from 'web3';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
