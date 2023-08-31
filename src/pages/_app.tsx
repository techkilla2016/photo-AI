import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div className='main'>
    <div className="main-container">
      {/* <div className="logo">
        <img src='/logo.png' />
      </div> */}
      <Component {...pageProps} />
    </div>
  </div>
}
