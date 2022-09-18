import { useState } from 'react'
import { useRouter } from 'next/router'

const useI18n = () => {
  const [lang, setLang] = useState('zh-CN')
  const router = useRouter()
  const { pathname, asPath, query } = router
  const LanguageList = [
    {
      label: '中文(简体)',
      locale: 'zh-CN',
    },
    {
      label: 'English',
      locale: 'en-US',
    },
  ]
  // TODO bug
  const handleSetLang = (selectedLocale: string) => {
    setLang(() => selectedLocale)
    console.log(lang, 'lang20')

    router.push({ pathname, query }, asPath, { locale: selectedLocale })
  }
  return {
    LanguageList,
    handleSetLang,
    lang,
  }
}

export default useI18n
