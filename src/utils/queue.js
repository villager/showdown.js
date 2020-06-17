'use strict';
class Nodo {
	constructor(fn) {
		this.do = fn;
		this.next = null;
	}
}
class Queue {
	constructor() {
		this._tasks = [];
		this._waiting = 0;
	}
	get _size() {
		return this._tasks.length;
	}
	push(fn) {
		let nodo = new Nodo(fn);
		if (this._size > 0) {
			this._tasks[this._size - 1].next = this._size;
		}
		this._tasks.push(nodo);
	}
	resolve() {
		let head = this._tasks[0];
		console.log(this._tasks);
		while (head.next !== null) {
			head.do();
			head = this._tasks[head.next];
		}
	}
}

module.exports = Queue;
