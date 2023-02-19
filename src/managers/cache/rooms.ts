/**
 * Rooms Cache
 */
import { BaseCache } from "./base";
import {Room} from '../../structures';
import { toId } from "../../lib";

export class RoomManager extends BaseCache {
	/**
	 * Our Manager of rooms
	 * @constructor
	 * @param {Client} client
	 */
    client: Client;
	constructor(client: Client) {
		super();
        this.client = client;
	}
	/**
	 * Create a new room in the cache
	 * @param {Object} data
	 * @throws {Error} If the room already exist
	 */
	create(data: any) {
		if (this.has(data.name)) return false; // Thow error already exist
		super.create(toId(data.name) as ID, new Room(data, this.client));
        return true;
	}
	/**
	 * Remove a room in the cache
	 * @param {String} id
	 * @throws {Error} Throw if the room does not exist
	 */
	remove(id: ID) {
		if (!this.has(id)) return false; // Throw error no room exist
		super.remove(id);
        return true;
	}
	/**
	 * Get room's name
	 * @param {String} id
	 */
	resolveName(id: ID) {
		if (!this.has(id)) return false;
		return this.get(id).name;
	}
	/**
	 * Get room's id
	 * @param {String} user
	 */
	resolve(user: ID) {
		if (!this.has(user)) return false;
		return this.get(user).id;
	}
}