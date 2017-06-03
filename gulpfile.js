'use strict';

// requires
//////////////////////
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sync = require('browser-sync'),
    cleancss = require('gulp-clean-css'),
    del = require('del');

// path
//////////////////////
var path = {
    src: { 
        html: 'app/*.html',
        pug: 'app/pug/*.pug',
        css: 'app/css/',
        cssinput: 'app/css/**/*.css'
    },
    watch: {
        pug: 'app/pug/**/*.pug',
        scss: 'app/scss/**/*.scss'        
    },
    build: {
        basedir: 'dest/',
        css: 'dest/css/'
    },
    basedir: 'app/'
};

// watch
//////////////////////

// watch:server
gulp.task('watch:server', function() {
    sync({
        server: {
            baseDir: path.basedir            
        },
        port: 8080,
        open: true,
        notify: false
    });
});

// watch:sass
gulp.task('watch:sass', function() {
    return gulp.src(path.watch.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.src.css))
        .pipe(sync.reload({
            stream: true
        }));
});

// watch:pug
gulp.task('watch:pug', function() {
    return gulp.src(path.src.pug)
        .pipe(pug({
            pretty: true
        })
        .on('error', function(error) {
            console.log(error);
            this.end();
           })
        )      
        .pipe(gulp.dest(path.basedir))
        .pipe(sync.reload({
            stream: true
        }));
});

// watch all
gulp.task('watch', ['watch:server','watch:pug','watch:sass'], function() {
    gulp.watch(path.watch.pug, ['watch:pug']);
    gulp.watch(path.watch.scss, ['watch:sass']);    
})

// build
//////////////////////

// build:html
gulp.task('build:css', function() {
    gulp.src(path.src.cssinput)
        .pipe(cleancss())        
        .pipe(gulp.dest(path.build.css));
});

// build:clean
gulp.task('build:clean', function() {
    return del.sync(path.build.basedir);
});

// build all
gulp.task('build', ['build:clean', 'build:css']);