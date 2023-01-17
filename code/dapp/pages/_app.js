import '../styles/globals.css'
import ToastProvider from '../context/toast/toast-provider'

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  )
}

export default MyApp
