'use strict';

const Utils = require('../utils');

class Room {
	constructor(data, client) {
		/** @type {string} */
		this.name = '';

		/** @type {Set|null} */
		this.users = null;

		/** @type {Set|null} */
		this.subRooms = null;

		/** @type {string} */
		this.type = ' ';

		/** @type {string} */
		this.language = 'english';

		/** @type {string|null} */
		this.modjoin = null;

		/** @type {string} */
		this.modchat = null;

		/** @type {string} */
		this.visibility = null;

		/** @type {Map<string, Set>|null} */
		this.auth = null;

		Object.defineProperty(this, 'client', {value: client});
		this.init(data);
	}

	get userCount() {
		if (!this.users) return 0;
		return this.users.size;
	}

	get id() {
		return Utils.toId(this.name);
	}

	update(data) {
		if (data.language) this.language = data.language;
		if (data.name) this.name = data.name;
		if (data.modchat) this.modchat = data.modchat;
		if (data.modjoin) this.modjoin = data.modjoin;
		if (data.visibility) this.visibility = data.visibility;
		if (data.users) this.updateUsers(data.users);
		if (data.auth) this.updateAuth(data.auth);
	}

	/**
	 *
	 * @param {Set} arr
	 * @returns {void}
	 */
	updateUsers(data) {
		for (const user of data) {
			if (!user) continue;
			if (!this.users.has(user)) this.users.add(user.slice(1));
		}
	}
	send(data) {
		this.client.socket.send(data, this.id);
	}
	/**
	 *
	 * @param {Map<string, Set>} auth
	 */
	updateAuth(data) {
		for (let i in data) {
			if (!this.auth.has(i)) {
				this.auth.set(i, new Utils.Set());
			}
			for (const user of data[i]) {
				if (!this.auth.get(i).has(user)) {
					this.auth.get(i).add(user);
				}
			}
		}
	}

	init(data) {
		this.name = data.name;
		this.type = data.type;
		this.modjoin = data.modjoin || null;
		this.modchat = data.modchat || null;
		this.visibility = data.visibility || 'hidden';

		this.users = new Utils.Set();
		this.subRooms = new Utils.Set();
		this.auth = new Utils.Map();
	}

	/** @returns {JSON} */
	toJSON() {
		let json = Object.create(null);
		for (const [key, value] of this) {
			if (typeof this[key] !== 'function') {
				json[key] = value;
			}
		}
		return json;
	}
}
module.exports = Room;
