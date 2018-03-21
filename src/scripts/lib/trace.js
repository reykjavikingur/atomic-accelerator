const Promise = require('promise');
const TraceCollection = require('./trace-collection');
const renderList = require('./render-list');

function trace() {
	console.log('running trace function');
	console.log('loading data');
	var el = document.querySelector('.trace');
	loadData()
		.then(r => {
			console.log('loaded data', r);
			try {
				var collection = new TraceCollection(r);
				el.innerHTML = renderList(collection);
			}
			catch (e) {
				console.error('unable to render list', e);
			}
		}, e => {
			console.error('unable to load data', e);
		})
	;
}

function loadData() {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/traces.json');
		xhr.onload = function () {
			try {
				resolve(JSON.parse(xhr.response));
			}
			catch (e) {
				reject(e);
			}
		};
		xhr.onerror = function (event) {
			reject(event);
		};
		xhr.send(null);
	});
}

module.exports = trace;
