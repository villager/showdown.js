'use strict';

const BaseChannel = require('./base');
const Utils = require('../../utils');

class RoomChannel extends BaseChannel {
	constructor(client, options) {
		super(client, options);

		this.date = options.date;

		if (this.client.rooms.has(Utils.toId(options.room))) {
			this.room = this.client.rooms.get(Utils.toId(options.room));
		} else {
			this.room = options.room;
		}
	}
	send(data) {
		super.send(data, Utils.toId(this.room));
	}
}

module.exports = RoomChannel;
