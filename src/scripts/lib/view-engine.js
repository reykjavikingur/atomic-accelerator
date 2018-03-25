const ejs = require('ejs');

class ViewEngine {

	constructor(views) {
		this.registration = {};
		for (let key in views) {
			var template = views[key];
			this.registration[key] = ejs.compile(template, {context: this});
		}
	}

	render(name, data) {
		return this.registration[name](data);
	}
}

module.exports = new ViewEngine({
	'search-form': require('./views/search-form'),
	'list-page': require('./views/list-page'),
	'search-page': require('./views/search-page'),
	'name-page': require('./views/name-page'),
});
