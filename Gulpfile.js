/*
 * selena
 * https://github.com/enytc/selena
 *
 * Copyright (c) 2014 EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var imagemin = require('gulp-imagemin');
var stylus = require('gulp-stylus');
var roole = require("gulp-roole");
var coffee = require('gulp-coffee');
var mocha = require('gulp-mocha');
var stylish = require('jshint-stylish');

gulp.task('jshint', function() {
  // Validate All Javascripts
  return gulp.src(['./api/**/*.js', './lib/**/*.js', './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Compile Stylus
gulp.task('stylus', function() {
  gulp.src('./app/src/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./app/src/css'));
});

// Compile Roole
gulp.task('roole', function() {
  gulp.src("./app/src/roole/**/*.roo")
    .pipe(roole())
    .pipe(gulp.dest("./app/src/css"));
});

// Compile Coffeescript
gulp.task('coffee', function() {
  gulp.src('./app/src/coffee/**/*.coffee')
    .pipe(coffee({
      bare: true
    }).on('error', gutil.log))
    .pipe(gulp.dest('./app/src/js'));
});

// Minify Css
gulp.task('cssmin', function() {
  gulp.src('./app/src/css/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./app/assets/css'));
});

// Minify Javascript
gulp.task('jsmin', function() {
  gulp.src('./app/src/js/**/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest('./app/assets/js'));
});

//Compress images
gulp.task('imagemin', function() {
  gulp.src('./app/src/imgs/src/**/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('./app/assets/imgs'));
  gulp.src('./app/src/imgs/src/**/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./app/assets/imgs'));
});

// Copy all static images
gulp.task('mocha', function() {
  return gulp.src('./test/*.js')
    .pipe(mocha({
      globals: ['chai'],
      timeout: 6000,
      ignoreLeaks: false,
      ui: 'bdd',
      reporter: 'spec'
    }));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.js', './lib/**/*.js', './test/**/*.js'], ['jshint']);
  gulp.watch(['./app/src/stylus/**/*.styl'], ['stylus']);
  gulp.watch(['./app/src/roole/**/*.roo'], ['roole']);
  gulp.watch(['./app/src/coffee/**/*.coffee'], ['coffee']);
  gulp.watch(['./app/src/stylus/**/*.styl'], ['stylus']);
  gulp.watch(['./app/src/css/**/*.css'], ['cssmin']);
  gulp.watch(['./app/src/js/**/*.js'], ['jsmin']);
});

gulp.task('test', function() {
  gulp.run('mocha', function() {
    process.exit(0);
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['jshint', 'mocha', 'watch']);

gulp.task('build', ['stylus', 'cssmin', 'coffee', 'jsmin', 'imagemin']);