module.exports = `
<!-- list.js -->
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
				<a href="?name=<%= name %>"><%= name %></a>
				(<%= nameMap[name].length %>)
			</li>
		<% } %>
	</ul>
<% } %>
`;
