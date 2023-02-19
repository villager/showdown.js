
import { BaseUser } from "./base";
export class User extends BaseUser {
	/**
	 * Main class of users
	 * @constructor
	 * @param {AnyObject} data
	 * @param {Client} client
	 */
    rooms: Set<string>;
    connected: boolean;
    lastSeen: null|number;
    lastMessage: null|string;
    client: Client;
	group: string;
    idle: boolean;
    status: string;
    blockChallenges: boolean;
    blockPMs: boolean;
	avatar: string|number;
	constructor(data: AnyObject, client: Client) {
		super(client);

		/** @type {Boolean} */
		this.connected = false;

		/** @type {string[]} */
		this.rooms = new Set();

		/** @type {null|string} */
		this.lastMessage = null;

		/** @type {number} **/
		this.lastSeen = null;
		this.name = data.name ?? '';
        this.group = data.group ?? '';
		this.avatar = 1;
		this.status = '';
		this.connected = true;
		this.lastMessage = '';
		this.idle = false;
		this.blockChallenges = false;
		this.blockPMs = false;
		this.update(data);
	}

	/**
	 * Update user's info
	 * @param {AnyObject} data
	 */
	update(data: AnyObject = {}) {
		this.lastSeen = Date.now();
		if (data.avatar) {
			this.avatar = data.avatar;
		}
		if (data.status) {
			this.status = data.status;
		}
		if (data.group) {
			this.group = data.group;
		}
	}
	send(data: string) {
		return this.client.send(`/msg ${this.id}, ${data}`);
	}
}