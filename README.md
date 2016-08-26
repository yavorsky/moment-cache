# moment-cache

### Moment-cache is moment.js-depended tool to speed up your application.

During the app lifecycle we can call moment oftentimes. Every call is time. Time is **performance**. This tool will increase performance of your app by **caching** moment.js instances.

### Why?

```javascript

  import moment from 'moment';
  import cache  from 'moment-cache';

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

  console.log(check(moment));    // ~1588 ms
  console.log(check(cache));     // ~35 ms

```

### Syntax: 

#### Arguments:
 
* date: See [moment/parse](http://momentjs.com/docs/#/parsing/).

* format: See [moment/format](http://momentjs.com/docs/#/parsing/string-format/).

* clone (by default - **true**): set *false* if you are not going to change instance in future. Will increase performance, but any object changes will affect cached result. See [moment/clone](http://momentjs.com/docs/#/parsing/moment-clone/).

```javascript

  import cache from 'moment-cache'; // or moment().cache
  const myDate = '06-28-2016';
  const format = 'MM-DD-YYYY';
  const date = cache(myDate, format); // moment.js cached instance
  const anotherDate = cache(myDate, format); // rapidly retrieving previously processed result from the cache

```
  
#### Methods:

**updateStorage**: change cache destination.  
 
###### **Arguments**:

* **storage**: object where cache data is stored. By default - covert object behind the scenes.

```javascript
  import cachable from 'moment-cache';
  const myStorage = {};
  cachable.updateStorage(myStorage);
  const date = cachable('2016-08-23');
  console.log(myStorage); // {1471899600000: Moment}
```
