import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ToastProvider } from '$/components/toast'
import { appWithTranslation } from 'next-i18next';
import '$/styles/globals.css'
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <ToastProvider>
  {getLayout(<Component {...pageProps} />)}
  </ToastProvider>
}

export default appWithTranslation(MyApp)
