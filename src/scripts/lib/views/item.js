module.exports = `
<div class="trace__item">
	<a href="?name=<%= item.name %>"><%= item.name %></a>
	<% if (item.parent) { %>
		as appearing in <a href="?name=<%= item.parent %>"><%= item.parent %></a>
	<% } else { %>
		(<a href="/<%= item.name %>.html">page</a>)
	<% } %>
	<button class="source-button">source</button>
	<div class="trace__source"><textarea><%= item.output %></textarea></div>
</div>
<%- item.output %>
`;