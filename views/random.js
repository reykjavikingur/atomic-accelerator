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

exports.slogan = r.phrase(r.integer(4, 6)).transform(ucfirst);

exports.title = r.phrase(r.integer(2, 5)).transform(ucfirstAll);

exports.sentence = r.sentence();

exports.paragraph = r.paragraph();

exports.id = r.integer(1, 1e9);

exports.imageCategory = r.choice(IMAGE_CATEGORIES);

exports.imageUrl = (width, height) => {
	return r.object({
		id: exports.id,
		cat: exports.imageCategory,
	}).transform(x => `https://placeimg.com/${width}/${height}/${x.cat}?id=${x.id}`);
};

exports.bannerImageUrl = exports.imageUrl(800, 200);

exports.featureImageUrl = exports.imageUrl(320, 240);

function ucfirst(string) {
	if (string.length > 0) {
		string = string[0].toUpperCase() + string.substring(1);
	}
	return string;
}

function ucfirstAll(string) {
	return string.split(/ /).map(ucfirst).join(' ');
}
