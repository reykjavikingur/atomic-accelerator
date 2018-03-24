const URL = require('url');
const TraceCollection = require('./trace-collection');
const viewEngine = require('./view-engine');

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
	viewEngine.query = query;
	var data = {
		query: query,
		collection: collection,
	};
	el.innerHTML = viewEngine.render(route(query), data);
}

function route(query) {
	if (query.hasOwnProperty('name')) {
		return 'type';
	}
	else if (query.hasOwnProperty('q')) {
		return 'search';
	}
	else {
		return 'list';
	}
}

module.exports = trace;
