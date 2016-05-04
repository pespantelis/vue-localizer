'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translate = translate;
var search = function search(locale, path) {
  return locale && path.length ? search(locale[path.shift()], path) : locale;
};

var replace = function replace(entry, repls) {
  if (!repls) return entry;

  return entry.replace(/{(\w+)}/g, function (match, index) {
    return repls[index] !== undefined ? repls[index] : match;
  });
};

function translate(locales, lang, path, repls) {
  if (!locales) return;

  var entry = search(locales[lang], path.split('.'));

  if (typeof entry === 'string') {
    return replace(entry, repls);
  }
}