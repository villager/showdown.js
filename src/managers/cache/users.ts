/**
 *  Manager of the users
 */
import { BaseCache } from "./base";
import { User } from "../../structures";
import { toId } from "../../lib";

export class UserManager extends BaseCache {
	client: Client
	constructor(client: Client) {
		super();
		this.client = client;
	}
	/**
	 * Remove a user from the cache
	 * @param {String} user
	 * @throws {Error} if the user does not exist
	 */
	remove(user: ID): boolean {
		if (!this.has(user)) throw Error("User doesn't exist"); // No user exists
		super.remove(user);
		return true;
	}
	/**
	 * Create a user in the cache
	 * @param {Object} data
	 * @throws {Error} if the user already exist
	 */
	create(data: any){
		if (this.has(data.name)) throw Error('User already exist'); // Error User already Exist
		super.create(toId(data.name) as ID, new User(data, this.client));
		return true;
	}
	check(user: ID) {
		this.client.send(`/cmd userdetails ${user}`);
	}
	update(user: ID, data: AnyObject) {
		let uid = toId(user) as ID;
		if (!this.has(uid)) return null;
		return this.get(uid).update(data);
	}
	/**
	 * Get user's name
	 * @param {String} user
	 */
	resolveName(user: ID) {
		if (!this.has(user)) return false;
		return this.get(user).name;
	}
	/**
	 * Get user's id
	 * @param {String} user
	 */
	resolve(user: ID) {
		if (!this.has(user)) return false;
		return this.get(user).id;
	}
}