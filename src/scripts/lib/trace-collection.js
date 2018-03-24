const loadData = require('./load-data');

class TraceCollection {

	static loadData() {
		return loadData()
			.then(r => {
				return new TraceCollection(r);
			})
			;
	}

	constructor(records) {
		this.items = records.map(record => new TraceItem(record));
	}

	filterByName(name) {
		return this.items.filter(item => item.name === name);
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

}

class TraceItem {

	constructor(record) {
		this.id = record.id;
		this.name = record.name;
		this.output = record.output;
		this.parent = record.parent || '';
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
