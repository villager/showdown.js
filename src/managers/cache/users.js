/**
 *  Manager of the users 
 */

const BaseCache = require('./base');
const User = require('../../structures/client-user');

class UserManager extends BaseCache {
    constructor(client) {
        Object.defineProperty(this, 'client', {value: client});
    }
    /**
     * @param {String} user 
     */
    remove(user) {
        if (!this.has(user)) return; // No user exists
        super.remove(user);
    }
    /**
     * @param {Object} user 
     */
    create(data) {
        if (this.has(data.name)) return; // Error User already Exist
        super.create(data.name, new User(data, this.client));
    }
    /**
     * @param {String} user 
     */
    resolveName(user) {
        if (!this.has(user)) return false;
        return this.get(user).name;
    }
    /**
     * @param {String} user 
     */
    resolve(user) {
        if (!this.has(user)) return false;
        return this.get(user).id;
    }
}
module.exports = UserManager;