'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    combine = require('stream-combiner2'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minCss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),

    path = require('path');


// Params, params.
var siteRoot = 'site/',
    buildRoot = 'build/',

    jsPackageName = 'app.min.js',

    anything = '**/*',

    jsSrc = path.join(siteRoot, 'js/'),
    scssSrc = path.join(siteRoot, 'scss/'),
    templatesSrc = path.join(siteRoot, 'templates/'),
    imagesSrc = path.join(siteRoot, 'images/'),
    dataSrc = path.join(siteRoot, 'data/'),

    jsDest = path.join(buildRoot, 'js/'),
    cssDest = path.join(buildRoot, 'css/'),

    jsEntryPoint = path.join(jsSrc, 'main.js'),
    scssEntryPoint = path.join(scssSrc, 'styles.scss'),
    sassIncludes = [],

    watchJs = path.join(jsSrc, anything + '.js'),
    watchScss = [path.join(scssSrc, anything + '.scss')].concat(sassIncludes),
    watchTemplates = [path.join(templatesSrc, anything + '.jade'),
                      path.join(dataSrc, anything + '.json')],
    watchImages = path.join(imagesSrc, anything),
    watchBuilt = ['js/**/*.js', 'css/**/*.css', '**/*.html', 'images/**/*']
      .map(function (each) { return path.join(buildRoot, each); });


// JS pipeline

var b = browserify({
  entries: jsEntryPoint,
  debug: true,
  cache: {},
  packageCache: {}
});

b.transform('brfs');

gulp.task('js', function () {
  return combine(
      b.bundle(),
      source(jsPackageName),
      buffer(),
      sourcemaps.init({
        loadMaps: true
      }),
      // Sourcemapped transforms here.
      uglify(),
      // End sourcemapped transforms.
      sourcemaps.write('.'),
      gulp.dest(jsDest))
    .on('error', gutil.log);
});


// CSS pipeline

gulp.task('sass', function () {
  return combine(
      gulp.src(scssEntryPoint),
      sourcemaps.init({
        loadMaps: true
      }),
      // Sourcemapped transforms here.
      sass({
        includePaths: sassIncludes
      }),
      autoprefixer(),
      minCss(),
      // End sourcemapped transforms.
      sourcemaps.write('.'),
      gulp.dest(cssDest))
    .on('error', gutil.log);
});


// Comprehensive build

gulp.task('build', ['js', 'sass']);


// Continuous build

gulp.task('watch', ['build'], function () {
  b = watchify(b);

  gulp.watch(watchJs, ['js']);
  gulp.watch(watchScss, ['sass']);
  gulp.watch(watchTemplates, ['html']);
  gulp.watch(watchImages, ['images']);

  browserSync({
    server: {
      baseDir: buildRoot
    }
  });
  gulp.watch(watchBuilt, browserSync.reload).on('error', gutil.log);
});
