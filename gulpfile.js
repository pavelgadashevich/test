'use strict';

// requires
//////////////////////
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sync = require('browser-sync'),
    cleancss = require('gulp-clean-css'),
    del = require('del');

// path
//////////////////////
var path = {
    src: { 
        html: 'app/*.html',
        css: 'app/css/',
        cssinput: 'app/css/**/*.css'
    },
    watch: {
        html: 'app/**/*.html',
        scss: 'app/scss/**/*.scss'        
    },
    build: {
        basedir: 'dist/',
        css: 'dist/css/'
    },
    basedir: 'app/'
};


// sync
//////////////////////

gulp.task('sync', function() {
    sync({
        server: {
            baseDir: path.basedir            
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('sass', function() {
    return gulp.src(path.watch.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.src.css))
        .pipe(sync.reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src(path.src.html)
        .pipe(sync.reload({
            stream: true
        }));
});

// watch
//////////////////////

gulp.task('watch', ['sync','html','sass'], function() {
    gulp.watch(path.watch.scss, ['sass']);
    gulp.watch(path.watch.html, ['html']);
})

// build
//////////////////////
gulp.task('build:css', function() {
    gulp.src(path.src.cssinput)
        .pipe(cleancss())        
        .pipe(gulp.dest(path.build.css));
});

// clean project
gulp.task('clean', function() {
    return del.sync(path.build.basedir);
});

gulp.task('build', ['clean', 'build:css']);