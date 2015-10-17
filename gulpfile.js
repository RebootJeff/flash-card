'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var webserver = require('gulp-webserver');


gulp.task('clean-scripts', function() {
  del('./public/bundle.js');
});

gulp.task('clean-styles', function() {
  del('./public/main.css');
});

gulp.task('build-scripts', ['clean-scripts'], function() {
  return browserify({
    entries: ['./scripts/app.js']
  })
  .bundle()
  .pipe(source('bundle.js'))
  // .pipe(buffer())
      // Add transformation tasks to the pipeline here.
      // .pipe(uglify())
      // .on('error', gutil.log)
  // .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./public/'));
});

gulp.task('build-styles', ['clean-styles'], function() {
  return gulp.src('./styles/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['build-scripts', 'build-styles']);

gulp.task('watch', ['build'], function() {
  gulp.watch('./styles/**.styl', ['build-styles']);
  gulp.watch('./scripts/**.js', ['build-scripts']);
});

gulp.task('run', ['watch'], function() {
  return gulp.src('public')
    .pipe(webserver({
      port: 3000
    }));
});


gulp.task('default', ['run']);
