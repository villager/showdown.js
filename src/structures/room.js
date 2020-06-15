"use strict";

const Utils = require('../utils');

class Room {
    constructor(data, client) {
        this.name = "";
        /** @type {Set} */
        this.users = null;
        /** @type {Set} */
        this.subRooms = null;
        this.type = ' ';
        this.language = "english"
        this.modjoin = null;
        this.modchat = null;
        this.visivility = null;
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
    }

    updateUsers(arr) {}

    init(data) {
        this.name = data.name;
        this.users = new Utils.Set();
        this.subRooms = new Utils.Set();
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