var gulp = require('gulp');
var jade = require('gulp-jade');
var minifyHtml = require('gulp-minify-html');
var prettify = require('gulp-html-prettify');
var data = require('gulp-data');
var fs = require('fs');

var _appDataURL = './develop/bonny.config.json';

var handleError = function (err) {
  console.error( err.toString() );
}

var paths = {
  templates: './develop/pages/*.jade',
};

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync(_appDataURL));
    }))
    .pipe(jade())
    .on('error', handleError)
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch([paths.templates, _appDataURL], ['templates']);
});

gulp.task('default', ['watch', 'templates']);