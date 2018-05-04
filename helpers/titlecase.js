/**
 * Handlebars helper to capitalizer the first letter of each word
 * Example:
 * {{#titlecase}}{{string}}{{/titlecase}}
 */
module.exports = function titlecase(options) {
	var string = options.fn(this);
	return string.split(/ /).map(word => word.substring(0, 1).toUpperCase() + word.substring(1)).join(' ');
};
