import { translate } from './translator'

var Vue

var data = {
  lang: { value: '' },
  locales: {}
}

class Locale {
  constructor (locales, lang = 'en') {
    if (!Locale.installed) {
      throw new Error(
        'Please install the VueLocale with Vue.use() before creating an instance.'
      )
    }

    data.lang.value = lang
    data.locales = locales

    Vue.util.defineReactive({}, null, data.lang)

    Vue.prototype.$lang = function (path, repls) {
      return translate(data.locales, data.lang.value, path, repls) || path
    }

    Vue.prototype.$lang.change = this.change.bind(this)
  }

  change (lang) {
    if (data.lang.value === lang) return

    data.lang.value = lang
  }
}

Locale.installed = false

Locale.install = (vue) => {
  Vue = vue
  Locale.installed = true
}

export default Locale
