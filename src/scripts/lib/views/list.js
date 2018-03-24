module.exports = `
<ul>
<% var nameMap = collection.groupItemsByName(); %>
<% for (let name in nameMap) { %>
	<li>
		<a href="?name=<%= name %>"><%= name %></a>
		(<%= nameMap[name].length %>)
	</li>
<% } %>
</ul>
`;
