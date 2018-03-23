const ejs = require('ejs');

const template = `
<ul>
<% for (let name in nameMap) { %>
	<li>
		<a href="?name=<%= name %>"><%= name %></a>
		(<%= nameMap[name].length %>)
	</li>
<% } %>
</ul>
`;

function renderList(el, collection) {
	el.innerHTML = ejs.render(template, {
		nameMap: collection.groupItemsByName()
	});
}

module.exports = renderList;
