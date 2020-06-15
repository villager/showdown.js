"use strict";

const Utils = require('../utils');

class RoomListManager  {
    constructor(client) {
        Object.defineProperty(this, 'client', {value: client});
        this.isOfficial = new Utils.Set();
        this.isChat = new Utils.Set();
    }
    join(room) {
        if (this.client.rooms.has(Utils.toId(room))) return false;
        this.client.socket.send(`/join ${Utils.toId(room)}`);
    }
    /**
     * Join in all section room
     * @private
     * @param {Set}
     */
    joinSection(section) {
        section.forEach(room => {
            this.join(room);
        });
    }
    check() {
        for (const room of this.client.baseRooms) {
            if (room === 'all') {
                this.joinSection(this.isOfficial);
                this.joinSection(this.isChat);
            } else if (room === 'official') {
                this.joinSection(this.isOfficial);
            } else if (room === 'chat' || room === 'public') {
                this.joinSection(this.isChat);
            } else {
                this.join(room);
            }
        }
    }
}
module.exports = RoomListManager;