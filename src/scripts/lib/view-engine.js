const ejs = require('ejs');
const URL = require('url');

const views = {
	'search-form': require('./views/search-form'),
	'list-page': require('./views/list-page'),
	'search-page': require('./views/search-page'),
	'name-page': require('./views/name-page'),
};

class ViewEngine {

	constructor() {
		this.url = URL.parse(location.href, true);
		this.registration = {};
		for (let key in views) {
			var template = views[key];
			this.registration[key] = ejs.compile(template, {context: this});
		}
	}

	render(name, data) {
		return this.registration[name](data);
	}

	route() {
		if (this.url.query.hasOwnProperty('name')) {
			return 'name-page';
		}
		else if (this.url.query.hasOwnProperty('q')) {
			return 'search-page';
		}
		else {
			return 'list-page';
		}
	}

}

module.exports = ViewEngine;
