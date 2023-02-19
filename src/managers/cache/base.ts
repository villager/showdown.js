
import { toId } from "../../lib";

export class BaseCache extends Map {
	/**
	 * Create a new element in the cache
	 * @param {String} id
	 * @param {any} arg
	 */
	create(id: ID, arg: any) {
		let ID = toId(id) as ID;
		if (this.has(ID))  return false;
		this.set(ID, arg);
		return true;
	}
	/**
	 * Remove an element from the cache
	 * @param {String} id
	 */
	remove(id: ID): boolean {
		let ID = toId(id) as ID;
		if (!this.has(ID))  return false;
		this.remove(ID);
		return true;
	}
	/**
	 * Check if a elment exists in the cache
	 * @param {String} id
	 * @returns {Boolean} Returns a Boolean
	 */
	has(id: ID): boolean {
		let ID = toId(id) as ID;
		if (!super.has(ID)) return false;
		return true;
	}
	/**
	 * Get an element from the cache
	 * @param {String} id
	 * @returns {(User|Room)} Return the data from the cache
	 */
	get(id: ID) {
		let ID = toId(id) as ID;
		if (!this.has(ID)) return false;
		return super.get(ID);
	}
}