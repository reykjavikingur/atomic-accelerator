module.exports = `
<div class="trace__item">
	<%- this.render('link', {name: item.name}) %>
	<% if (item.parent) { %>
		as appearing in 
		<%- this.render('link', {name: item.parent}) %>
	<% } %>
	<!-- TODO open source in modal -->
	<label class="source-label" for="source-checkbox-<%= item.id %>">source</label>
	<input type="checkbox" class="source-checkbox" id="source-checkbox-<%= item.id %>" />
	<div class="trace__source">
		<textarea readonly onclick="this.focus(); this.select(); "><%= item.output %></textarea>
	</div>
</div>
<%- item.output %>
`;
