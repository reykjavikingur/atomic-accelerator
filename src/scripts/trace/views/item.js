module.exports = `
<div class="trace__item">
	<%- this.render('link', {name: item.name}) %>
	<% if (item.parent) { %>
		as appearing in 
		<%- this.render('link', {name: item.parent}) %>
	<% } %>
	<button class="source-button">source</button>
	<div class="trace__source">
		<textarea readonly onclick="this.focus(); this.select(); "><%= item.output %></textarea>
	</div>
</div>
<%- item.output %>
`;