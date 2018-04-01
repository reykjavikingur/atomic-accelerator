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
const sass = require('gulp-sass');

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
	// TODO automatically open on trace.html
	var bs = browserSync.create();
	bs.init({
		files: 'dist/**/*',
		server: {
			baseDir: 'dist'
		}
	}, cb);
});

var types = ['styles', 'views', 'pages', 'scripts'];

gulp.task('watch:all', types.map(type => 'watch:' + type));

gulp.task('build:all', types.map(type => 'build:' + type));


// STYLES

gulp.task('build:styles', [], () => {
	return gulp.src('src/styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', handleError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/styles'))
		;

	function handleError(err) {
		sass.logError.call(this, err);
		this.emit('end');
	}
});

gulp.task('watch:styles', ['build:styles'], () => {
	gulp.watch('src/styles/**/*.scss', ['build:styles']);
});


// VIEWS

gulp.task('build:views', [], () => {
	return HandlebarsGenerator.generateSite('views', 'dist', {
		sourceExtension: 'hbs',
		trace: true,
	})
		.then(r => {
			return writeFile('dist/trace-data.json', JSON.stringify(HandlebarsGenerator.tracer.traces), 'utf8');
		})
		;
});

gulp.task('watch:views', ['build:views'], () => {
	gulp.watch(['views/**/*.+(hbs|js)'], ['build:views']);
});


// PAGES

gulp.task('build:pages', [], () => {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('watch:pages', ['build:pages'], () => {
	gulp.watch('src/*.html', ['build:pages']);
});


// SCRIPTS

gulp.task('build:scripts', [], () => {
	// TODO compile main.js and trace.js separately
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
