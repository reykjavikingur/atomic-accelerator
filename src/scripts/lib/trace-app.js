// TODO put all trace code into "src/scripts/trace" directory
const TraceCollection = require('./trace-collection');
const ViewEngine = require('./view-engine');

// TODO run the code instead of exporting to the container
function traceApp() {
	var el = document.querySelector('.trace');
	TraceCollection.loadData('/trace-data.json')
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
