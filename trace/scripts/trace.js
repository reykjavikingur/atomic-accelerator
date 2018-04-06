const traceApp = require('./lib/trace-app');

traceApp({
	selector: 'body',
	dataUrl: '/trace-data.json',
});
