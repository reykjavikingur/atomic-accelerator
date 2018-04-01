const Promise = require('promise');

function getJSON(url) {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
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

module.exports = getJSON;
