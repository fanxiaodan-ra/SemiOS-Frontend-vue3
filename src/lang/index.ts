import { createI18n } from 'vue-i18n'
// import EN from './en.json'
// import ZH from './zh.json'
import en from './en'
import zh from './zh'
const messages = {
  en,
  zh,
}
const i18n: any = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages,
})

export default i18n
