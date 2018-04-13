const Randomizer = require('data-randomizer');

const pkg = require('../package.json');

const r = Randomizer.create(pkg.name);

const randomImageCategory = r.choices([
	//'animals',
	//'arch',
	'nature',
	//'people',
	//'tech',
]);

const randomImageId = r.integers(0, 1e9);

const randomImage = function (width, height) {
	width = parseInt(width) || 640;
	height = parseInt(height) || 480;
	var id = randomImageId();
	var cat = randomImageCategory();
	return `https://placeimg.com/${width}/${height}/${cat}?id=${id}`;
};

const random = {
	sentence: r.sentences(),
	paragraph: r.paragraphs(),
	phrase: r.calls(ucfirst, r.phrases(r.integers(4, 6))),
	title: r.calls(ucfirstAll, r.phrases(r.integers(2, 5))),
	image: randomImage,
};

function ucfirst(string) {
	if (string.length > 0) {
		string = string[0].toUpperCase() + string.substring(1);
	}
	return string;
}

function ucfirstAll(string) {
	return string.split(/ /).map(ucfirst).join(' ');
}

module.exports = random;
