# moment-cache

### Moment-cache is moment.js-depended tool to speed up your application.

During the app lifecycle we can call moment oftentimes. Every call is time. Time is **performance**. This tool will increase performance of your app by **caching** moment.js instances.

### Why?

```javascript

	import moment from 'moment';
	import cache  from 'moment-cache';
	const cachcable = cache();

	const dateString = '2016-08-24';
	const momentCalls = 99999;

	const check = (instance) => {
		let i = 0;
		const start = new Date;
		while (i <= momentCalls) {
			instance(dateString);
			i++;
		}
		return new Date - start;
	}

	console.log(check(moment)); 	 // ~1588 ms
	console.log(check(cacheable)); // ~35 ms

```

### Syntax: 

```javascript

	import moment from 'moment';
	const cache = moment().cache(options);
	const date = cache('2016-06-28');

```
	
#### Options:

 * **storage**: object where cache data is stored. By default - covert object behind the scenes.
