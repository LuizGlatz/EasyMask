let gulp = require('gulp');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let cssmin = require('gulp-cssmin');

gulp.task('default', function() {
	gulp.start('minify-css', 'minify-js')
});

gulp.task('minify-css', function() {
	gulp.src('./css/estilo.css')
		.pipe(concat('estilo.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./css/'))
});

gulp.task('minify-js', function() {
	gulp.src('./js/EasyMask.js')
		.pipe(concat('EasyMask.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js/'))
});