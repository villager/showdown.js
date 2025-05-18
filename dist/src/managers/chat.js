"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var chat_exports = {};
__export(chat_exports, {
  ChatManager: () => ChatManager
});
module.exports = __toCommonJS(chat_exports);
var import_roomlist = require("./roomlist");
var import_structures = require("../structures");
var import_lib = require("../lib");
const DEFAULT_ROOM = "lobby";
class ChatManager {
  constructor(client) {
    this.client = client;
    this.group = "";
    this.roomlist = new import_roomlist.RoomListManager(client);
  }
  receive(msg) {
    this.receiveMsg(msg);
  }
  receiveMsg(msg) {
    if (!msg)
      return;
    if (msg.includes("\n")) {
      const lines = msg.split("\n");
      let room = DEFAULT_ROOM;
      let firstLine = 0;
      if (lines[0].charAt(0) === ">") {
        room = lines[0].substring(1) || DEFAULT_ROOM;
        firstLine = 1;
      }
      for (let i = firstLine; i < lines.length; i++) {
        if (lines[i].split("|")[1] === "init") {
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
    const splittedLine = data.substring(1).split("|");
    let channel;
    this.client.emit("parseLine", roomid, data, isInit, splittedLine);
    switch (splittedLine[0]) {
      case "formats":
        const formats = data.substring(splittedLine[0].length + 2);
        this.client.formats.update(formats);
        this.client.emit("formats", formats);
        break;
      case "challstr":
        this.client._login.challengekeyid = splittedLine[1];
        this.client._login.challenge = splittedLine[2];
        this.client.login(this.client.name, this.client.pass);
        break;
      case "c:":
        if (isInit)
          break;
        if (!this.client.rooms.has(roomid))
          return;
        if (!this.client.users.has(splittedLine[2])) {
          this.client.users.create({
            name: splittedLine[2]
          });
        }
        this.client.users.check(splittedLine[2]);
        channel = new import_structures.MessageHandler(this.client, {
          room: roomid,
          type: "room",
          date: splittedLine[1],
          user: splittedLine[2],
          content: splittedLine.slice(3).join("|")
        });
        break;
      case "c":
        if (isInit)
          break;
        if (!this.client.rooms.has(roomid))
          return;
        if (!this.client.users.has(splittedLine[1])) {
          this.client.users.create({
            name: splittedLine[1]
          });
        }
        this.client.users.check(splittedLine[1]);
        channel = new import_structures.MessageHandler(this.client, {
          room: roomid,
          type: "room",
          date: Date.now(),
          user: splittedLine[1],
          content: splittedLine.slice(2).join("|")
        });
        break;
      case "updateuser":
        if ((0, import_lib.toId)(splittedLine[1]) !== (0, import_lib.toId)(this.client.name))
          return;
        this.client.send("/cmd rooms");
        break;
      case "pm":
        if (!this.client.users.has(splittedLine[1])) {
          this.client.users.create({
            name: splittedLine[1]
          });
        }
        this.client.users.check(splittedLine[1]);
        channel = new import_structures.MessageHandler(this.client, {
          type: "pm",
          user: splittedLine[1],
          content: splittedLine.slice(3).join("|")
        });
        break;
      case "join":
      case "j":
      case "J":
        if (isInit)
          break;
        break;
      case "l":
      case "L":
        if (isInit)
          break;
        break;
      case "init":
        this.client.rooms.create({
          name: roomid,
          type: splittedLine[1]
        });
        this.client.send("/cmd roominfo " + roomid);
        break;
      case "deinit":
        if (this.client.rooms.has(roomid)) {
          this.client.emit("leaveRoom", this.client.rooms.get(roomid));
          this.client.rooms.remove(roomid);
        }
        break;
      case "title":
        if (this.client.rooms.has(roomid)) {
          this.client.rooms.get(roomid).update({
            name: splittedLine[1]
          });
        }
        break;
      case "users":
        if (!this.client.rooms.has(roomid))
          break;
        const userArr = data.substr(9).split(",");
        this.client.rooms.get(roomid).update({
          users: userArr
        });
        break;
      case "raw":
      case "html":
        break;
      case "queryresponse":
        switch (splittedLine[1]) {
          case "userdetails":
            if (!this.client.socket.connection.status.named)
              break;
            const data2 = JSON.parse(splittedLine[2]);
            if (data2 === null)
              break;
            if (data2.id === (0, import_lib.toId)(this.client.name)) {
              const data3 = JSON.parse(splittedLine[2]);
              if (data3.group)
                this.group = data3.group;
            } else {
              this.client.users.update(data2.id, {
                name: data2.name,
                group: data2.group,
                avatar: data2.avatar,
                autoconfirmed: data2.autoconfirmed,
                status: data2.status
              });
            }
            break;
          case "roominfo":
            try {
              let data3 = JSON.parse(splittedLine[2]);
              if (!data3.id)
                break;
              if (this.client.rooms.has(data3.id)) {
                let room = this.client.rooms.get(data3.id);
                if (!room)
                  break;
                let toUpdate = /* @__PURE__ */ Object.create(null);
                let ignore = /* @__PURE__ */ new Set(["id", "type", "roomid"]);
                for (let i in data3) {
                  if (!ignore.has(i))
                    toUpdate[i] = data3[i];
                }
                room.update(toUpdate);
              }
            } catch (e) {
              break;
            }
            break;
          case "rooms":
            if (splittedLine[2] === "null")
              break;
            const roomData = JSON.parse(splittedLine.slice(2));
            for (const i in roomData["official"]) {
              if (!this.roomlist.isOfficial.has(roomData["official"][i].title)) {
                this.roomlist.isOfficial.add(roomData["official"][i].title);
              }
            }
            for (const i in roomData["chat"]) {
              if (!this.roomlist.isChat.has(roomData["chat"][i].title)) {
                this.roomlist.isChat.add(roomData["chat"][i].title);
              }
            }
            this.roomlist.check();
            break;
        }
        break;
      case "N":
        if (~data.indexOf("\n")) {
        }
        break;
      case "":
        break;
    }
    if (channel !== void 0)
      this.client.emit("message", channel);
  }
}
//# sourceMappingURL=chat.js.map
