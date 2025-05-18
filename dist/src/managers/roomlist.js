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
var roomlist_exports = {};
__export(roomlist_exports, {
  RoomListManager: () => RoomListManager
});
module.exports = __toCommonJS(roomlist_exports);
var import_lib = require("../lib");
class RoomListManager {
  constructor(client) {
    this.client = client;
    this.isOfficial = /* @__PURE__ */ new Set();
    this.isChat = /* @__PURE__ */ new Set();
  }
  join(rooms) {
    if (Array.isArray(rooms)) {
      let roomData = [];
      for (const room of rooms) {
        if (!this.client.rooms.has((0, import_lib.toId)(room))) {
          roomData.push(`/join ${(0, import_lib.toId)(room)}`);
        }
      }
      this.client.send(roomData);
    } else {
      if (!this.client.rooms.has((0, import_lib.toId)(rooms))) {
        this.client.send(`/join ${rooms}`);
      }
    }
  }
  /**
   * Join in all section room
   * @private
   * @param {Set}
   */
  joinSection(section) {
    section.forEach((room) => {
      this.join(room);
    });
  }
  check() {
    for (const room of this.client.baseRooms) {
      if (room === "all") {
        this.joinSection(this.isOfficial);
        this.joinSection(this.isChat);
      } else if (room === "official") {
        this.joinSection(this.isOfficial);
      } else if (room === "chat" || room === "public") {
        this.joinSection(this.isChat);
      } else {
        this.join(room);
      }
    }
  }
}
//# sourceMappingURL=roomlist.js.map
