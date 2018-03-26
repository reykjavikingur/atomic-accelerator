module.exports = `
<!-- link.js -->
<%
var href = '?name=' + name;
var classes = ['trace__link'];
if (this.collection.getLevel(name) === 3) {
	classes.push('trace__link--page');
}
%>
<a href="<%= href %>"
	class="<%= classes.join(' ') %>"
><%= name %></a>
`;
