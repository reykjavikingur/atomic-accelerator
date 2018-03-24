module.exports = `
<form method="get" action="trace.html">
    <input type="text" name="q" value="<%= this.query.q %>" />
    <!-- TODO autocomplete the list of names -->
    <input type="submit" value="Search" />
</form>
`;
