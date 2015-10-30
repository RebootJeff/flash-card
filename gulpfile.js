'use strict';

var browserify = require('browserify');
var del = require('del');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');


gulp.task('clean-scripts', function() {
  del('./public/bundle.js');
});

gulp.task('clean-styles', function() {
  del('./public/main.css');
});

gulp.task('build-scripts', ['clean-scripts'], function() {
  return browserify({
    entries: ['./client/scripts/app.js']
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
  return gulp.src('./client/styles/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['build-scripts', 'build-styles']);

gulp.task('watch', ['build'], function() {
  gulp.watch('./client/styles/**.styl', ['build-styles']);
  gulp.watch('./client/scripts/**.js', ['build-scripts']);
});

gulp.task('server', ['build', 'watch'], function() {
  return nodemon({
    script: 'server.js'
  })
  .on('restart', function() {
    console.log('Nodemon restarted the server!');
  });
});


gulp.task('default', ['server']);
