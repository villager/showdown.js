"use strict";

class MessageManager {
    constructor(room, options = {}) {
        this.room = room;
        this.type = 'room';
        this.date = options.date;
        this.content = options.content;
    }
}