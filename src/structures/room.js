"use strict";

class Rooms {
    constructor(data, client) {
        this.name = "";
        this.users = null;
        this.language = "english"
        Object.defineProperty(this, 'client', {value: client});
        this.init(data);
    }
    get userCount() {
        if (!this.users) return 0;
        return this.users.size;
    }
    get id() {
        return this.name;
    }
    update(data) {
        if (data.language) this.language = data.language;
        if (data.name) this.name = data.name;
        if (data.users) this.updateUsers(data.users);
    }
    updateUsers(arr) {

    }
    init(data) {
        this.name = data.name;
        this.users = new Set();
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