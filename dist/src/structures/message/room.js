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
var room_exports = {};
__export(room_exports, {
  RoomChannel: () => RoomChannel
});
module.exports = __toCommonJS(room_exports);
var import_lib = require("../../lib");
var import_base = require("./base");
class RoomChannel extends import_base.Channel {
  constructor(client, options) {
    super(client, options);
    this.date = options.date;
    if (this.client.rooms.has((0, import_lib.toId)(options.room))) {
      this.room = this.client.rooms.get((0, import_lib.toId)(options.room));
    } else {
      this.room = options.room;
    }
  }
  send(data) {
    super.send(data, (0, import_lib.toId)(this.room));
  }
}
//# sourceMappingURL=room.js.map
