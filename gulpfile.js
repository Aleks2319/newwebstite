const gulp = require('gulp'),
    minifyCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    minifyJS = require('gulp-minify'),
    browserSync = require('browser-sync').create();

gulp.task('minCss', async function() {
    return gulp.src('app/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({ 
            suffix: '.min' 
        }))
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.stream());
});

gulp.task('minJs', function() {
    return gulp.src('app/js/*.js')
        .pipe(minifyJS({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('docs/js'))
        .pipe(browserSync.stream());
});

gulp.task('watchAll', function() {
    gulp.watch('app/css/*.scss', gulp.series('minCss'));
    gulp.watch('app/js/*.js', gulp.series('minJs'));
});

gulp.task('browserSync', async function(done) {
    browserSync.init({
        server: "docs/"
    });

    gulp.watch("docs/*.html").on('change', browserSync.reload);
    done();
});

gulp.task('default', gulp.parallel('browserSync', 'watchAll'));