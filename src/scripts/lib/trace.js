const URL = require('url');
const TraceCollection = require('./trace-collection');
const renderList = require('./render-list');
const renderName = require('./render-name');

function trace() {
	var el = document.querySelector('.trace');
	TraceCollection.loadData()
		.then(collection => {
			try {
				render(el, collection);
			}
			catch (e) {
				console.error('unable to render', e);
			}
		}, e => {
			console.error('unable to load data', e);
		})
	;
}

function render(el, collection) {
	var url = URL.parse(location.href, true);
	var query = url.query;
	var name = query.name;
	if (name) {
		renderName(el, name, collection);
	}
	else {
		renderList(el, collection);
	}
}

module.exports = trace;
