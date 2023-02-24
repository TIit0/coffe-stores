import '@/styles/globals.css'
import Footer from '@/src/components/Footer/Footer';

export default function App({ Component, pageProps }) {
  return (
    <>
    <Component {...pageProps} />
    </>
  );
}
