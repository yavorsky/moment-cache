const version = '0.1.0';
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

  const getFromCache = (key, clone) => {
    const cache = _cache[key];
    if (cache == null) {
      return;
    } else {
      return clone ? _cache[key].clone() : _cache[key];
    }
  };

  const addToCache = (key, date, format, clone) => {
     const added = _cache[key] = toMoment(date, format, true);
     return clone ? added.clone() : added;
  };

  const getCache = (date, format, clone) => {
    let result;
    if (clone == null) clone = true;
    if (typeof format === 'boolean') clone = format;
    const key = getKey(date);
    if (key) {
      result = getFromCache(key, clone) || addToCache(key, date, format, clone);
    } else {
      result = toMoment(date, format, clone);
    }
    return result;
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

  getCache.version = version;

  const momentCache = moment.fn.cache = getCache;

  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = momentCache :
    typeof define === 'function' && define.amd ? define(momentCache) :
      scope != null ? scope.momentCache = momentCache : null;

})(initial, this);