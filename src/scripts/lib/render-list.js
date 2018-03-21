const renderList = collection => `
<ul>${collection.names.map(renderItemLink).join('')}</ul>
`;

const renderItemLink = (name) => `
<li><a href="?name=${name}">${name}</a></li>
`;

module.exports = renderList;
