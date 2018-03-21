const renderName = (data) => `
<a href="trace.html">back</a>
<h2>name: <em>${data.name}</em></h2>
<h3>dependencies</h3>
<ul>${data.dependencies.map(renderItemLink).join('')}</ul>
<h3>dependents</h3>
<ul>${data.dependents.map(renderItemLink).join('')}</ul>
<h3>outputs</h3>
${data.items.map(renderItem).join('')}
`;

const renderItemLink = (name) => `
<li><a href="?name=${name}">${name}</a></li>
`;

const renderItem = (item) => `
${renderItemHeader(item)}
${item.output}
`;

const renderItemHeader = (item) => `
<div class="trace__item">
	occurrence in <a href="?name=${item.parent}">${item.parent}</a>
</div>
`;

module.exports = renderName;
