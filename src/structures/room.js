"use strict";

const Utils = require('../utils');

class Room {
    constructor(data, client) {
        /** @type {string} */
        this.name = "";

        /** @type {Set|null} */
        this.users = null;

        /** @type {Set|null} */
        this.subRooms = null;

        /** @type {string} */
        this.type = ' ';

        /** @type {string} */
        this.language = "english"

        /** @type {string|null} */
        this.modjoin = null;

        /** @type {string} */
        this.modchat = null;

        /** @type {string} */
        this.visivility = null;

        /** @type {Map<string, Set>|null} */
        this.auth = null;

        Object.defineProperty(this, 'client', {value: client});
        this.init(data);
    }

    get userCount() {
        if (!this.users) return 0;
        return this.users.size;
    }

    get id() {
        return Utils.toId(this.name);
    }

    update(data) {
        if (data.language) this.language = data.language;
        if (data.name) this.name = data.name;
        if (data.users) this.updateUsers(data.users);
        if (data.auth) this.updateAuth(data.auth)
    }

    updateUsers(arr) {}

    init(data) {
        this.name = data.name;
        this.users = new Utils.Set();
        this.subRooms = new Utils.Set();
        this.auth = new Utils.Map();
        this.type = data.type;
    }

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
module.exports = Room;