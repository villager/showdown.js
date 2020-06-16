'use strict';

const {EventEmitter} = require('events');

const DEFAULT_SERVER = {
	port: 8000,
	host: 'sim.smogon.com',
	id: 'Showdown',
};

class BaseClient extends EventEmitter {
	/**
	 * Our base core of the client
	 * @constructor
	 * @param {AnyObject} options
	 */
	constructor(options = {}) {
		super();

		if (!options.port || !options.host) Object.assign(options, DEFAULT_SERVER);
		/** @type {number} **/
		this.port = options.port;

		/** @type {string} **/
		this.host = options.host;

		if (options.id) this._id = options.id;

		/** @type {StatusManager} **/
		// this.status = new StatusManager();

		for (let i in options) {
			if (this[i] || i === 'id') continue;
			/** @type {any} */
			this[i] = options[i];
		}
	}

	/**
	 * Get server Id
	 * @returns {string} if the id was not declared, the id is the host
	 */
	get id() {
		if (this._id) return this._id;
		return this.host;
	}

	/**
	 * Increment listeners
	 */
	incrementListeners() {
		const max = this.getMaxListeners();
		if (max !== 0) {
			this.setMaxListeners(max + 1);
		}
	}

	/**
	 * Decrement listeners
	 */
	decrementListeners() {
		const max = this.getMaxListeners();
		if (max !== 0) {
			this.setMaxListeners(max - 1);
		}
	}
}

module.exports = BaseClient;
