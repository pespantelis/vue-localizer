var search = (locale, path) => {
  return locale && path.length
    ? search(locale[path.shift()], path)
    : locale
}

var replace = (entry, repls) => {
  if (!repls) return entry

  return entry.replace(/{(\w+)}/g, (match, index) => {
    return repls[index] ? repls[index] : match
  })
}

export function translate (locales, lang, path, repls) {
  if (!locales) return

  var entry = search(locales[lang], path.split('.'))

  if (typeof entry === 'string') {
    return replace(entry, repls)
  }
}
