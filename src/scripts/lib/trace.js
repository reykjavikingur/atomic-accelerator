const URL = require('url');
const TraceCollection = require('./trace-collection');
const renderList = require('./render-list');
const renderName = require('./render-name');
const renderSearch = require('./render-search');

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
	if (query.hasOwnProperty('name')) {
		renderName(el, query.name, collection);
	}
	else if (query.hasOwnProperty('q')) {
		renderSearch(el, query.q, collection);
	}
	else {
		renderList(el, collection);
	}
}

module.exports = trace;
