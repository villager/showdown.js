class User {
    constructor(data, client) {
        this.name = "";
        this.group = " ";
        this.connected = false;
        this.rooms = new Set();
        this.lastMessage = null;
        this.lastSeen = null;
        this.init(data);
        Object.defineProperty(this, 'client', {value: client});
    }
    get id() {
        return this.name;
    }
    update() {
        this.lastSeen = Date.now();
    }
    init(data) {
        if (data.name) this.name = data.name;
        if (data.group) this.group = data.group;
        this.connected = true;
        this.lastMessage = "";
        this.update();
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
module.exports = User;