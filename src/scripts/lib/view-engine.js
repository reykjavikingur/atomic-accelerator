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
	'top': require('./views/top'),
	'search-form': require('./views/search-form'),
	'list': require('./views/list'),
	'search': require('./views/search'),
	'type': require('./views/type'),
});
