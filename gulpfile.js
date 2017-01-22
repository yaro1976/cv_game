'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();
var jslint = require('gulp-jslint-simple');


// Jslint
gulp.task('lint', function () {
    gulp.src('public/src/js/**/*.js')
        .pipe(jslint.run({
            // project-wide JSLint options
            node: true,
            vars: true
        }))
        .pipe(jslint.report({
            // example of using a JSHint reporter
            reporter: require('jshint-stylish').reporter
        }));
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {

    browserSync.init({
        server: './public',
        browser: "google chrome",
        open: false
    });

    gulp.watch('public/src/scss/**/*.scss', ['sass']);
    gulp.watch('public/src/js/**/*.js', ['js']);
    gulp.watch('./public/*.html').on('change', browserSync.reload);
});

// Configure CSS tasks.
gulp.task('sass', function() {
    return gulp.src('public/src/scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/dist/css'))
        .pipe(browserSync.stream());
});

// Configure JS.
gulp.task('js', function() {
    return gulp.src('public/src/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/dist/js'))
        .pipe(browserSync.stream());
});

// Configure image stuff.
gulp.task('images', function() {
    return gulp.src('public/src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('public/dist/img'));
});

gulp.task('watch', function() {
    gulp.watch('public/src/scss/**/*.scss', ['sass']);
    gulp.watch('public/src/js/**/*.js', ['js']);
    gulp.watch('./public/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'lint','js', 'images', 'serve']);
