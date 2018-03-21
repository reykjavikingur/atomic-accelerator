
function renderList(collection) {
	return [
		'<ul>',
		collection.names.map(name => '<li>' + name + '</li>').join(''),
		'</ul>',
	].join('');
}

module.exports = renderList;
