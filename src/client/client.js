"use strict";

const BaseClient = require('./base');
const RoomManager = require('../managers/cache/rooms');
const UserManager = require('../managers/cache/users');
const FormatsManager = require('../managers/cache/formats');
const SocketManager = require('./websocket');
const LoginManager = require('../managers/login');
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

        /** @type {FormatsManager} */
        this.formats = new FormatsManager();

        /** @type {UserBot} **/
        this.user = new UserBot(this);

        /** @type {LoginManager} **/
        this._login = new LoginManager(this);

        this.on("disconnect", err => {
            console.log('Bot Disconnected' + (err ? ' | ' + err.code + ': ' + err.message : ''));
            if (this.socket.connection.closed || this.socket.connection.connecting || this.socket.connection.connected) return;
            this.socket.reconnect();
        });
    }
    send(data, room) {
        this.socket.send(data, room);
    }
    connect() {
        return this.socket.on();
    }
    /**
     * Log into the server
     * @param {string} name 
     * @param {string?} pass 
     */
    login(name, pass) {
        this._login.login(name, pass);
    }
    /**
     * Event of parseLine, use callback as a function () => {}
     * @param {Function} callback 
     */
    parseLine(callback) {
        this.on("parseLine", callback);
    }
    /**
     * Validations of data
     */
    $validation() {

    }
    loadCommands() {}
}

module.exports = Client;