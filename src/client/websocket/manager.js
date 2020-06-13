"use strict";

class SocketManager {
    constructor(client) {
        Object.defineProperty(this, 'client', {value: client});
    }
}