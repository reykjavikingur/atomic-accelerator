const gulp = require('gulp');
const rimraf = require('rimraf');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');

const HandlebarsGenerator = require('/Users/astrader/ProjectCode/node/handlebars-generator');

gulp.task('clean', [], (cb) => {
	rimraf('dist/**/*', cb);
});

gulp.task('build', [], (cb) => {
	runSequence('clean', 'build:all', cb);
});

gulp.task('watch', [], (cb) => {
	runSequence('clean', 'watch:all', cb);
});

gulp.task('serve', ['watch'], (cb) => {
	var bs = browserSync.create();
	bs.init({
		files: 'dist/**/*',
		server: {
			baseDir: 'dist'
		}
	}, cb);
});

gulp.task('watch:all', ['watch:views']);

gulp.task('build:all', ['build:views']);

// VIEWS

gulp.task('build:views', [], () => {
	return HandlebarsGenerator.generateSite('views', 'dist', {
		sourceExtension: 'hbs',
	});
});

gulp.task('watch:views', ['build:views'], () => {
	gulp.watch(['views/**/*.+(hbs|js)'], ['build:views']);
});
