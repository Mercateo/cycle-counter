var babelify = require('babelify');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
//var uglify = require('gulp-uglify');
var assign = require('lodash.assign');
var watchify = require('watchify');

gulp.task('build-css', function() {
  return gulp.src('src/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('build-html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

var options = assign({}, watchify.args, {
  entries: './src/main.js',
  debug: true
});
var bundler = watchify(browserify(options));
bundler.transform(babelify);

bundler.on('update', buildJs);
bundler.on('log', gutil.log);
gulp.task('build-js', buildJs);

function buildJs() {
  return bundler
    .bundle()
    .on('error', gutil.log)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
    //.pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

gulp.task('build', [ 'build-js', 'build-css', 'build-html' ]);

gulp.task('serve', [ 'build' ], function() {
  browserSync.init({
    server: {
      notify: false,
      baseDir: 'dist'
    },
    open: false
  });
});

gulp.task('watch', [ 'serve' ], function() {
  gulp.watch([ 'src/**/*.html' ], [ 'build-html', browserSync.reload ]);
  gulp.watch([ 'src/**/*.less' ], [ 'build-css' ]);
  gulp.watch([ 'src/**/*.js' ], [ 'build-js', browserSync.reload ]);
});

gulp.task('default', [ 'watch' ]);
