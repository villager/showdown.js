'use strict';

const DEFAULT_TRY_RECONNECT = 30 * 1000;

import { Client } from "../client";
import { ActivityManager } from "./activity";
interface StatusType {
	connected: boolean;
	named?: boolean;
}
export class ConnectionManager {
    client: Client
    connecting: boolean;
    closed: boolean;
    maxAttemps: number;
    attemps: number;
    activity: ActivityManager;
    conntime: number;
    _timer: null| NodeJS.Timer;
    time: number;
	status: StatusType;
	constructor(client: Client) {
        this.client = client;
		this.connecting = false;
		this.status = {connected: false};
		this.closed = false;
		this.maxAttemps = client.reconnect ? client.reconnect.attemps : 3;
		this.attemps = 0;
		this.activity = new ActivityManager(this.client);
		this.conntime = 0;
		this._timer = null;
		this.time = client.reconnect ? client.reconnect.time : DEFAULT_TRY_RECONNECT;
	}
	_clear() {
		if (!this._timer) return;
		clearTimeout(this._timer);
		this._timer = null;
	}
	reconnect() {
		this._clear();
		this._timer = setTimeout(() => {
			if (this.closed) return;
			this.client.socket.on();
			this.attemps++;
			if (this.attemps > this.maxAttemps) {
				this.activity._clear();
				this.closed = true;
				console.log(`Connection closed to ${this.client.id}`);
			}
		}, this.time);
	}
}