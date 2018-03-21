const ejs = require('ejs');

const template = `
<ul>
<% for (let name of names) { %>
	<li><a href="?name=<%= name %>"><%= name %></a></li>
<% } %>
</ul>
`;

function renderList(collection) {
	return ejs.render(template, {
		names: collection.names
	});
}

module.exports = renderList;
