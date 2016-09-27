var gulp = require('gulp');
var jade = require('gulp-jade');
var minifyHtml = require('gulp-minify-html');
var prettify = require('gulp-html-prettify');
var data = require('gulp-data');
var fs = require('fs');
var config = require('./bonny.config').parse();

var _appDataURL = './bonny.config.js';

var handleError = function (err) {
  console.error( err.toString() );
}

var paths = {
  templates: [
    config.develop.src + '/pages/*.jade',
    '!' + config.develop.src + '/pages/template.jade'
  ],
};

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(data(function(file) {
      return eval(String(fs.readFileSync(_appDataURL)));
    }))
    .pipe(jade())
    .on('error', handleError)
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch(paths.templates.concat([_appDataURL]), ['templates']);
});

gulp.task('default', ['watch', 'templates']);
