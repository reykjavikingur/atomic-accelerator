const getJSON = require('./get-json');

class TraceCollection {

	static loadData(url) {
		return getJSON(url)
			.then(r => {
				return new TraceCollection(r);
			})
			;
	}

	constructor(records) {
		this.items = records.map(record => new TraceItem(record));

		var levels = {};
		// initialize all levels to 0 (atom)
		for (let item of this.items) {
			levels[item.name] = 0;
		}
		// set levels to 1 (molecule) where applicable
		for (let item of this.items) {
			if (item.parent) {
				levels[item.parent] = 1;
			}
		}
		// set levels to 2 (organism) where applicable
		for (let item of this.items) {
			if (levels[item.name] > 0) {
				if (item.parent) {
					levels[item.parent] = 2;
				}
			}
		}
		// set levels to 3 (page) where applicable
		for (let item of this.items) {
			if (!item.parent) {
				levels[item.name] = 3;
			}
		}
		this.levels = levels;
	}

	filterByName(name) {
		return this.items.filter(item => item.name === name);
	}

	filterByLevel(level) {
		return this.items.filter(item => this.levels[item.name] === level);
	}

	groupLevelByName(level) {
		return groupBy(this.filterByLevel(level), 'name');
	}

	groupItemsByName() {
		return groupBy(this.items, 'name');
	}

	findDependencies(parent) {
		var dependencies = this.items.filter(item => item.parent === parent);
		return groupBy(dependencies, 'name');
	}

	findDependents(child) {
		var dependents = this.items.filter(item => item.name === child && Boolean(item.parent));
		return groupBy(dependents, 'parent');
	}

	getLevel(name) {
		return this.levels[name];
	}

	getCount(name) {
		return this.filterByName(name).length;
	}

	search(query) {

		var results = this.items
				.map(item => createResult(item, query))
				.filter(result => result.match > 0)
			;

		var items = results
			.sort((a, b) => b.match - a.match)
			.map(result => result.item);

		return items;

		function createResult(item, query) {
			return {
				item: item,
				match: item.match(query)
			};
		}
	}

}

class TraceItem {

	constructor(record) {
		this.id = record.id;
		this.name = record.name;
		this.output = record.output;
		this.parent = record.parent || '';
	}

	match(search) {
		if (this.name.indexOf(search) >= 0) {
			return 1;
		}
		else if (this.output.indexOf(search) >= 0) {
			return 0.5;
		}
		else {
			return 0;
		}
	}

}

function groupBy(list, prop) {
	var map = {};
	for (let item of list) {
		if (!map[item[prop]]) {
			map[item[prop]] = [];
		}
		map[item[prop]].push(item);
	}
	return map;
}

module.exports = TraceCollection;
