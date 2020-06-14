"use strict";

const SockJS = require('sockjs-client');
const ConnectionManager = require('../../managers/connection');
const ChatManager = require("../../managers/chat");
const SendManager = require('../../managers/sender');

class SocketManager {
    constructor(client) {
        Object.defineProperty(this, 'client', {value: client});
        this.connection = new ConnectionManager(client);
        this.chat = new ChatManager(client);
        this.socket = null;
        this.sending = {};
		this.nextSend = 0;
		this.maxLinesSend = 3;
    }
    getSendId() {
		return this.nextSend++;
	}
    destroy(e) {
        if (this.socket) {
            this.socket.close();
        }
        this.connection.connecting = false;
        this.socket = null;
        this.reset();
        if (e) {
            this.client.emit("disconnect", {code: e.code, message: e.reason});
        } else {
            this.client.emit("disconnect");
        }
    }
    on() {
        if (this.connection.connected || this.socket) return;
        this.connection.closed = false;
		this.socket = new SockJS(`http://${this.client.host}:${this.client.port}/showdown/`);
		this.socket.onerror = () => {
            this.destroy();
        };
        this.socket.onopen = () => {
            this.connection.connecting = false;
            this.connection.conntime = Date.now();
            this.connection.attemps = 0;
            this.client.emit('connect', this.socket);
        };
		this.socket.onclose = e => {
            this.destroy(e);
        };
		this.socket.onmessage = e => {
			let data = e.data;
			if (typeof data !== 'string') {
				data = JSON.stringify(data);
			}
			this.client.emit('message', data);
			this.chat.receive(data);
			this.connection.activity.date = Date.now();
        };
		this.connection.connecting = true;
		this.client.emit('connecting');
    }
    reconnect() {
        return this.connection.reconnect();
    }
    send(data, room) {
		if (!room) room = '';
		if (!(data instanceof Array)) {
			data = [data.toString()];
		}
		for (let i = 0; i < data.length; i++) {
			data[i] = room + '|' + data[i];
		}
		return this.rawSend(data);
    }
    /**
     * Primitive send
     * @private
     * @param {string} data 
     */
    sendBase(data) {
		if (!this.socket) return null;
		const id = this.getSendId();
		const manager = new SendManager(
			data,
			3,
			msg => {
				this.socket.send(msg);
				this.emit('send', msg);
			},
			() => {
				delete this.sending[id];
			},
		);
		this.sending[id] = manager;
		manager.start();
		return manager;
    }
    reset() {
		for (const k in this.sending) {
			this.sending[k].kill();
			delete this.sending[k];
		}
        this.nextSend = 0;
        this.client.rooms.cache.clear();
        this.client.users.cache.clear();
		this.connection.conntime = 0;
    }
}

module.exports = SocketManager;