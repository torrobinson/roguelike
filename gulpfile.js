//*********** IMPORTS *****************
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var gutil = require('gulp-util');
var rename = require("gulp-rename");
var map = require("map-stream");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
global.errorMessage = '';

//Install ruby-sass to use this
//Configuration - Change me
// var sassFiles = [
// 	{
// 		watch: '_scss/Site/**/*.scss',
// 		sass: '_scss/Site/site.scss',
// 		output: './www/app/View/Themed/Site/webroot/css',
// 		name: 'site.css',
// 	},
// 	{
// 		watch: '_scss/Admin/**/*.scss',
// 		sass: '_scss/Admin/admin.scss',
// 		output: './www/app/View/Themed/Admin/webroot/css',
// 		name: 'admin.min.css',
// 	}
// ];
var jsFiles = [
	{
		watch: 'js/game/**/*.js',
		output: './build/js/',
		name: 'game.js',
		nameMin: 'game.min.js'
	},
  {
		watch: 'js/rogue.js',
		output: './build/js/',
		name: 'rogue.js',
		nameMin: 'rogue.min.js'
	}
];
//END configuration


gulp.task('watch', function () {
	// for (var i in sassFiles) {
	// 	sassWatch(sassFiles[i]);
	// }

	for (var j in jsFiles) {
		scriptWatch(jsFiles[j]);
	}
});

// function sassWatch(sassData) {
// 	gulp.src(sassData.watch)
// 	.pipe(watch({glob:sassData.watch, emitOnGlob: true}, function() {
// 		gulp.src(sassData.sass)
// 		.pipe(sass(sassOptions))
// 		.on('error', function(err) {
// 				gutil.log(err.message);
// 				gutil.beep();
// 				global.errorMessage = err.message + " ";
// 		})
// 		.pipe(checkErrors())
// 		.pipe(rename(sassData.name))
// 		.pipe(gulp.dest(sassData.output))
// 		.pipe(livereload());
// 	}));
// }

function scriptWatch(jsData) {
	gulp.src(jsData.watch)
	.pipe(watch(jsData.watch, function() {
		gulp.src(jsData.watch)
		.pipe(concat(jsData.name))
		.pipe(gulp.dest(jsData.output))
    .pipe(babel({
           presets: ['es2015']
       }))
		.pipe(uglify({outSourceMap: false}))
		.pipe(rename(jsData.nameMin))
		.pipe(gulp.dest(jsData.output));

		// Copy over html files
		gulp.src('*.html').pipe(gulp.dest('build/'));
	}));
}

gulp.task('default', ['watch']);

// var sassOptions = {
// 	'style': 'compressed',
// 	'unixNewlines': true,
// 	'cacheLocation': '_scss/.sass_cache'
// };

// Does pretty printing of sass errors
// var checkErrors = function (obj) {
// 	function checkErrors(file, callback, errorMessage) {
// 		if (file.path.indexOf('.scss') != -1) {
// 				file.contents  = new Buffer("\
// 					body * { white-space:pre; }\
// 					body * { display: none!important; }\
// 					body:before {\
// 						white-space:pre;\
// 						content: '"+ global.errorMessage.replace(/(\\)/gm,"/").replace(/(\r\n|\n|\r)/gm,"\\A") +"';\
// 					}\
// 					html{background:#ccf!important; }\
// 				");
// 		}
// 		callback(null, file);
// 	}
// 	return map(checkErrors);
// };
