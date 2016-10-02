var gulp = require('gulp');
var jade = require('gulp-jade');
var minifyHtml = require('gulp-minify-html');
var prettify = require('gulp-html-prettify');
var data = require('gulp-data');
var rename = require('gulp-rename');
var fs = require('fs');
var config = require('./bonny.config').parse();

var _appDataURL = './bonny.config.js';
var templateFile = config.views.fullDevelopPath + '/_template.jade';
var localizationFiles = config.localization.fullDevelopPath + '/*.js';

var handleError = function (err) {
  console.error( err.toString() );
}

var outputFileExt = {
  laravel: ".blade.php"
}

var paths = {
  templates: [
    config.views.fullDevelopPath + '/*.jade', '!' + templateFile
  ],
};

gulp.task('templates', function() {
  console.log(config.views.fullBuildPath.slice( 0 , -1));
  return gulp.src(paths.templates)
    .pipe(data(function(file) {
      return eval(String(fs.readFileSync(_appDataURL)));
    }))
    .pipe(jade())
    .on('error', handleError)
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(rename(function(path){
      if(outputFileExt[config.original.setting.server]){
        path.extname = outputFileExt[config.original.setting.server];
      }
    }))
    .pipe(gulp.dest(config.views.fullBuildPath));
});

gulp.task('watch', function() {
  gulp.watch(paths.templates.concat([_appDataURL, templateFile, localizationFiles]), ['templates']);
});

gulp.task('default', ['watch', 'templates']);
