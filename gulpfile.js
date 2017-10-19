var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

gulp.task('default', function () {
	gulp.start('css');
});

gulp.task('css', function () {
	gulp.src('./css/estilo.css')
		.pipe(concat('estilo.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./css/'));
});