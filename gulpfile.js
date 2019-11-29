//导入需要插件
const gulp = require('gulp');
const babel = require('gulp-babel');
const css = require('gulp-clean-css');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
//处理js任务
gulp.task('js',()=>{
    gulp.src('./src/js/ES5/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
})
//处理es6=>es5任务
gulp.task('es6',()=>{
    gulp.src('./src/js/ES6/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./src/js/ES5/'))
})
//处理img任务
gulp.task('img',()=>{
    gulp.src('./src/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
})
//处理sass任务
gulp.task('sass',()=>{
    gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle:'expanded'}))
    .pipe(css())
    .pipe(rename({suffix :'.min'}))
    .pipe(gulp.dest('./dist/css')); 
})
//监听任务
gulp.task('default',()=>{
    gulp.watch(['./src/js/ES5/*.js'],['js']);
    gulp.watch(['./src/js/ES6/*.js'],['es6']);
    gulp.watch(['./src/img/*.*'],['img']);
    gulp.watch(['./src/sass/*.scss'],['sass'])
})
