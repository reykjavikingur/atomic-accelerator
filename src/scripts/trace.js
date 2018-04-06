const traceApp = require('./trace/trace-app');

traceApp({
	selector: 'body',
	dataUrl: '/trace-data.json',
});
