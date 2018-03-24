const ejs = require('ejs');

const template = `
<h2>search for <em><%= query %></em></h2>
<% for (let item of items) { %>
	<div class="trace__item">
		<%= item.name %>
	</div>
	<%- item.output %>
	<!-- TODO reuse code between this and render-name  -->
<% } %>
`;

function renderSearch(el, q, collection) {
	var data = {
		query: q,
		items: collection.search(q)
	};
	el.innerHTML = ejs.render(template, data);
}

module.exports = renderSearch;
