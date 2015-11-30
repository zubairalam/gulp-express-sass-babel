var gulp = require('gulp');
// var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-ruby-sass') 
var notify = require("gulp-notify") 
var bower = require('gulp-bower');

var config = {
     sassPath: './public/stylesheets/sass',
     bowerDir: './bower_components' 
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('css', function() { 
    return sass('./public/stylesheets/sass/**/*.{scss,sass}', {
            sourcemap: true,
             style: 'compressed',
             loadPath: [
                 './public/stylesheets/scss',
                 config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                 config.bowerDir + '/font-awesome/scss',
             ]
         }) .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             })) 
        // For inline sourcemaps
        .pipe(sourcemaps.write())

        // For file sourcemaps
        .pipe(sourcemaps.write('maps', {
          includeContent: false,
          sourceRoot: 'source'
        }))
         .pipe(gulp.dest('./public/stylesheets/css')); 
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
  gulp.watch('./public/stylesheets/scss/**/*.{scss,sass}', ['sass'])
})

gulp.task('default', ['bower', 'icons', 'css', 'express', 'watch'], function () {

})
