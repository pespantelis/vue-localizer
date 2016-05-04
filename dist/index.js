'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _translator = require('./translator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vue;

var data = {
  _lang: { value: '' },

  locales: {},

  get lang() {
    return this._lang.value;
  },

  set lang(value) {
    this._lang.value = value;
  }
};

var Localizer = function () {
  function Localizer() {
    var locales = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var lang = arguments.length <= 1 || arguments[1] === undefined ? 'en' : arguments[1];
    (0, _classCallCheck3.default)(this, Localizer);

    if (!Localizer.installed) {
      throw new Error('Please install the Localizer with Vue.use() before creating an instance.');
    }

    data.lang = lang;
    data.locales = locales;

    Vue.util.defineReactive({}, null, data._lang);

    Vue.prototype.$lang = function (path, repls) {
      // search for the path 'locally'
      return (0, _translator.translate)(this.$options.locales, data.lang, path, repls)
      // search for the path 'globally'
       || (0, _translator.translate)(data.locales, data.lang, path, repls)
      // if the path does not exist, return the path
       || path;
    };

    (0, _assign2.default)(Vue.prototype.$lang, {
      change: this.change,
      get: function get() {
        return data.lang;
      }
    });
  }

  (0, _createClass3.default)(Localizer, [{
    key: 'change',
    value: function change(lang) {
      if (data.lang === lang) return;

      this._before && this._before(data.lang);

      data.lang = lang;

      this._after && this._after(data.lang);
    }
  }, {
    key: 'beforeChange',
    value: function beforeChange(fn) {
      this._before = fn;
    }
  }, {
    key: 'afterChange',
    value: function afterChange(fn) {
      this._after = fn;
    }
  }]);
  return Localizer;
}();

Localizer.installed = false;

Localizer.install = function (vue) {
  Vue = vue;
  Localizer.installed = true;
};

exports.default = Localizer;