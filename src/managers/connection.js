"use strict";

const DEFAULT_TRY_RECONNECT = 30 * 1000;

class ConnectionManager {
    constructor(client) {
        Object.defineProperty(this, 'client', {value: client});
		this.connecting = false;
		this.status = {connected: false};
		this.closed = false;
		this.maxAttemps = client.reconnect.attemps || 3;
		this.attemps = 0;
		this.activity = new Activity(this);
		this.conntime = 0;
		this._timer = null;
		this.time = client.reconnect.time || DEFAULT_TRY_RECONNECT;
	}
	_clear() {
		if (!this._timer) return;
		clearTimeout(this._timer);
		this._timer = null;
	}
	reconnect() {
		this._clear();
		this.timer = setTimeout(() => {
			if (this.closed) return;
			this.server.connect();
			this.attemps++;
			if (this.attemps > this.maxAttemps) {
				this.activity.clear();
				this.closed = true;
				console.log(`Connection closed to ${this.client.id}`);
			}
		});
	}
}
module.exports = ConnectionManager;