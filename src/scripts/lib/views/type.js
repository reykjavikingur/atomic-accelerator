module.exports = `
<a href="trace.html">full list</a>

<%
var items = collection.filterByName(query.name);
var dependencies = collection.findDependencies(query.name);
var dependents = collection.findDependents(query.name);
%>

<h2>name: <em><%= query.name %></em></h2>

<h3>dependencies</h3>
<ul class="trace__graph">
<% if (Object.keys(dependencies).length > 0) { %>
	<% for (let name in dependencies) { %>
		<li>
			<a href="?name=<%= name %>"><%= name %></a>
			(<%= dependencies[name].length %>)
		</li>
	<% } %>
<% } else { %>
	<em>none</em>
<% } %>
</ul>

<h3>dependents</h3>
<ul class="trace__graph">
<% if (Object.keys(dependents).length > 0) { %>
	<% for (let name in dependents) { %>
		<li>
			<a href="?name=<%= name %>"><%= name %></a>
			(<%= dependents[name].length %>)
		</li>
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
		<button class="source-button">source</button>
		<div class="trace__source"><textarea><%= item.output %></textarea></div>
	</div>
	<%- item.output %>
<% } %>

<div class="trace__source-modal"></div>
`;