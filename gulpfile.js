const gulp = require('gulp');
const rimraf = require('rimraf');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const fs = require('fs');
const Promise = require('promise');
const browserify = require('browserify');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const writeFile = Promise.denodeify(fs.writeFile);

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

gulp.task('watch:all', ['watch:views', 'watch:scripts']);

gulp.task('build:all', ['build:views', 'build:scripts']);


// VIEWS

gulp.task('build:views', [], () => {
	return HandlebarsGenerator.generateSite('views', 'dist', {
		sourceExtension: 'hbs',
		trace: true,
	})
		.then(r => {
			return writeFile('dist/traces.json', JSON.stringify(HandlebarsGenerator.tracer.traces), 'utf8');

		})
		;
});

gulp.task('watch:views', ['build:views'], () => {
	gulp.watch(['views/**/*.+(hbs|js)'], ['build:views']);
});


// SCRIPTS

gulp.task('build:scripts', [], () => {
	return browserify('src/scripts/main.js', {
		debug: true
	})
		.transform('babelify') // uses .babelrc
		.bundle()
		.on('error', handleError)
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/scripts'))
		;

	function handleError(err) {
		console.error(err.toString());
		this.emit('end');
	}
});

gulp.task('watch:scripts', ['build:scripts'], () => {
	gulp.watch('src/scripts/**/*.js', ['build:scripts']);
});
