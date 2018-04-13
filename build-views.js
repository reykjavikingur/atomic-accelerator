const fs = require('fs');
const Promise = require('promise');
const writeFile = Promise.denodeify(fs.writeFile);
const requireDir = require('require-dir');
const Handlebars = require('handlebars');
const HandlebarsGenerator = require('handlebars-generator');

const helpers = requireDir('./helpers');

for (let name in helpers) {
	Handlebars.registerHelper(name, helpers[name]);
}

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
		console.error(e);
		process.exit(1);
	})
;
