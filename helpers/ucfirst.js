/**
 * Handlebars helper to capitalize the first letter
 * Example:
 * {{#ucfirst}}{{string}}{{/ucfirst}}
 */
module.exports = function ucfirst(options) {
	var string = options.fn(this);
	return string.substring(0, 1).toUpperCase() + string.substring(1);
};
