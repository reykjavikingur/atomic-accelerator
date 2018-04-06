module.exports = `
<div class="trace__item">
	<%- this.render('link', {name: item.name}) %>
	<% if (item.parent) { %>
		as appearing in 
		<%- this.render('link', {name: item.parent}) %>
	<% } %>
	<button onclick="Modal.open('#source-<%= item.id %>'); return true; ">source</button>
	<div class="trace__source" id="source-<%= item.id %>"><%= item.output %></div>
</div>
<%- item.output %>
`;
