import { Html, Head, Main, NextScript } from 'next/document'
import { useTranslation } from 'next-i18next';

export default function Document() {
  const { t } = useTranslation('common')
  return (
    <Html>
      <Head>
      {/* <meta name='application-name' content={t('title')} /> */}
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      {/* <meta name='apple-mobile-web-app-title' content={t('title')} /> */}
      {/* <meta name='description' content={t('description')} /> */}
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='theme-color' content='#07c160' />

      <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
      <link rel='manifest' href='/manifest.json' />
      </Head>
      <body className="bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
