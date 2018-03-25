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
	viewEngine.collection = collection;
	try {
		el.innerHTML = viewEngine.render(route(query));
	}
	catch (e) {
		console.error('unable to render view', e);
		el.innerHTML = '<div>Error</div>';
	}
}

function route(query) {
	if (query.hasOwnProperty('name')) {
		return 'name-page';
	}
	else if (query.hasOwnProperty('q')) {
		return 'search-page';
	}
	else {
		return 'list-page';
	}
}

module.exports = trace;
