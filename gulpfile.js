const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
// const uglify = require('gulp-uglify');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const log = require('gulplog');

function style() {
  return src('src/client/scss/**/*.scss')
    .pipe(sass.sync())
    .on('error', sass.logError)
    .pipe(dest('dist/css'));
}

const b = browserify({
  entries: 'src/client/js/main.js',
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify],
});

function bundle() {
  // set up the browserify instance on a task basis

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    // Add transformation tasks to the pipeline here.
    .pipe(terser())
    .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/js/'));
}

b.on('update', bundle);
b.on('log', log.info);

// function defaultTask(cb) {
//   // place code for your default task here
//   cb();
// }

exports.default = parallel(style, bundle);
