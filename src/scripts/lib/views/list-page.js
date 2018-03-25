module.exports = `
<!-- list.js -->
<%- this.render('search-form') %>
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
