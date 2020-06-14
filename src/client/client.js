"use strict";

const BaseClient = require('./base');
const RoomManager = require('../managers/cache/rooms');
const UserManager = require('../managers/cache/users');
const SocketManager = require('./websocket');
const UserBot = require('../structures/bot');

class Client extends BaseClient {
    /**
     * Our core client
     * @constructor
     * @param {AnyObject} options 
     */
    constructor(options) {
        super(options);

        /** @type {SocketManager} **/
        this.socket = new SocketManager(this);

        /** @type {UserManager} **/
        this.users = new UserManager(this);

        /** @type {RoomManager} **/
        this.rooms = new RoomManager(this);

        /** @type {UserBot} **/
        this.user = new UserBot(this);

        this.socket.on();

        this.on("disconnect", (e) => {
            console.log('Bot Disconnected' + (err ? ' | ' + err.code + ': ' + err.message : ''));
            if (this.socket.connection.closed || this.socket.connection.connecting || this.socket.connection.connected) return;
            this.socket.reconnect();
        });
    }
    /**
     * Event of parseLine, use callback as a function () => {}
     * @param {Function} callback 
     */
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
        this.users.cache.clear();
		this.manager.conntime = 0;
    }
    /**
     * Validations of data
     */
    $validation() {

    }
}

module.exports = Client;