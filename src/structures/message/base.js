"use strict";

class Channel {
    constructor(client, options = {}) {
        Object.defineProperty(this, 'client', {value: client});
        this.content = options.content;
        this.type = options.type;
    }
    send(data, room) {
        return this.client.socket.send(data, room);
    }
}
module.exports = Channel;