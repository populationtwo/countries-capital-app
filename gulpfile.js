// Include gulp
var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
// var sass = require('gulp-ruby-sass');

var paths = {
  scripts: [ 'app/**/*.js', '!app/bower_components/**/*.js' ],
  html: [
    './app/**/*.html',
    '!./app/index.html',
    '!./app/bower_components/**/*.html'
  ],
  index: './app/index.html',
  build: './build/',
    sass: './app/sass/*.scss'
}
/* 1 */
gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('clean', function(){
  gulp.src( paths.build, { read: false } )
    .pipe(clean());
});

gulp.task('copy', [ 'clean' ], function() {
  gulp.src( paths.html )
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', [ 'copy' ], function(){
  gulp.src( paths.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
      js: [ ngmin(), uglify() ]
    }))
    .pipe(gulp.dest( paths.build ))
});

gulp.task('build', ['usemin']);

// connect
gulp.task('connect', function() {
  connect.server({
    root: 'app/'
  });
});
gulp.task('default', ['connect', 'sass', 'watch']);
