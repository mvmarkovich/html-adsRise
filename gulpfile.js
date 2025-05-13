(function () {
  'use strict';

  const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglifyJs = require('gulp-uglifyes'),
    uglifycss = require('gulp-uglifycss'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    sugarss = require('sugarss'),
    watch = require('gulp-watch'),
    cached = require('gulp-cached'),
    gulpWatchPug = require('gulp-watch-pug'),
    cssbeautify = require('gulp-cssbeautify'),
    stripCssComments = require('gulp-strip-css-comments'),
    cssDeclarationSorter = require('css-declaration-sorter'),
    webp = require('gulp-webp');

  //write html by pug
  gulp.task('views', function buildHTML() {
    return gulp
      .src('app/assets/views/*.pug')
      .pipe(
        pug({
          pretty: true
        })
      )
      .pipe(gulp.dest('dest/'));
  });

  const processors = [
    require('postcss-import'),
    require('postcss-alias'),
    require('postcss-for'),
    require('postcss-each'),
    require('postcss-assets')({
      loadPaths: ['img/', 'img/about', 'img/icons'],
      basePath: 'dest/',
      relative: 'styles/'
    }),
    require('postcss-nested-ancestors'),
    require('postcss-nested'),
    require('postcss-inline-media'),
    require('postcss-short-spacing'),
    require('postcss-size'),
    require('postcss-position'),
    require('postcss-flexbox'),
    require('postcss-simple-vars'),
    require('postcss-short-text'),
    require('postcss-responsive-type'),
    require('postcss-extend'),
    require('postcss-mixins'),
    require('postcss-inline-svg')({
      path: 'app/assets/img/'
    }),
    require('postcss-unique-selectors'),
    require('css-mqpacker')({
      sort: true
    }),
    require('postcss-sorting')
  ];

  //write style
  gulp.task('postcss', function () {
    return (
      gulp
      .src(['app/styles/**.sss'])
      .pipe(sourcemaps.init())
      .pipe(
        postcss(processors, {
          parser: sugarss
        }).on('error', notify.onError())
      )
      .pipe(
        cssbeautify({
          indent: '  ',
          autosemicolon: true
        })
      )
      .pipe(rename({
        extname: '.css'
      }))
      //.pipe(sourcemaps.write('/'))
      // .pipe(uglifycss())
      .pipe(gulp.dest('dest/styles/'))
    );
  });

  // write js
  gulp.task('scripts', function () {
    return gulp.src('app/scripts/**').pipe(gulp.dest('dest/scripts'));
  });

  //copy all assets files
  gulp.task('assets', function () {
    return gulp
      .src('app/assets/**', {
        since: gulp.lastRun('assets')
      })
      // .pipe(webp())
      .pipe(cached('app/assets'))
      .pipe(gulp.dest('dest'));
  });

  //watching by all files in dest
  gulp.task('watch', function () {
    gulp.watch(['app/styles/**/*.*'], gulp.series('postcss'));
    gulp.watch('app/scripts/**/*.*', gulp.series('scripts'));
    gulp.watch('app/assets/**/*.*', gulp.series('assets'));
    gulp.watch('app/assets/views/**/*.*', gulp.series('views'));
  });

})();