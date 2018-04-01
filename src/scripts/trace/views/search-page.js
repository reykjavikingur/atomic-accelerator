module.exports = `
<!-- search.js -->
<%- this.render('search-form') %>
<% var items = this.collection.search(this.url.query.q); %>
<% for (let item of items) { %>
	<%- this.render('item', {item:item}) %>
<% } %>
`;
