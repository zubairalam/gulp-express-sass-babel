const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglifyjs');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

var config = {
  bowerDir: './bower_components',
  publicDir: './public',
};

gulp.task('fonts', function() {
  return gulp.src([
    config.bowerDir + '/bootstrap-sass/assets/fonts/**/*',
  ])
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('vendor_js', function() {
  return gulp.src([
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.publicDir + '/javascripts'));
});

gulp.task('js', () => {
  return gulp.src([
    config.publicDir + '/javascripts/app/**/*.js',
  ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
          }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.publicDir + '/javascripts'));
});

gulp.task('css', function() {
  return gulp.src('./public/stylesheets/sass/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.publicDir + '/stylesheets/css'));
});

gulp.task('express', function () {
    // var app = express();
    // app.use(express.static(__dirname));
    // app.listen(4000, '0.0.0.0');

    var app = require('./app');
    app.listen(4000, '0.0.0.0');
});

// gulp.task('sass', function() {
//   gulp.src('./public/stylesheets/scss/**/*.{scss,sass}')
//     // Initializes sourcemaps
//     .pipe(sourcemaps.init())
//     .pipe(sass({
//       errLogToConsole: true
//       }))
//     // Writes sourcemaps into the CSS file
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('./public/stylesheets/css'));
// })

gulp.task('watch', function() {
  // Watches the scss folder for all .scss and .sass files
  // If any file changes, run the sass task
  gulp.watch('./public/stylesheets/sass/**/*.{scss,sass}', ['css']);
  // gulp.watch(config.publicDir + '/javascripts/**/*.js', ['js']);
})

gulp.task('default', ['css', 'vendor_js', 'js', 'fonts', 'express', 'watch'], function () {

})

// gulp.task('default', ['css', 'js', 'fonts']);
