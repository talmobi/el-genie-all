var gulp = require('gulp'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject');

gulp.task('js', function(callback) {
  var src = 'js/*.js/',
      dst = 'dist/js/';

  gulp.src(src)
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .gulp.dest(dst);

  callback();
});

gulp.task('css', function(callback) {
  var src = 'css/*',
      dst = 'dist/css/';

  gulp.src(src)
      .pipe(gulp.dest(dst));

  callback();
});

gulp.task('images', function() {
  var src = 'img/*',
      dst = './dist/img/';

  return gulp.src(src)
          .pipe(imagemin())
          .pipe(gulp.dest(dst));
});

gulp.task('inject', ['js', 'css'], function() {
  var target = gulp.src('index.html');
  var sources = gulp.src(['dist/js/*.js', 'dist/css/*.css'], {read: false});

  return target.pipe(inject(sources, {relative: true}))
          .pipe(gulp.dest('dist/'));
});