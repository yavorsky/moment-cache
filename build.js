var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

try {
  fs.mkdirSync('./src');
} catch(e) {
  if ( e.code != 'EEXIST' ) throw e;
}

browserify("./lib")
	.ignore('moment')
  .transform(babelify, ({presets: ["es2015"]}))
  .bundle()
  .pipe(fs.createWriteStream("src/moment-cache.js"));