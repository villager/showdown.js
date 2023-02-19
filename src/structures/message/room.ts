import { toId } from "../../lib";

import {Channel} from './base';
export class RoomChannel extends Channel {
    date: number;
    room: string;
	constructor(client: Client, options: AnyObject) {
		super(client, options);

		this.date = options.date;

		if (this.client.rooms.has(toId(options.room) as ID)) {
			this.room = this.client.rooms.get(toId(options.room) as ID);
		} else {
			this.room = options.room;
		}
	}
	send(data: string) {
		super.send(data, toId(this.room));
	}
}