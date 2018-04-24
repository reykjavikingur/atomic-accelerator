const Randomizer = require('data-randomizer');

const pkg = require('../package.json');

const r = Randomizer.create(pkg.name);

const randomImageCategory = r.choice([
	//'animals',
	//'arch',
	'nature',
	//'people',
	//'tech',
]);

const randomImageId = r.integer(0, 1e9);

const randomImage = function (width, height) {
	width = parseInt(width) || 640;
	height = parseInt(height) || 480;
	var id = randomImageId();
	var cat = randomImageCategory();
	return `https://placeimg.com/${width}/${height}/${cat}?id=${id}`;
};

const random = {
	sentence: r.sentence(),
	paragraph: r.paragraph(),
	phrase: r.phrase(r.integer(4, 6)).transform(ucfirst),
	title: r.phrase(r.integer(2, 5)).transform(ucfirstAll),
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
