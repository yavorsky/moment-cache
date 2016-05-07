# Moment-cache is moment.js-depended tool to speed up your application.

During the app lifecycle we can call moment oftentimes. Every call is time. Time is **performance**. This tool will increase performance of your app by **caching** moment.js instances.

### Why?

```javascript

	const moment = import 'moment';
	const cache = moment().cache()
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

	console.log(check(moment)) // ~1588 ms
	console.log(check(cache)) ~35 ms

```

### Syntax: 

```javascript

	const moment = import 'moment';
	const cache = moment().cache(options); // options is optional
	const date = cache('2016-06-28');

```
	
#### Options *(optional)*:
	*storage: object where cache data is stored. By default - covert object behind the scenes.
  


