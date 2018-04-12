const Randomizer = require('data-randomizer');

const random = Randomizer.create('Atomic Accelerator Seed');

const randomImageCategory = random.choices([
	//'animals',
	//'arch',
	'nature',
	//'people',
	//'tech',
]);

const randomImageId = random.integers(0, 1e9);

const randomImage = function (width, height) {
	width = parseInt(width) || 640;
	height = parseInt(height) || 480;
	var id = randomImageId();
	var cat = randomImageCategory();
	return `https://placeimg.com/${width}/${height}/${cat}?id=${id}`;
};

module.exports = {
	title: 'Atomic Toolkit',
	randomPhrase: random.phrases(random.integers(2, 5)),
	randomSentence: random.sentences(),
	randomParagraph: random.paragraphs(),
	randomImage: randomImage,
};
