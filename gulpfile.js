const gulp = require('gulp');
const path = require('path');
const glob = require('glob');
const rimraf = require('rimraf');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const fs = require('fs');
const Promise = require('promise');
const browserify = require('browserify');
const es = require('event-stream');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const HandlebarsGenerator = require('handlebars-generator');
const writeFile = Promise.denodeify(fs.writeFile);


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
		},
		startPath: '/trace.html'
	}, cb);
});

var types = ['styles', 'views', 'pages', 'scripts'];

gulp.task('watch:all', types.map(type => 'watch:' + type));

gulp.task('build:all', types.map(type => 'build:' + type));


// STYLES

var styles = ['src', 'trace'].map(src => src + '/styles/**/*.scss');

gulp.task('build:styles', [], () => {
	return gulp.src(styles)
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
	gulp.watch(styles, ['build:styles']);
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
	// TODO be able to handle js and hbs errors appropriately
});

gulp.task('watch:views', ['build:views'], () => {
	gulp.watch(['views/**/*.+(hbs|js)'], ['build:views']);
});


// PAGES

var pages = ['src', 'trace'].map(src => src + '/*.html');

gulp.task('build:pages', [], () => {
	return gulp.src(pages)
		.pipe(gulp.dest('dist'));
});

gulp.task('watch:pages', ['build:pages'], () => {
	gulp.watch(pages, ['build:pages']);
});


// SCRIPTS

var entries = '+(src|trace)/scripts/*.js';
var scripts = ['src', 'trace'].map(src => src + '/scripts/**/*.js');

gulp.task('build:scripts', [], (cb) => {
	glob(entries, (err, files) => {
		if (err) {
			return cb(err);
		}
		var streams = files.map(createScript);
		es.merge(streams).on('end', cb);
	});

	function createScript(entry) {
		var basename = path.basename(entry);
		return browserify(entry, {
			debug: true
		})
			.transform('babelify') // uses .babelrc
			.bundle()
			.on('error', handleError)
			.pipe(source(basename))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('dist/scripts'))
			;
	}

	function handleError(err) {
		console.error(err.toString());
		this.emit('end');
	}
});

gulp.task('watch:scripts', ['build:scripts'], () => {
	gulp.watch(scripts, ['build:scripts']);
});
