"use strict";

const Utils = require('../utils');

class User {
    constructor(data, client) {
        this.name = "";
        this.group = " ";
        this.connected = false;
        this.rooms = new Utils.Set();
        this.lastMessage = null;
        this.lastSeen = null;
        /** @type {string | number} */
        this.avatar = null;
        this.idle = false;
        this.status = "";
        this.blockChallenges = false;
        this.blockPMs = false;

        this.init(data);
        Object.defineProperty(this, 'client', {value: client});
    }

    get id() {
        return this.name;
    }

    update() {
        this.lastSeen = Date.now();
    }

    /**
     * 
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
        this.blockChallenges = false;
        this.blockPMs = false;
        this.update();
    }

    /** @return {JSON} */
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