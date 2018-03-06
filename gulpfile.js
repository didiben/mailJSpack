var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var appPath = 'app';
var sassPath = 'app/*.scss';
var cssPath = 'app';
var htmlPath = 'app/*html';
var jsPath = 'app/*js';

gulp.task('sass', function() {
	return gulp.src(sassPath)
	.pipe(sass())
	.pipe(gulp.dest(cssPath))
	.pipe(browserSync.reload({
		stream: true
	})
);
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch(sassPath, ['sass']);
	gulp.watch(htmlPath, browserSync.reload);
	gulp.watch(jsPath, browserSync.reload);
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: appPath
		},
	})
});

gulp.task('default', ['watch'], function() {
	if (error != '') {
		alert('ERROR!');
	}
});
