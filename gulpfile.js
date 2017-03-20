var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    // minifycss = require('gulp-minify-css'),
    // jshint = require('gulp-jshint'),
    // uglify = require('gulp-uglify'),
    // imagemin = require('gulp-imagemin'),
    // rename = require('gulp-rename'),
    // concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    // cache = require('gulp-cache'),
    // livereload = require('gulp-livereload'),
    // del = require('del'),
    browserSync = require('browser-sync');

var path = {
	'demo': 'demo/',
	'scss': 'demo/**/*.scss'
};

gulp.task('sass', function () {
	return sass(path.scss, {style: 'expanded'})
		.pipe(autoprefixer({
			browsers: [
				'last 2 versions',
				'ie >= 7',
				'ie_mob >= 10',
				'ff >= 30',
				'chrome >= 34',
				'safari >= 7',
				'opera >= 23',
				'ios >= 7',
				'android >= 2.3',
				'bb >= 10'
			]
		}))
		.pipe(gulp.dest(path.demo))
		.pipe(notify({message: 'Sass done!'}));
});

/*gulp.task('img', function () {
	// return gulp.src('demo/*images/*', {base: 'src'})
		.pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
		.pipe(gulp.dest(path.demo))
		.pipe(notify({message: 'Images done!'}))
});*/

gulp.task('default', ['refresh']);

gulp.task('refresh', ['sass', 'watch'], function () {
	var files = [
		'./**/*.html',
		'./**/*.css',
		'./**/*.js',
		'./**/images/*'
	];

	browserSync.init(files, {
		server: {
			baseDir: '.'
		}
	});
});

gulp.task('watch', function () {
	gulp.watch(path.scss, ['sass']);
});