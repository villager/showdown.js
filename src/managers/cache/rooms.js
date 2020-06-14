const BaseCache = require('./base');
const Room = require('../../structures/room');

class RoomManager extends BaseCache {
    constructor(client) {
        super();
        Object.defineProperty(this, 'client', {value: client});
    }
    /**
     * @param {Object} data 
     */
    create(data) {
        if (this.has(data.name)) return; // Thow error already exist
        super.set(data.name, new Room(data, this.client));
        this.client.send(`/join ${data.name}`)
    }
    /**
     * @param {String} id 
     */
    remove(id) {
        if (!this.has(id)) return; // Throw error no room exist
        super.remove(id);
    }
    /**
     * @param {String} id 
     */
    resolveName(id) {
        if (!this.has(id)) return false;
        return this.get(id).name;
    }
    /**
     * @param {String} user 
     */
    resolve(user) {
        if (!this.has(user)) return false;
        return this.get(user).id;
    }
}
module.exports = RoomManager;