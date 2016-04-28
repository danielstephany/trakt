'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var minifyHTML = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task("minifyHTML", function(){
	return gulp.src('*.html', { base: './'})
	.pipe(minifyHTML({collapseWhitespace: true}))
	.pipe(gulp.dest("dist"))
});

gulp.task('concatScripts', function() {
	return gulp.src('js/app.js')
	.pipe(maps.init())
	.pipe(concat('main.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('js/main.js')
		.pipe(uglify())
		.pipe(rename("main-min.js"))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('compileSass', function() {
	return gulp.src('scss/main.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(autoprefixer({browsers:['last 2 versions']}))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('minifyCss',['compileSass'], function(){
	return gulp.src('css/main.css')
		.pipe(maps.init())	
		.pipe(cssnano())
		.pipe(rename("main.min.css"))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('dist/css'));
});



gulp.task('watchFiles', function() {
	browserSync.init({
        server: "./"
    });
	gulp.watch('scss/**/*.scss', ['compileSass']);
});

gulp.task('serve', ['watchFiles']);

gulp.task('build', ['minifyHTML', 'compileSass', 'minifyScripts', 'minifyCss'], function() {
	return gulp.src(["img/**"], { base: './'})
			.pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
	del(['dist', 'css/main.css*', 'js/main*.js*']);
});

gulp.task('default', ['clean'], function() {
	gulp.start('build');
});