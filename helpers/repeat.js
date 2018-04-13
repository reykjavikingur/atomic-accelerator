module.exports = function repeat(n, options) {
	n = parseInt(n) || 0;
	var output = '';
	for (let k = 0; k < n; k++) {
		output += options.fn(this);
	}
	return output;
};
