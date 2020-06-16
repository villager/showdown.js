'use strict';

const DEFAULT_ROOM = 'lobby';
const RoomListManager = require('./roomlist');
const ChannelHandler = require('../structures/message/handler');
const Utils = require('../utils');

class ChatManager {
	constructor(client) {
		Object.defineProperty(this, 'client', {value: client});
		this.roomlist = new RoomListManager(client);
	}
	receive(msg) {
		this.receiveMsg(msg);
	}
	receiveMsg(msg) {
		if (!msg) return;
		if (msg.includes('\n')) {
			const lines = msg.split('\n');
			let room = DEFAULT_ROOM;
			let firstLine = 0;
			if (lines[0].charAt(0) === '>') {
				room = lines[0].substr(1) || DEFAULT_ROOM;
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
	parseLine(roomid, data, isInit) {
		const splittedLine = data.substr(1).split('|');
		let channel;
		this.client.emit('parseLine', roomid, data, isInit, splittedLine);
		switch (splittedLine[0]) {
			case 'formats':
				const formats = data.substr(splittedLine[0].length + 2);
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
				if (!this.client.rooms.has(roomid)) return; // Shouldn't happened - throw error
				if (!this.client.users.has(splittedLine[2])) {
					this.client.users.create({
						name: splittedLine[2],
					});
				}
				this.client.users.check(splittedLine[2]);
				channel = new ChannelHandler(this.client, {
					room: roomid,
					type: 'room',
					date: splittedLine[1],
					user: splittedLine[2],
					content: splittedLine.slice(3).join('|'),
				});
				break;
			case 'c':
				if (isInit) break;
				if (!this.client.rooms.has(roomid)) return; // Shouldn't happened - throw error
				if (!this.client.users.has(splittedLine[1])) {
					this.client.users.create({
						name: splittedLine[1],
					});
				}
				this.client.users.check(splittedLine[1]);
				channel = new ChannelHandler(this.client, {
					room: roomid,
					type: 'room',
					date: Date.now(),
					user: splittedLine[1],
					content: splittedLine.slice(2).join('|'),
				});
				break;
			case 'updateuser':
				if (Utils.toId(splittedLine[1]) !== Utils.toId(this.client.name)) return;
				this.client.socket.send('/cmd rooms');
				break;
			case 'pm':
				if (!this.client.users.has(splittedLine[1])) {
					this.client.users.create({
						name: splittedLine[1],
					});
				}
				this.client.users.check(splittedLine[1]);
				channel = new ChannelHandler(this.client, {
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
				this.client.socket.send('/cmd roominfo ' + roomid);
				break;
			case 'deinit':
				if (this.client.rooms.has(roomid)) {
					this.client.emit('leaveRoom', this.client.rooms.get(roomid));
					this.client.rooms.remove(roomid);
				}
				break;
			case 'title':
				if (this.client.rooms.has(roomid)) {
					this.client.rooms.get(roomid).update({
						name: splittedLine[1],
					});
				}
				break;
			case 'users':
				if (!this.client.rooms.has(roomid)) break;
				const userArr = data.substr(9).split(',');
				this.client.rooms.get(roomid).update({
					users: userArr,
				});
				break;
			case 'raw':
			case 'html':
				break;
			case 'queryresponse':
				switch (splittedLine[1]) {
					case 'userdetails':
						const data = JSON.parse(splittedLine[2]);
						if (data.id === Utils.toId(this.client.name)) {
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

module.exports = ChatManager;
