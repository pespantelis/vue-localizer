import { translate } from './translator'

var Vue

var data = {
  _lang: { value: '' },

  locales: {},

  get lang () {
    return this._lang.value
  },

  set lang (value) {
    this._lang.value = value
  }
}

class Locale {
  constructor (locales = {}, lang = 'en') {
    if (!Locale.installed) {
      throw new Error(
        'Please install the VueLocale with Vue.use() before creating an instance.'
      )
    }

    data.lang = lang
    data.locales = locales

    Vue.util.defineReactive({}, null, data._lang)

    Vue.prototype.$lang = function (path, repls) {
      // search for the path 'locally'
      return translate(this.$options.locales, data.lang, path, repls)
        // search for the path 'globally'
        || translate(data.locales, data.lang, path, repls)
        // if the path does not exist, return the path
        || path
    }

    Vue.prototype.$lang.change = this.change.bind(this)
  }

  change (lang) {
    if (data.lang === lang) return

    this._before && this._before(data.lang)

    data.lang = lang

    this._after && this._after(data.lang)
  }

  beforeChange (fn) {
    this._before = fn
  }

  afterChange (fn) {
    this._after = fn
  }
}

Locale.installed = false

Locale.install = (vue) => {
  Vue = vue
  Locale.installed = true
}

export default Locale
