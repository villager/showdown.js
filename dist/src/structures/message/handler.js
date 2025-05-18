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
var handler_exports = {};
__export(handler_exports, {
  MessageHandler: () => MessageHandler
});
module.exports = __toCommonJS(handler_exports);
var import_room = require("./room");
var import_pm = require("./pm");
var import_lib = require("../../lib");
class MessageHandler {
  constructor(client, options = {}) {
    this.client = client;
    this.type = options.type;
    this.content = options.content;
    if (this.type === "PM") {
      this.source = new import_pm.PMChannel(client, options);
    } else {
      this.source = new import_room.RoomChannel(client, options);
    }
    if (this.client.users.has((0, import_lib.toId)(options.user))) {
      this.user = this.client.users.get((0, import_lib.toId)(options.user));
    } else {
      this.user = options.user;
    }
  }
  reply(data) {
    return this.source.send(data);
  }
}
//# sourceMappingURL=handler.js.map
