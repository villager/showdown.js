'use strict';

const BaseChannel = require('./base');
const Utils = require('../../utils');

class PMChannel extends BaseChannel {
	constructor(client, options = {}) {
		super(client, options);

		if (this.client.users.has(Utils.toId(options.user))) {
			this.user = this.client.users.get(Utils.toId(options.user));
		} else {
			this.user = options.user;
		}
	}
	send(data) {
		super.send(`/msg ${Utils.toId(this.user)}, ${data}`);
	}
}

module.exports = PMChannel;
