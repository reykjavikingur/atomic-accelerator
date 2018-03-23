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
		this.nameMap = {};
		this.parentMap = {};
		this.dependencies = {};
		this.dependents = {};
		for (let item of this.items) {

			if (!this.nameMap[item.name]) {
				this.nameMap[item.name] = [];
			}
			this.nameMap[item.name].push(item);

			if (!this.parentMap[item.parent]) {
				this.parentMap[item.parent] = [];
			}
			this.parentMap[item.parent].push(item);

			if (item.parent) {
				if (!this.dependencies[item.parent]) {
					this.dependencies[item.parent] = {};
				}
				if (!this.dependencies[item.parent][item.name]) {
					this.dependencies[item.parent][item.name] = 0;
				}
				this.dependencies[item.parent][item.name]++;

				if (!this.dependents[item.name]) {
					this.dependents[item.name] = {};
				}
				if (!this.dependents[item.name][item.parent]) {
					this.dependents[item.name][item.parent] = 0;
				}
				this.dependents[item.name][item.parent]++;
			}
		}
	}

	get names() {
		return Object.keys(this.nameMap);
	}

	// TODO dereference return values to protect against external mutations

	filterByName(name) {
		return this.nameMap[name];
	}

	filterByParent(parent) {
		return this.parentMap[parent];
	}

	groupItemsByName() {
		return this.nameMap;
	}

	groupItemsByParent() {
		return this.parentMap;
	}

	findDependencies(name) {
		if (name && this.dependencies[name]) {
			return Object.keys(this.dependencies[name]);
		}
		else {
			return [];
		}
	}

	findDependents(name) {
		if (name && this.dependents[name]) {
			return Object.keys(this.dependents[name]);
		}
		else {
			return [];
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

}

module.exports = TraceCollection;
