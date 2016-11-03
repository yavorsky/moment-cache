'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var version = '0.1.0';
var initial = typeof moment !== 'undefined' ? moment : null;

if (typeof require !== 'undefined' && (typeof moment === 'undefined' || moment === null)) {
  initial = require('moment') || initial;
}

(function (moment, scope) {
  'use strict';

  if (scope == null) {
    if (typeof self != 'undefined') {
      scope = self;
    } else if (typeof root != 'undefined') {
      scope = root;
    }
  }

  var _cache = {};
  var _prevCache = null;

  var toMoment = function toMoment(date, format, clone) {
    var momentResult = moment(date, format);
    return clone ? momentResult.clone() : momentResult;
  };

  var initCache = function initCache(opts) {
    if (opts.storage) {
      if (_prevCache == null) _prevCache = _cache;
      _cache = opts.storage;
    }
  };

  var getKey = function getKey(date, format) {
    var dateType = typeof date === 'undefined' ? 'undefined' : _typeof(date);
    if (dateType === 'string') {
      var currentKey = new Date(date);
      if (format) {
        return isNaN(currentKey) ? date : currentKey.toString();
      } else {
        return currentKey.toString();
      }
    } else if (dateType === 'number') {
      var currentDate = new Date(date);
      return currentDate.toString();
    } else if (date instanceof Date) {
      return date.toString();
    } else {
      return null;
    }
  };

  var getFromCache = function getFromCache(key, clone) {
    var cache = _cache[key];
    if (cache == null) {
      return;
    } else {
      return clone ? _cache[key].clone() : _cache[key];
    }
  };

  var addToCache = function addToCache(key, date, format, clone) {
    var added = _cache[key] = toMoment(date, format, true);
    return clone ? added.clone() : added;
  };

  var getCache = function getCache(date, format, clone) {
    var result = void 0;
    if (clone == null) clone = true;
    if (typeof format === 'boolean') clone = format;
    var key = getKey(date);
    if (key) {
      result = getFromCache(key, clone) || addToCache(key, date, format, clone);
    } else {
      result = toMoment(date, format, clone);
    }
    return result;
  };

  for (var key in moment) {
    if (moment.hasOwnProperty(key)) getCache[key] = moment[key];
  }

  getCache.updateStorage = function (storage) {
    if (storage == null && _prevCache) {
      storage = _prevCache;
    };
    initCache({ storage: storage });
    return getCache;
  };

  getCache.version = version;

  var momentCache = moment.fn.cache = getCache;

  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = momentCache : typeof define === 'function' && define.amd ? define(momentCache) : scope != null ? scope.momentCache = momentCache : null;
})(initial, undefined);
