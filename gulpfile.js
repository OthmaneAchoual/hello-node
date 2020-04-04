const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
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


function js() {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: 'src/client/js/main.js',
    debug: true,
  });

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

// function defaultTask(cb) {
//   // place code for your default task here
//   cb();
// }

exports.default = parallel(style, js);
