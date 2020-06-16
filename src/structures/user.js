'use strict';

const Utils = require('../utils');
const BaseUser = require('./bot');

class User extends BaseUser {
	/**
	 * Main class of users
	 * @constructor
	 * @param {AnyObject} data
	 * @param {Client} client
	 */
	constructor(data, client) {
		super();

		/** @type {Boolean} */
		this.connected = false;

		/** @type {string[]} */
		this.rooms = new Utils.Set();

		/** @type {null|string} */
		this.lastMessage = null;

		/** @type {number} **/
		this.lastSeen = null;

		this.init(data);
		Object.defineProperty(this, 'client', {value: client});
	}

	/**
	 * Update user's info
	 * @param {AnyObject} data
	 */
	update(data = {}) {
		this.lastSeen = Date.now();
		if (data.avatar) {
			this.avatar = data.avatar;
		}
		if (data.status) {
			this.status = data.status;
		}
		if (data.group) {
			this.group = data.group;
		}
	}
	send(data) {
		return this.client.send(`/msg ${this.id}, ${data}`);
	}

	/**
	 * Initializacion of the user
	 * @param {object} data
	 */
	init(data) {
		if (data.name) this.name = data.name;
		if (data.group) this.group = data.group;
		this.avatar = 1;
		this.status = '';
		this.connected = true;
		this.lastMessage = '';
		this.idle = false;
		this.blockChallenges = false;
		this.blockPMs = false;
		this.update();
	}
}
module.exports = User;
