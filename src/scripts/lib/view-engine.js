const ejs = require('ejs');
const list = require('./views/list');
const search = require('./views/search');
const type = require('./views/type');

class ViewEngine {

	static create() {
		var instance = new ViewEngine();
		instance.register('list', list);
		instance.register('type', type);
		instance.register('search', search);
		return instance;
	}

	constructor() {
		this.registration = {};
	}

	register(name, template) {
		this.registration[name] = ejs.compile(template);
	}

	render(name, data) {
		data = Object.assign(data, {
			render: this.render.bind(this)
		});
		return this.registration[name](data);
	}
}

module.exports = ViewEngine.create();
