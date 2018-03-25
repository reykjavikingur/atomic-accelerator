module.exports = `
<!-- type.js -->
<%- this.render('search-form') %>

<% var name = this.url.query.name %>

<%
var items = this.collection.filterByName(name);
var dependencies = this.collection.findDependencies(name);
var dependents = this.collection.findDependents(name);
%>

<h2>name: <em><%= name %></em></h2>

<ul class="trace__graph">
<h3>appears in:</h3>
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

<ul class="trace__graph">
<h3>includes:</h3>
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

<% for (let item of items) { %>
	<%- this.render('item', {item:item}) %>
<% } %>

<div class="trace__source-modal"></div>
`;
