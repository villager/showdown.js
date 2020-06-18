'use strict';

const PMChannel = require('./pm');
const RoomChanel = require('./chat');
const Utils = require('../../utils');

class MessageHandler {
	constructor(client, options = {}) {
		Object.defineProperty(this, 'client', {value: client});
		this.type = options.type;
		this.content = options.content;
		if (this.type === 'PM') {
			this.source = new PMChannel(client, options);
		} else {
			this.source = new RoomChanel(client, options);
		}
		if (this.client.users.has(Utils.toId(options.user))) {
			this.user = this.client.users.get(Utils.toId(options.user));
		} else {
			this.user = options.user;
		}
	}
	reply(data) {
		return this.source.send(data);
	}
}

module.exports = MessageHandler;
