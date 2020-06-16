'use strict';
/**
 *  Manager of the users
 */

const BaseCache = require('./base');
const User = require('../../structures/user');
const Utils = require('../../utils');

class UserManager extends BaseCache {
	constructor(client) {
		super();
		Object.defineProperty(this, 'client', {value: client});
	}
	/**
	 * Remove a user from the cache
	 * @param {String} user
	 * @throws {Error} if the user does not exist
	 */
	remove(user) {
		if (!this.has(user)) return; // No user exists
		super.remove(user);
	}
	/**
	 * Create a user in the cache
	 * @param {Object} user
	 * @throws {Error} if the user already exist
	 */
	create(data) {
		if (this.has(data.name)) return; // Error User already Exist
		super.create(Utils.toId(data.name), new User(data, this.client));
	}
	check(user) {
		this.client.socket.send(`/cmd userdetails ${user}`);
	}
	update(user, data) {
		user = Utils.toId(user);
		if (!this.has(user)) return null;
		return this.get(user).update(data);
	}
	/**
	 * Get user's name
	 * @param {String} user
	 */
	resolveName(user) {
		if (!this.has(user)) return false;
		return this.get(user).name;
	}
	/**
	 * Get user's id
	 * @param {String} user
	 */
	resolve(user) {
		if (!this.has(user)) return false;
		return this.get(user).id;
	}
}
module.exports = UserManager;
