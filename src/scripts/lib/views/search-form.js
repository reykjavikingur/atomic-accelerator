module.exports = `
<form method="get" action="<%= this.url.pathname %>">
    <input type="text" name="q" value="<%= this.url.query.q %>" />
    <!-- TODO autocomplete the list of names -->
    <input type="submit" value="Search" />
    <a href="<%= this.url.pathname %>">full list</a>
</form>

`;
