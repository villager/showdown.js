

import { BaseClient } from "./base";
import { SocketManager } from "./socket";
import {UserManager, RoomManager, FormatsManager, LoginManager} from '../managers';

interface ReconnectType {
	time: number;
	attemps: number;
}
export class Client extends BaseClient {
	/**
	 * Our core client
	 * @constructor
	 * @param {AnyObject} options
	 */
	socket: SocketManager;
	users: UserManager;
	rooms: RoomManager;
	formats: FormatsManager;
	_login: LoginManager;
	reconnect: ReconnectType|null;
	constructor(options: AnyObject) {
		super(options);
		/** @type {SocketManager} **/
		this.socket = new SocketManager(this);

		/** @type {UserManager} **/
		this.users = new UserManager(this);

		/** @type {RoomManager} **/
		this.rooms = new RoomManager(this);

		/** @type {FormatsManager} */
		this.formats = new FormatsManager();
		
		/** @type {LoginManager} **/
		this._login = new LoginManager(this);

		this.on('disconnect', err => {
			console.log('Bot Disconnected from ' + this.host + (err ? ' | ' + err.code + ': ' + err.message : ''));
			if (this.socket.connection.closed || this.socket.connection.connecting || this.socket.connection.status.connected)
				return;
			this.socket.reconnect();
		});
		this.reconnect = options.reconnect ?? null;
	}

	send(data: string|string[], room?: string) {
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
	login(name: string, pass: string) {
		this._login.login(name, pass);
	}
	/**
	 * Event of parseLine, use callback as a function () => {}
	 * @param {Function} callback
	 */
	parseLine(callback: any) {
		this.on('parseLine', callback);
	}
	/**
	 * Validations of data
	 */
	$validation() {}
}