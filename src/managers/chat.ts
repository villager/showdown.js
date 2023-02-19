
const DEFAULT_ROOM = 'lobby';

import { RoomListManager } from "./roomlist";
import {MessageHandler} from '../structures';
import { toId } from "../lib";

export class ChatManager {
    client: Client;
    roomlist: RoomListManager;
    group: string;
	constructor(client: Client) {
        this.client = client;
        this.group = '';
		this.roomlist = new RoomListManager(client);
	}
	receive(msg: string) {
		this.receiveMsg(msg);
	}
	receiveMsg(msg: string) {
		if (!msg) return;
		if (msg.includes('\n')) {
			const lines = msg.split('\n');
			let room: RoomID =  DEFAULT_ROOM;
			let firstLine = 0;
			if (lines[0].charAt(0) === '>') {
				room = lines[0].substring(1) as RoomID || DEFAULT_ROOM;
				firstLine = 1;
			}
			for (let i = firstLine; i < lines.length; i++) {
				if (lines[i].split('|')[1] === 'init') {
					for (let j = i; j < lines.length; j++) {
						this.parseLine(room, lines[j], true);
					}
					break;
				} else {
					this.parseLine(room, lines[i], false);
				}
			}
		} else {
			this.parseLine(DEFAULT_ROOM, msg, false);
		}
	}
	parseLine(roomid: RoomID|ID, data: string, isInit: boolean) {
		const splittedLine = data.substring(1).split('|');
		let channel;
		this.client.emit('parseLine', roomid, data, isInit, splittedLine);
		switch (splittedLine[0]) {
			case 'formats':
				const formats = data.substring(splittedLine[0].length + 2);
				this.client.formats.update(formats);
				this.client.emit('formats', formats);
				break;
			case 'challstr':
				this.client._login.challengekeyid = splittedLine[1];
				this.client._login.challenge = splittedLine[2];
				this.client.login(this.client.name, this.client.pass);
				break;
			case 'c:':
				if (isInit) break;
				if (!this.client.rooms.has(roomid as ID)) return; // Shouldn't happened - throw error
				if (!this.client.users.has(splittedLine[2] as ID)) {
					this.client.users.create({
						name: splittedLine[2],
					});
				}
				this.client.users.check(splittedLine[2] as ID);
				channel = new MessageHandler(this.client, {
					room: roomid,
					type: 'room',
					date: splittedLine[1],
					user: splittedLine[2],
					content: splittedLine.slice(3).join('|'),
				});
				break;
			case 'c':
				if (isInit) break;
				if (!this.client.rooms.has(roomid as ID)) return; // Shouldn't happened - throw error
				if (!this.client.users.has(splittedLine[1] as ID)) {
					this.client.users.create({
						name: splittedLine[1],
					});
				}
				this.client.users.check(splittedLine[1] as ID);
				channel = new MessageHandler(this.client, {
					room: roomid,
					type: 'room',
					date: Date.now(),
					user: splittedLine[1],
					content: splittedLine.slice(2).join('|'),
				});
				break;
			case 'updateuser':
				if (toId(splittedLine[1]) !== toId(this.client.name)) return;
				this.client.send('/cmd rooms');
				break;
			case 'pm':
				if (!this.client.users.has(splittedLine[1] as ID)) {
					this.client.users.create({
						name: splittedLine[1],
					});
				}
				this.client.users.check(splittedLine[1] as ID);
				channel = new MessageHandler(this.client, {
					type: 'pm',
					user: splittedLine[1],
					content: splittedLine.slice(3).join('|'),
				});
				break;
			case 'join':
			case 'j':
			case 'J':
				if (isInit) break; // no nos interesa del pasado
				break;
			case 'l':
			case 'L':
				if (isInit) break; // no nos interesa del pasado
				break;
			case 'init':
				this.client.rooms.create({
					name: roomid,
					type: splittedLine[1],
				});
				this.client.send('/cmd roominfo ' + roomid);
				break;
			case 'deinit':
				if (this.client.rooms.has(roomid as ID)) {
					this.client.emit('leaveRoom', this.client.rooms.get(roomid as ID));
					this.client.rooms.remove(roomid as ID);
				}
				break;
			case 'title':
				if (this.client.rooms.has(roomid as ID)) {
					this.client.rooms.get(roomid as ID).update({
						name: splittedLine[1],
					});
				}
				break;
			case 'users':
				if (!this.client.rooms.has(roomid as ID)) break;
				const userArr = data.substr(9).split(',');
				this.client.rooms.get(roomid as ID).update({
					users: userArr,
				});
				break;
			case 'raw':
			case 'html':
				break;
			case 'queryresponse':
				switch (splittedLine[1]) {
					case 'userdetails':
						if (!this.client.socket.connection.status.named) break;
						const data = JSON.parse(splittedLine[2]);
						if (data === null) break;
						if (data.id === toId(this.client.name)) {
							const data = JSON.parse(splittedLine[2]);
							if (data.group) this.group = data.group;
						} else {
							this.client.users.update(data.id, {
								name: data.name,
								group: data.group,
								avatar: data.avatar,
								autoconfirmed: data.autoconfirmed,
								status: data.status,
							});
						}
						break;
					case 'roominfo':
						try {
							let data = JSON.parse(splittedLine[2]);
							if (!data.id) break;
							if (this.client.rooms.has(data.id)) {
								let room = this.client.rooms.get(data.id);
								if (!room) break; // Should never happen really.
								let toUpdate = Object.create(null);
								let ignore = new Set(['id', 'type', 'roomid']);
								for (let i in data) {
									if (!ignore.has(i)) toUpdate[i] = data[i];
								}
								room.update(toUpdate);
							}
						} catch (e) {
							break;
						}
						break;
					case 'rooms':
						if (splittedLine[2] === 'null') break;
						// @ts-ignore
						const roomData = JSON.parse(splittedLine.slice(2));

						for (const i in roomData['official']) {
							if (!this.roomlist.isOfficial.has(roomData['official'][i].title)) {
								this.roomlist.isOfficial.add(roomData['official'][i].title);
							}
						}
						for (const i in roomData['chat']) {
							if (!this.roomlist.isChat.has(roomData['chat'][i].title)) {
								this.roomlist.isChat.add(roomData['chat'][i].title);
							}
						}
						this.roomlist.check();
						break;
				}
				break;
			case 'N':
				if (~data.indexOf('\n')) {
					//	this.logChat(toId(roomid), data.trim());
				}
				break;
			case '':
				//this.logChat(toId(roomid), parts.slice(2).join("|"));
				break;
		}
		if (channel !== undefined) this.client.emit('message', channel);
	}
}