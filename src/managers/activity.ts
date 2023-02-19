import { Client } from "../client";

export class ActivityManager {
    _timer: null | NodeJS.Timer;
    client: Client;
	date: number;
	constructor(client: Client) {
        this.client = client;
		this.date = 0;
		this._timer = null;
	}
	_clear() {
		if (!this._timer) return;
		clearTimeout(this._timer);
		this._timer = null;
	}
}