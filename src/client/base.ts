'use strict';

import {EventEmitter} from 'events';

export class BaseClient extends EventEmitter {
    readonly port: number;
    readonly host: string;
    readonly _id: string;
	readonly name: string;
	readonly pass: string;
	readonly baseRooms: string[];
	constructor(options:AnyObject) {
		super();

		/** @type {number} **/
		this.port = options.port;

		/** @type {string} **/
		this.host = options.host;

		if (options.id) this._id = options.id;

		this.name = options.name ?? '';
		this.pass = options.pass ?? '';
		this.baseRooms = options.baseRooms ?? [];


		/** @type {StatusManager} **/
		// this.status = new StatusManager();
	}
	get id(): string {
		if (this._id) return this._id;
		return this.host;
	}
	incrementListeners(): void {
		const max: number = this.getMaxListeners();
		if (max !== 0) {
			this.setMaxListeners(max + 1);
		}
	}
	decrementListeners(): void {
		const max: number = this.getMaxListeners();
		if (max !== 0) {
			this.setMaxListeners(max - 1);
		}
	}
}