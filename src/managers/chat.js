"use strict";

const DEFAULT_ROOM = 'lobby';
const ParserManager = require('./parser');
const Utils = require('../utils');

class ChatManager {
    constructor(client) {
        Object.defineProperty(this, 'client', {value: client});
        this.parser = new ParserManager(client);
    }
    receive(msg) {
		this.client.emit('message', msg);
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
				if (!this.client.rooms.has(roomid)) return // Shouldn't happened - throw error
				this.parser.parse(this.client.rooms.get(roomid), splittedLine[2], splittedLine.slice(3).join('|'), false);
				break;
			case 'c':
				if (isInit) break;
				if (!this.client.rooms.has(roomid)) return // Shouldn't happened - throw error
				this.parser.parse(this.client.rooms.get(roomid), splittedLine[1], splittedLine.slice(2).join('|'), false);
				break;
			case 'updateuser':
				if (Utils.toId(splittedLine[1]) !== Utils.toId(this.client.name)) return;
				this.client.socket.send('/cmd rooms');
				if (!this.joinedRooms && splittedLine[2] === '1') {
					for (const room of this.client.baseRooms) {
						this.client.socket.send(`/join ${room}`);
					}
				}
				break;
			case 'pm':
				this.parser.parse(roomid, splittedLine[1], splittedLine.slice(3).join('|'), true);
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
				if (this.rooms[roomid]) {
					this.client.emit('leaveRoom', this.rooms[roomid]);
					delete this.rooms[roomid];
					this.roomCount = Object.keys(this.rooms).length;
				}
				break;
			case 'title':
				console.log(this.client.rooms.has(roomid))
				if (this.client.rooms.has(roomid)) {
					console.log(this.client.rooms.get(roomid));
					this.client.rooms.get(roomid).update({
						name: splittedLine[1]
					});
				}
				break;
			case 'users':
				if (!this.client.rooms.has(roomid)) break;
				const userArr = data.substr(9).split(',');
				this.client.rooms.get(roomid).update({
					users: userArr
				});
				break;
			case 'raw':
			case 'html':
				break;
			case 'queryresponse':
				switch (splittedLine[1]) {
					case 'userdetails':
						const data = JSON.parse(splittedLine[2]);
						if (data.id !== Utils.toId(this.name)) {
							const data = JSON.parse(splittedLine[2]);
							if (data.group) this.group = data.group;
						}
						break;
					case 'roominfo':
						console.log(splittedLine);
						break;
					case 'rooms':
						if (splittedLine[2] === 'null') break;
						// @ts-ignore
						const roomData = JSON.parse(splittedLine.slice(2));
	/*					if (!roomList[this.id]) {
							roomList[this.id] = {};
						}
						for (const i in roomData['official']) {
							if (!roomList[this.id].isOfficial) roomList[this.id].isOfficial = [];
							roomList[this.id].isOfficial.push(roomData['official'][i].title);
						}
						for (const i in roomData['chat']) {
							if (!roomList[this.id].isChat) roomList[this.id].isChat = [];
							roomList[this.id].isChat.push(roomData['chat'][i].title);
						}
						if (!this.joinedRooms) {
							if (this.baseRooms[0] === 'all') {
								this.joinAllRooms();
								this.joinedRooms = true;
							} else if (this.baseRooms === 'official') {
								this.joinAllRooms();
								this.joinedRooms = true;
							}
						}*/
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
	}
}

module.exports = ChatManager