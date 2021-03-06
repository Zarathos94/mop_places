var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del');

var fs = require('fs');

// TODO:
// Add Watchers

var json = JSON.parse(fs.readFileSync('./package.json'));

var dependencies = [
    json.folders.components + '/angular/angular.js',
    json.folders.components + '/material-design-lite//material.js',
    json.folders.components + '/angular-cookies/angular-cookies.js',
    json.folders.components + '/angular-resource/angular-resource.js',
    json.folders.components + '/angular-sanitize/angular-sanitize.js',
    json.folders.components + '/angular-route/angular-route.js',
    json.folders.components + '/angular-animate/angular-animate.js',
    json.folders.components + '/angular-cookies/angular-cookies.js',
    json.folders.components + '/ngmap/build/scripts/ng-map.js',
    json.folders.components + '/jquery/dist/jquery.js',
    json.folders.components + '/bootstrap/dist/js/bootstrap.js',
    json.folders.components + '/material-design-lite/dist/js/material.js'
];

var depCSS = [
    json.folders.components + '/bootstrap/dist/css/bootstrap.css',
    json.folders.components + '/bootstrap/dist/css/bootstrap-theme.css',
    json.folders.components + '/material-design-lite/material.css'
];

gulp.task('compile_app', function() {

    gutil.log('Compiling main app js files...');
    gulp.src(['public/javascripts/**/*.js', 'public/javascripts/*.js'])
        //.pipe(sourcemaps.init())
        .pipe(concat('app_bundle.js'))
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/javascripts/dist'));
});


gulp.task('compile_dependencies', function() {

    return gulp.src(dependencies)

        .pipe(concat('app_deps.js'))
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/javascripts/dist'));
});

gulp.task('compile_scss', function () {

    return gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())  
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gutil.env.type === 'production' ? minifyCSS() : gutil.noop())
        .pipe(gulp.dest('public/css/dist'));
});


gulp.task('compile_css', function() {

    
    return gulp.src(depCSS)
        .pipe(gutil.env.type === 'production' ? minifyCSS() : gutil.noop())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gutil.env.type === 'production' ? concat('vendor.min.css') : concat('vendor.css'))
        .pipe(gulp.dest('public/css/dist'));

});

gulp.task('clean', function () {
    del(['public/javascripts/dist', 'public/css/dist']);
});

gulp.task('default', ['compile_app', 'compile_dependencies', 'compile_css', 'compile_scss'], function() {

});