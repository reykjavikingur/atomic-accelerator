const TraceCollection = require('./trace-collection');
const ViewEngine = require('./view-engine');
window.Modal = require('./modal');

function traceApp(options) {
	var el = document.querySelector(options.selector);
	TraceCollection.loadData(options.dataUrl)
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

module.exports = traceApp;
