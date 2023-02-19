'use strict';

import { BaseUser } from "./base";

export class Room extends BaseUser {
    users: Set<string>
    modchat: null|string;
    modjoin: null|string;
    visibility: null|string;
    type: string;
    auth: Map<string, Set<string>>
    subRooms: null|Set<string>
	constructor(data: AnyObject, client: Client) {
        super(client);
		/** @type {string} */
		this.name = '';

		/** @type {Set|null} */
		this.users = new Set();

		/** @type {Set|null} */
		this.subRooms = new Set();

		/** @type {string} */
		this.type = ' ';

		/** @type {string|null} */
		this.modjoin = null;

		/** @type {string} */
		this.modchat = null;

		/** @type {string} */
		this.visibility = data.visibility ?? 'hidden';

		/** @type {Map<string, Set>|null} */
		this.auth = new Map();
		this.update(data);
	}

	get userCount() {
		if (!this.users) return 0;
		return this.users.size;
	}

	update(data: AnyObject) {
		if (data.language) this.language = data.language;
		if (data.name) this.name = data.name;
		if (data.modchat) this.modchat = data.modchat;
		if (data.modjoin) this.modjoin = data.modjoin;
		if (data.visibility) this.visibility = data.visibility;
		if (data.users) this.updateUsers(data.users);
		if (data.auth) this.updateAuth(data.auth);
	}

	/**
	 *
	 * @param {Set} arr
	 * @returns {void}
	 */
	updateUsers(data: any): void {
		for (const user of data) {
			if (!user) continue;
			if (!this.users.has(user)) this.users.add(user.slice(1));
		}
	}
	send(data: string) {
		super.send(data, this.id as ID);
	}
	/**
	 *
	 * @param {Map<string, Set>} auth
	 */
	updateAuth(data: AnyObject) {
		for (let i in data) {
			if (!this.auth.has(i)) {
				this.auth.set(i, new Set());
			}
			for (const user of data[i]) {
				if (!this.auth.get(i)?.has(user)) {
					this.auth.get(i)?.add(user);
				}
			}
		}
	}
}