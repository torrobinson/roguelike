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
var include = require("gulp-include");
var run = require('gulp-run');
var open = require('gulp-open');
var notify = require("gulp-notify");

var buildFolder = './build';

gulp.task('default', ['build']);

gulp.task('buildAndLaunch',['build'], function(){
    return gulp.src([buildFolder + '/game.html']).pipe(open());
});

gulp.task('art', function(){
    gulp.src(['art/**/*'])
    .pipe(gulp.dest(buildFolder + '/art'));
});

gulp.task('build', function(){
  // Include third party scripts
  gulp.src("./node_modules/pixi.js/dist/pixi.min.js")
      .pipe(include())
     .pipe(gulp.dest(buildFolder + "/js/"));
    gulp.src("./node_modules/pixi.js/dist/pixi.min.js.map")
      .pipe(include())
      .pipe(gulp.dest(buildFolder + "/js/"));
    gulp.src("./node_modules/pathfinding/visual/lib/pathfinding-browser.min.js")
     .pipe(include())
      .pipe(gulp.dest(buildFolder + "/js/"));

     // Copy over game client
     gulp.src(['game.html'])
     .pipe(gulp.dest(buildFolder));

     // Copy over game resources
     gulp.src(['art/**/*'])
     .pipe(gulp.dest(buildFolder + '/art'));

     // Compile typescript
     run('tsc').exec(function(){
          gulp.src([buildFolder + '/game.html'])
          .pipe(notify({title: 'Gulp',  message: 'Build finished', wait: false }));
     });
});
