'use strict';

const Utils = require('../utils');

class RoomListManager {
	constructor(client) {
		Object.defineProperty(this, 'client', {value: client});
		this.isOfficial = new Utils.Set();
		this.isChat = new Utils.Set();
	}
	join(rooms) {
		if (Array.isArray(rooms)) {
			let roomData = [];
			for (const room of rooms) {
				if (!this.client.rooms.has(Utils.toId(room))) {
					roomData.push(`/join ${Utils.toId(room)}`);
				}
			}
			this.client.socket.send(roomData);
		} else {
			if (!this.client.rooms.has(Utils.toId(rooms))) {
				this.client.socket.send(`/join ${rooms}`);
			}
		}
	}
	/**
	 * Join in all section room
	 * @private
	 * @param {Set}
	 */
	joinSection(section) {
		this.join(section.toJSON());
	}
	check() {
		for (const room of this.client.baseRooms) {
			if (room === 'all') {
				this.joinSection(this.isOfficial);
				this.joinSection(this.isChat);
			} else if (room === 'official') {
				this.joinSection(this.isOfficial);
			} else if (room === 'chat' || room === 'public') {
				this.joinSection(this.isChat);
			} else {
				this.join(room);
			}
		}
	}
}
module.exports = RoomListManager;
