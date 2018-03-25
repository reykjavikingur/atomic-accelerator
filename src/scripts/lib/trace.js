const TraceCollection = require('./trace-collection');
const ViewEngine = require('./view-engine');

function trace() {
	var el = document.querySelector('.trace');
	TraceCollection.loadData()
		.then(collection => {
			render(el, collection);
		}, e => {
			console.error('unable to load data', e);
		})
	;
}

function render(el, collection) {
	try {
		var viewEngine = new ViewEngine();
		viewEngine.collection = collection;
		el.innerHTML = viewEngine.render(viewEngine.route());
	}
	catch (e) {
		console.error('unable to render view', e);
		el.innerHTML = '<div>Error</div>';
	}
}

module.exports = trace;
