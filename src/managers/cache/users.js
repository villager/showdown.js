/**
 *  Manager of the users 
 */

const BaseCache = require('./base');
const User = require('../../structures/user');

class UserManager extends BaseCache {
    constructor(client) {
        super();
        Object.defineProperty(this, 'client', {value: client});
    }
    /**
     * Remove a user from the cache
     * @param {String} user 
     * @throws {Error} if the user does not exist
     */
    remove(user) {
        if (!this.has(user)) return; // No user exists
        super.remove(user);
    }
    /**
     * Create a user in the cache
     * @param {Object} user 
     * @throws {Error} if the user already exist
     */
    create(data) {
        if (this.has(data.name)) return; // Error User already Exist
        super.create(data.name, new User(data, this.client));
    }
    /**
     * Get user's name
     * @param {String} user 
     */
    resolveName(user) {
        if (!this.has(user)) return false;
        return this.get(user).name;
    }
    /**
     * Get user's id
     * @param {String} user 
     */
    resolve(user) {
        if (!this.has(user)) return false;
        return this.get(user).id;
    }
}
module.exports = UserManager;