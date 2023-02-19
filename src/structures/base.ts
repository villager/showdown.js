
import * as Utils from '../lib';
export class BaseUser {
	/**
	 * Class for the bot as user
	 * @constructor
	 */
    name: string;
	language: ID;
	client: Client;
	constructor(client: Client) {
		this.client = client;
		this.language = 'english' as ID;
		/** @type {string | number} **/
	}
	send(data: string, room: ID) {
		this.client.send(data, room);
	}
	/**
	 * Gets the bot Id
	 * @return {string} Returns an string
	 */
	get id(): string {
		return Utils.toId(this.name);
	}
}