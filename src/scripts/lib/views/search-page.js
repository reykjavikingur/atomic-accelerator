module.exports = `
<!-- search.js -->
<%- this.render('search-form') %>
<% var items = this.collection.search(this.query.q); %>
<% for (let item of items) { %>
	<div class="trace__item">
		<%= item.name %>
	</div>
	<%- item.output %>
	<!-- TODO reuse code between this and render-name  -->
<% } %>
`;
