const traceApp = require('./trace/trace-app');

traceApp({
	selector: '.trace',
	dataUrl: '/trace-data.json',
});
