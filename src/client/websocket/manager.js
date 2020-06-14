"use strict";

const SockJS = require('sockjs-client');
const ConnectionManager = require('../../managers/connection');
const ChatManager = require("../../managers/chat");

class SocketManager {
    constructor(client) {
        Object.defineProperty(this, 'client', {value: client});
        this.connection = new ConnectionManager(client);
        this.chat = new ChatManager(client);
        this.socket = null;
    }
    destroy(e) {
        if (this.socket) {
            this.socket.close();
        }
        this.connection.connecting = false;
        this.socket = null;
        this.client.reset();
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
			this.client.receive(data);
			this.connection.activity.date = Date.now();
        };
		this.connection.connecting = true;
		this.client.emit('connecting');
    }
    reconnect() {
        return this.connection.reconnect();
    }
}

module.exports = SocketManager;