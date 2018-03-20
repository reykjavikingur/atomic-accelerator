const Promise = require('promise');

function trace() {
	console.log('running trace function');
	console.log('loading data');
	loadData()
		.then(r => {
			console.log('loaded data', r);
		})
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
