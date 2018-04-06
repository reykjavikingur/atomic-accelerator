module.exports = `
<!-- name page -->
<%- this.render('title') %>
<div class="trace__meta">
<%- this.render('search-form') %>
<%
var name = this.url.query.name;
var level = this.collection.getLevel(name);
var levelNames = ['atom', 'molecule', 'organism', 'page'];
var items = this.collection.filterByName(name);
var dependencies = this.collection.findDependencies(name);
var dependents = this.collection.findDependents(name);
%>

<h2>
	name: <em><%= name %></em>
	<% if (level === 3) { %>
		(<a target="_blank" href="/<%= name %>.html">page</a>)
	<% } else { %>
		(<%= levelNames[level] %>)
	<% } %>
</h2>

<!-- TODO show template source -->

<ul class="trace__graph">
<h3>appears in:</h3>
<% if (Object.keys(dependents).length > 0) { %>
	<% for (let name in dependents) { %>
		<li>
			<%- this.render('link', {name: name}) %>
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
			<%- this.render('link', {name: name}) %>
			(<%= dependencies[name].length %>)
		</li>
	<% } %>
<% } else { %>
	<em>none</em>
<% } %>
</ul>

</div>

<% for (let item of items) { %>
	<%- this.render('item', {item:item}) %>
<% } %>

<div class="trace__source-modal"></div>
`;
