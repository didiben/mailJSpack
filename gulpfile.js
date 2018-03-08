var gulp = require('gulp');
var sass = require('gulp-sass');

var sassPath = '*.scss';
var cssPath = '';

gulp.task('sass', function() {
	return gulp.src(sassPath)
	.pipe(sass())
	.pipe(gulp.dest(cssPath));
});

gulp.task('watch', ['sass'], function() {
	gulp.watch(sassPath, ['sass']);
});

gulp.task('default', ['watch'], function() {

});
