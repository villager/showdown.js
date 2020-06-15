const BaseCache = require('./base');
const Room = require('../../structures/room');
const Utils = require('../../utils');

class RoomManager extends BaseCache {
    /**
     * Our Manager of rooms
     * @constructor
     * @param {Client} client 
     */
    constructor(client) {
        super();
        Object.defineProperty(this, 'client', {value: client});
    }
    /**
     * Create a new room in the cache
     * @param {Object} data
     * @throws {Error} If the room already exist
     */
    create(data) {
        if (this.has(data.name)) return; // Thow error already exist
        super.create(Utils.toId(data.name), new Room(data, this.client));
    }
    /**
     * Remove a room in the cache
     * @param {String} id 
     * @throws {Error} Throw if the room does not exist
     */
    remove(id) {
        if (!this.has(id)) return; // Throw error no room exist
        super.remove(id);
    }
    /**
     * Get room's name
     * @param {String} id 
     */
    resolveName(id) {
        if (!this.has(id)) return false;
        return this.get(id).name;
    }
    /**
     * Get room's id
     * @param {String} user 
     */
    resolve(user) {
        if (!this.has(user)) return false;
        return this.get(user).id;
    }
}
module.exports = RoomManager;