"use strict";
const BaseClient = require('./base');
const RoomManager = require('../managers/cache/rooms');
const UserManager = require('../managers/cache/users');
const SocketManager = require('./websocket');

class Client extends BaseClient {
    constructor(options) {
        super(options);
        this.socket = new SocketManager(this)
        this.users = new UserManager(this);
        this.rooms = new RoomManager(this);
        this.socket.on();
        this.on("disconnect", (e) => {
            console.log('Bot Disconnected' + (err ? ' | ' + err.code + ': ' + err.message : ''));
            if (this.socket.connection.closed || this.socket.connection.connecting || this.socket.connection.connected) return;
            this.socket.reconnect();
        });
    }
    parseLine(callback) {
        this.on("parseLine", callback);
    }
	reset() {
		for (const k in this.sending) {
			this.sending[k].kill();
			delete this.sending[k];
		}
        this.nextSend = 0;
        this.rooms.cache.clear();
		this.manager.conntime = 0;
	}
}

module.exports = Client;