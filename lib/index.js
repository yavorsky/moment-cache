let initial = typeof moment !== 'undefined' ? moment : null;

if (typeof require !== 'undefined' && (typeof moment === 'undefined' || moment === null) ) {
  initial = require('moment') || initial;
}

(function(moment, scope) {
  'use strict';
  
  if (scope == null) {
    if (typeof self != 'undefined') {
      scope = self;
    } else if (typeof root != 'undefined') {
      scope = root;
    }
  }

  let _cache = {};
  let _prevCache = null;

  const toMoment = (date, format, clone) => {
    const momentResult = moment(date, format);
    return clone ? momentResult.clone() : momentResult;
  }

  const initCache = opts => {
    if (opts.storage) {
      if (_prevCache == null) _prevCache = _cache;
      _cache = opts.storage;
    }
  }

  const getKey = (date, format) => {
    const dateType = typeof date;
    if (dateType === 'string') {
      const currentKey = Date.parse(date);
      if (format) {
        return isNaN(currentKey) ? date : currentKey.toString();
      } else {
        return currentKey.toString();
      }
    } else if (dateType === 'number') {
      const currentDate = new Date(date);
      return currentDate.valueOf().toString();
    } else if (date instanceof Date) {
      return date.valueOf().toString();
    } else {
      return null;
    }
  };

  getCache.version = '0.1.0-beta.1';

  const getCache = (date, format, clone) => {
    if (clone == null) clone = true;
    if (typeof format === 'boolean') clone = format;
    const key = getKey(date);
    return key ? (_cache[key] || (_cache[key] = toMoment(date, format, clone))) : toMoment(date, format, clone);
  };

  for (let key in moment) {
    if (moment.hasOwnProperty(key)) getCache[key] = moment[key];
  }

  getCache.updateStorage = (storage) => {
    if (storage == null && _prevCache) {
      storage = _prevCache;
    };
    initCache({storage});
    return getCache;
  };

  const momentCache = moment.fn.cache = getCache;

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = momentCache :
    typeof define === 'function' && define.amd ? define(momentCache) :
      scope != null ? scope.momentCache = momentCache : null;

})(initial, this);