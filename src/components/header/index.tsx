import { Select } from '$/components/select'
import useI18n from '$/hooks/use-i18n'
export default function Header() {
  const { lang, handleSetLang, LanguageList } = useI18n()
  return (
    <>
      <div className='m-auto w-auto flex justify-end'>
        <div className='w-[35vmin]'>
          <Select<any>
            value={lang}
            label={``}
            onChange={locale => {
              handleSetLang(locale)
            }}
            className='w-full'
          >
            {/* 渲染选择器配置时，如果是第一个，则使用i18n的方式渲染label */}
            {LanguageList.map(({ label, locale }) => (
              <Select.Option key={locale} value={locale}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </>
  )
}
