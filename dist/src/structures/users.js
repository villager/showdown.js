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
var users_exports = {};
__export(users_exports, {
  User: () => User
});
module.exports = __toCommonJS(users_exports);
var import_base = require("./base");
class User extends import_base.BaseUser {
  constructor(data, client) {
    super(client);
    this.connected = false;
    this.rooms = /* @__PURE__ */ new Set();
    this.lastMessage = null;
    this.lastSeen = null;
    this.name = data.name ?? "";
    this.group = data.group ?? "";
    this.avatar = 1;
    this.status = "";
    this.connected = true;
    this.lastMessage = "";
    this.idle = false;
    this.blockChallenges = false;
    this.blockPMs = false;
    this.update(data);
  }
  /**
   * Update user's info
   * @param {AnyObject} data
   */
  update(data = {}) {
    this.lastSeen = Date.now();
    if (data.avatar) {
      this.avatar = data.avatar;
    }
    if (data.status) {
      this.status = data.status;
    }
    if (data.group) {
      this.group = data.group;
    }
  }
  send(data) {
    return this.client.send(`/msg ${this.id}, ${data}`);
  }
}
//# sourceMappingURL=users.js.map
