'use strict';

// Generated on 2014-02-15 using generator-gulp-webapp 0.0.1

// Load plugins
var path = require('path');
var express = require('express');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var cache = require('gulp-cache');
var size = require('gulp-size');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var url = require('url');
var proxy = require('proxy-middleware');
var lr = require('tiny-lr');
var rjs = require('gulp-requirejs');
var server = lr();

// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ['app/bower_components']
        }))
        .pipe(autoprefixer('last 1 version'))
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(livereload(server));
        // .pipe(gulp.dest('dist/scripts'));
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/scripts/**/*.html')
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('dist'));
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(livereload(server))
        .pipe(size())
        .pipe(gulp.dest('dist/images'));
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {
        read: false
    }).pipe(clean());
});

// Build
gulp.task('build', ['html', 'styles', 'scripts', 'images', 'requirejsBuild']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Watch
gulp.task('watch', function () {
    var app = express();
    app.use(require('connect-livereload')());

    app.use('/api', proxy(url.parse('http://ks370109.kimsufi.com/tinstreet/api')));
    app.use(express.static(path.resolve('.tmp/')));
    app.use(express.static(path.resolve('app/')));
    app.listen(9000, function () {
        gutil.log('Listening on', 9000);
    });

    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.error(err);
        };

        // Watch .html files
        gulp.watch('app/scripts/**/*.html', ['html']);

        // Watch .scss files
        gulp.watch('app/styles/**/*.scss', ['styles']);

        // Watch .js files
        gulp.watch('app/scripts/**/*.js', ['scripts']);

        // Watch image files
        gulp.watch('app/images/**/*', ['images']);
    });
});

gulp.task('dist', function () {
    var app = express();
    app.use(require('connect-livereload')());

    app.use('/api', proxy(url.parse('http://ks370109.kimsufi.com/tinstreet/api')));
    app.use(express.static(path.resolve('dist/')));
    app.listen(9000, function () {
        gutil.log('Listening on', 9000);
    });
});

gulp.task('requirejsBuild', function () {
    rjs({
        baseUrl: 'app/scripts',
        out: 'main.js',
        paths: {
            'angular': '../bower_components/angular/angular',
            'd3': '../bower_components/d3/d3',
            'jquery': '../bower_components/jquery/dist/jquery',
            'lodash': '../bower_components/lodash/dist/lodash',
            'text': '../bower_components/requirejs-text/text'
        },
        shim: {
            'angular': {
                deps: ['jquery'],
                exports: 'angular'
            }
        },
        name: 'main'
    })
        .pipe(gulp.dest('./dist/')); // pipe it to the output DIR
});
