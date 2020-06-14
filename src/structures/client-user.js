"use strict";

const Utils = require('../utils');

class User {
    /**
     * Main class of users
     * @param {AnyObject} data 
     * @param {Client} client 
     */
    constructor(data, client) {
        /** @type {string} */
        this.name = "";
        /** @type {string} */
        this.group = " ";
        /** @type {Boolean} */
        this.connected = false;
        /** @type {string[]} */
        this.rooms = new Utils.Set();
        /** @type {null|string} */
        this.lastMessage = null;
        /** @type {number} **/
        this.lastSeen = null;
        /** @type {string | number} **/
        this.avatar = null;
        /** @type {string} **/
        this.idle = false;
        /** @type {string} **/
        this.status = "";

        this.init(data);
        Object.defineProperty(this, 'client', {value: client});
    }
    /**
     * Return user's Id
     * @return {string}
     */
    get id() {
        return this.name;
    }

    /**
     * Update user's info
     * @param {AnyObject} data
     * @return {void} 
     */
    update(data) {
        this.lastSeen = Date.now();
    }

    /**
     * Initializacion of the user
     * @param {object} data 
     * @return {void}
     */
    init(data) {
        if (data.name) this.name = data.name;
        if (data.group) this.group = data.group;
        this.avatar = data.avatar || 1;
        this.status = data.status || "";
        this.connected = true;
        this.lastMessage = "";
        this.idle = false;
        this.update();
    }

    /**
     * Convert local data into an object
     * @return {JSON}
     */
    toJSON() {
        let json = Object.create(null);
        for (const [key, value] of this) {
            if(typeof this[key] !== "function") {
                json[key] = value;
            }
        }
        return json;
    }
}
module.exports = User;