"use strict";
const SockJS = require('sockjs-client');
const BaseClient = require('./base');
const RoomManager = require('../managers/cache/rooms');
const UserManager = require('../managers/cache/users');


class Client extends BaseClient {
    constructor(options) {
        super(options);
        this.users = new UserManager(this);
        this.rooms = new RoomManager(this);
    }
    destroy() {
        if (this.socket) this.socket.close();
        this.socket = null;
    }
}

module.exports = Client;