module.exports = `
<!-- list page -->
<%- this.render('title') %>
<div class="trace__meta">
<%- this.render('search-form') %>
<%
var levels = [3, 2, 1, 0];
var levelNames = ['atoms', 'molecules', 'organisms', 'pages'];
var nameMap = this.collection.groupItemsByName();
%>
<% for (let level of levels) { %>
	<% var nameMap = this.collection.groupLevelByName(level) %>
	<h2><%= levelNames[level] %></h2>
	<ul>
		<% for (let name in nameMap) { %>
			<li>
				<%- this.render('link', {name: name}) %>
				(<%= nameMap[name].length %>)
			</li>
		<% } %>
	</ul>
<% } %>
</div>
`;
