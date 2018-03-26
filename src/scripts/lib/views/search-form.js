module.exports = `
<!-- search-form.js -->
<form method="get" action="<%= this.url.pathname %>">
    <input type="text" name="q" value="<%= this.url.query.q %>" />
    <input type="submit" value="Search" />
    <a href="<%= this.url.pathname %>">full list</a>
</form>

`;
