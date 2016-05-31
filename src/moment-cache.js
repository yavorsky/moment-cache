'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var moment = moment || null;

if (typeof require !== 'undefined' && (typeof moment === 'undefined' || moment === null)) {
  moment = require('moment');
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

  var toMoment = function toMoment(date, format, clone) {
    var momentResult = moment(date, format);
    return clone ? momentResult.clone() : momentResult;
  };

  var initCache = function initCache(opts) {
    if (opts.storage) {
      _cache = opts.storage;
    }
  };

  var getKey = function getKey(date, format) {
    var dateType = typeof date === 'undefined' ? 'undefined' : _typeof(date);
    if (dateType === 'string') {
      var currentKey = Date.parse(date);
      if (format) {
        return isNaN(currentKey) ? date : currentKey.toString();
      } else {
        return currentKey.toString();
      }
    } else if (dateType === 'number') {
      var currentDate = new Date(dateType);
      return currentDate.valueOf().toString();
    } else if (date instanceof Date) {
      return date.valueOf().toString();
    } else {
      return null;
    }
  };

  var getCache = function getCache(date, format, clone) {
    if (clone == null) clone = true;
    if (typeof format === 'boolean') clone = format;
    var key = getKey(date);
    return key ? _cache[key] || (_cache[key] = toMoment(date, format, clone)) : toMoment(date, format, clone);
  };

  for (var key in moment) {
    if (moment.hasOwnProperty(key)) getCache[key] = moment[key];
  }

  var momentCache = moment.fn.cache = function (opts) {
    if (opts == null) opts = {};
    initCache(opts);
    return getCache;
  };

  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = momentCache : typeof define === 'function' && define.amd ? define(momentCache) : scope != null ? scope.momentCache = momentCache : null;
})(moment, undefined);
