var moment;
if ( typeof require !== 'undefined' ) {
  moment = require('moment');
}

(function(moment) {
	let _cache = {};
	const initCache = opts => {
		if (opts.storage) {
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
 	  	const currentDate = new Date(dateType);
 	  	return currentDate.valueOf().toString();
		} else if (date instanceof Date) {
			return date.valueOf().toString();
		} else {
			return null;
		}
	};

	const getCache = (date, format, clone=true) => {
		if (typeof format === 'boolean') clone = format;
		const key = getKey(date);
		const toMoment = (date, format) => {
			const momentResult = moment(date, format);
			return clone ? momentResult.clone() : momentResult;
		}
		return key ? (_cache[key] || (_cache[key] = toMoment(date, format))) : toMoment(date, format);
	};

// const cached = moment().cache()
	const momentCache = moment.fn.cache = (opts={}) => {
		initCache(opts);
		return getCache;
	};

	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = momentCache :
    typeof define === 'function' && define.amd ? define(momentCache) :
      this.momentCache = momentCache;

})(moment);