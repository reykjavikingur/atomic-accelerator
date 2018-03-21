const URL = require('url');
const TraceCollection = require('./trace-collection');
const renderList = require('./render-list');
const renderName = require('./render-name');

function trace() {
	var el = document.querySelector('.trace');
	TraceCollection.loadData()
		.then(collection => {
			try {
				el.innerHTML = render(collection);
			}
			catch (e) {
				console.error('unable to render', e);
			}
		}, e => {
			console.error('unable to load data', e);
		})
	;
}

function render(collection) {
	var url = URL.parse(location.href, true);
	var query = url.query;
	var name = query.name;
	if (name) {
		return renderName({
			name: name,
			items: collection.findItems(name),
			dependencies: collection.findDependencies(name),
			dependents: collection.findDependents(name)
		});
	}
	else {
		return renderList(collection);
	}
}

module.exports = trace;
