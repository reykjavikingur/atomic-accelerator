const ejs = require('ejs');

const template = `
<ul>
<% for (let name of names) { %>
	<li><a href="?name=<%= name %>"><%= name %></a></li>
<% } %>
</ul>
`;

function renderList(el, collection) {
	el.innerHTML = ejs.render(template, {
		names: collection.names
	});
}

module.exports = renderList;
