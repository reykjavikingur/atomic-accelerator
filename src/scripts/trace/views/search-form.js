module.exports = `
<!-- search form -->
<form class="trace__search" method="get" action="<%= this.url.pathname %>">
    <input type="text" name="q" value="<%= this.url.query.q %>" />
    <input type="submit" value="Search" />
    <% if (Object.keys(this.url.query).length > 0) { %>
    	<a href="<%= this.url.pathname %>">full list</a>
    <% } %>
</form>
`;
