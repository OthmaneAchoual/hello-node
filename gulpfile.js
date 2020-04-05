const {
  src, dest, watch,
} = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const log = require('gulplog');
const glob = require('glob');
const es = require('event-stream');
const path = require('path');

function style() {
  return src('src/client/scss/**/*.scss')
    .pipe(sass.sync())
    .on('error', sass.logError)
    .pipe(dest('dist/css'));
}

function bundle(done) {
  glob('src/client/js/*.js', (err, files) => {
    if (err) done(err);

    const tasks = files.map((entry) => browserify({ entries: [entry], debug: true })
      .bundle()
      .pipe(source(path.basename(entry)))
      .pipe(rename({
        extname: '.bundle.js',
      }))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(terser())
      .on('error', log.error)
      .pipe(sourcemaps.write('./'))
      .pipe(dest('dist/js')));

    es.merge(tasks).on('end', done);
  });
}

exports.default = function () {
  watch('src/client/scss/*.scss', style);
  watch('src/client/js/*.js', bundle);
};
