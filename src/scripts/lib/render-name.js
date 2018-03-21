const renderName = (data) => `
<a href="trace.html">back</a>
<h2>${data.name}</h2>
<h3>dependencies</h3>
${data.dependencies.map(renderItemLink).join('')}
<h3>dependents</h3>
${data.dependents.map(renderItemLink).join('')}
<h3>outputs</h3>
${data.items.map(renderItem).join('')}
`;

const renderItemLink = (name) => `
<li><a href="?name=${name}">${name}</a></li>
`;

const renderItem = (item) => `
<div>
${item.output}
</div>
`;

module.exports = renderName;
