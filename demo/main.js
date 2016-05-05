import Vue from 'vue'
import VueLocalizer from '../src/index'
import NProgress from 'nprogress'
import Child from './child.vue'

// install
Vue.use(VueLocalizer)

// global locales
var locales = {
  en: {
    name: {
      first: 'Pantelis',
      last: 'Peslis'
    },
    color: 'Blue'
  },
  el: {
    name: {
      first: 'Παντελής',
      last: 'Πεσλής'
    },
    color: 'Μπλε'
  }
}

// create an instance
var localizer = new VueLocalizer(locales)

// add hooks
localizer.beforeChange(NProgress.start)
localizer.afterChange(NProgress.done)

new Vue({
  el: 'body',
  data: {
    selected: 'en',
    globalLocales: locales
  },
  components: {
    Child
  },
  locales: {
    en: {
      color: 'Yellow',
      number: {
        list: 'Numbers: {0} 2 {1} 4'
      }
    },
    el: {
      color: 'Κίτρινο',
      number: {
        list: 'Αριθμοί: {0} 2 {1} 4'
      }
    }
  },
  methods: {
    change (lang) {
      this.$lang.change(lang)
      this.selected = lang
    },
    isSelected (lang) {
      return {
        'is-info': this.$lang.get() === lang
      }
    }
  }
})
