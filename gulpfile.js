const gulp = require('gulp');

const HandlebarsGenerator = require('/Users/astrader/ProjectCode/node/handlebars-generator');

gulp.task('build', ['build:views'], () => {

});

gulp.task('build:views', [], ()=>{
	return HandlebarsGenerator.generateSite('views', 'dist', {
		sourceExtension: 'hbs',
	});
});
