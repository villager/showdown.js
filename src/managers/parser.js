'use strict';

class ParserManager {
    constructor(client) {
        Object.defineProperty(this, 'client', {value: client});
    }
    get commands() {
        return this.client.commands;
    }
}

module.exports = ParserManager;