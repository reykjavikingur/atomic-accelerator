const fs = require('fs');
const Promise = require('promise');
const writeFile = Promise.denodeify(fs.writeFile);
const HandlebarsGenerator = require('handlebars-generator');

HandlebarsGenerator.generateSite('views', 'dist', {
	sourceExtension: 'hbs',
	trace: true,
})
	.then(r => {
		return writeFile('dist/trace-data.json', JSON.stringify(HandlebarsGenerator.tracer.traces), 'utf8');
	})
	.then(r => {
		process.exit(0);
	}, e => {
		console.error(e.message);
		process.exit(1);
	})
;
