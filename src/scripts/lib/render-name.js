const ejs = require('ejs');

const template = `
<a href="trace.html">back</a>

<h2>name: <em><%= name %></em></h2>

<h3>dependencies</h3>
<ul class="trace__graph">
<% if (dependencies.length > 0) { %>
	<% for (let name of dependencies) { %>
		<li><a href="?name=<%= name %>"><%= name %></a></li>
	<% } %>
<% } else { %>
	<em>none</em>
<% } %>
</ul>

<h3>dependents</h3>
<ul class="trace__graph">
<% if (dependents.length > 0) { %>
	<% for (let name of dependents) { %>
		<li><a href="?name=<%= name %>"><%= name %></a></li>
	<% } %>
<% } else { %>
	<em>none</em>
<% } %>
</ul>

<% for (let item of items) { %>
	<div class="trace__item">
		<% if (item.parent) { %>
			occurrence in <a href="?name=<%= item.parent %>"><%= item.parent %></a>
		<% } else { %>
			occurrence on <a href="/<%= name %>.html">page</a>
		<% } %>
	</div>
	<%- item.output %>
<% } %>
`;

function renderName(data) {
	return ejs.render(template, data);
}

module.exports = renderName;
