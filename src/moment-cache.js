(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

if (typeof require !== 'undefined' && (typeof moment === 'undefined' || moment === null)) {
  moment = require('moment');
}

(function (moment, root) {
  'use strict';

  var _cache = {};
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
    var toMoment = function toMoment(date, format) {
      var momentResult = moment(date, format);
      return clone ? momentResult.clone() : momentResult;
    };
    return key ? _cache[key] || (_cache[key] = toMoment(date, format)) : toMoment(date, format);
  };

  for (key in moment) {
    if (moment.hasOwnProperty(key)) getCache[key] = moment[key];
  }

  // const cached = moment().cache()
  var momentCache = moment.fn.cache = function (opts) {
    if (opts == null) opts = {};
    initCache(opts);
    return getCache;
  };

  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = momentCache : typeof define === 'function' && define.amd ? define(momentCache) : root.momentCache = momentCache;
})(moment, undefined);

},{"moment":2}],2:[function(require,module,exports){

},{}]},{},[1]);
