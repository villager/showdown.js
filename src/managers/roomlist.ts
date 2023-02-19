
import { toId } from "../lib";
export class RoomListManager {
    client: Client;
    isOfficial: Set<string>
    isChat: Set<string>
	constructor(client: Client) {
        this.client = client;
		this.isOfficial = new Set();
		this.isChat = new Set();
	}
	join(rooms: string|string[]) {
		if (Array.isArray(rooms)) {
			let roomData = [];
			for (const room of rooms) {
				if (!this.client.rooms.has(toId(room) as ID)) {
					roomData.push(`/join ${toId(room)}`);
				}
			}
			this.client.send(roomData);
		} else {
			if (!this.client.rooms.has(toId(rooms) as ID)) {
				this.client.send(`/join ${rooms}` as string);
			}
		}
	}
	/**
	 * Join in all section room
	 * @private
	 * @param {Set}
	 */
	joinSection(section: Set<string>) {
		section.forEach(room => {
			this.join(room);
		})
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