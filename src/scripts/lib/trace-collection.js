const loadData = require('./load-data');

class TraceCollection {

	static loadData() {
		return loadData();
	}

	constructor(records) {
		this.items = records.map(record => new TraceItem(record));
		this.nameMap = {};
		this.dependencies = {};
		this.dependents = {};
		for (let item of this.items) {

			if (!this.nameMap[item.name]) {
				this.nameMap[item.name] = [];
			}
			this.nameMap[item.name].push(item);

			if (item.parent) {
				if (item.parent && !this.dependencies[item.parent]) {
					this.dependencies[item.parent] = {};
				}
				this.dependencies[item.parent][item.name] = true;

				if (!this.dependents[item.name]) {
					this.dependents[item.name] = {};
				}
				this.dependents[item.name][item.parent] = true;
			}
		}
	}

	get names() {
		return Object.keys(this.nameMap);
	}

	findItems(name) {
		return this.nameMap[name];
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
		this.parent = record.parent;
	}

}

module.exports = TraceCollection;
