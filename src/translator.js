var search = (locale, path) => {
  return locale && path.length
    ? search(locale[path.shift()], path)
    : locale
}

export function translate (locales, lang, path) {
  return locales && search(locales[lang], path.split('.'))
}
