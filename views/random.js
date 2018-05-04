const Randomizer = require('data-randomizer');

const pkg = require('../package.json');

const r = Randomizer.create(pkg.name);

const IMAGE_CATEGORIES = [
	//'animals',
	//'arch',
	'nature',
	//'people',
	//'tech',
];

exports.phrase = (min, max) => {
	return r.phrase(r.integer(min, max)).generator();
};

exports.sentence = r.sentence();

exports.paragraph = r.paragraph();

exports.imageUrl = (width, height) => {
	// TODO parameterize width and height as extra arguments in transform function (when available in data-randomizer dependency)
	return r.object({
		id: r.integer(1, 1e9),
		cat: r.choice(IMAGE_CATEGORIES),
	}).transform(x => `https://placeimg.com/${width}/${height}/${x.cat}?id=${x.id}`).generator();
};
