module.exports = `
<!-- search page -->
<%- this.render('title') %>
<div class="trace__meta">
<%- this.render('search-form') %>
</div>
<% var items = this.collection.search(this.url.query.q); %>
<% for (let item of items) { %>
	<%- this.render('item', {item:item}) %>
<% } %>
`;
