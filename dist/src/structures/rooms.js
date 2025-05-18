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
var rooms_exports = {};
__export(rooms_exports, {
  Room: () => Room
});
module.exports = __toCommonJS(rooms_exports);
var import_base = require("./base");
class Room extends import_base.BaseUser {
  constructor(data, client) {
    super(client);
    this.name = "";
    this.users = /* @__PURE__ */ new Set();
    this.subRooms = /* @__PURE__ */ new Set();
    this.type = " ";
    this.modjoin = null;
    this.modchat = null;
    this.visibility = data.visibility ?? "hidden";
    this.auth = /* @__PURE__ */ new Map();
    this.update(data);
  }
  get userCount() {
    if (!this.users)
      return 0;
    return this.users.size;
  }
  update(data) {
    if (data.language)
      this.language = data.language;
    if (data.name)
      this.name = data.name;
    if (data.modchat)
      this.modchat = data.modchat;
    if (data.modjoin)
      this.modjoin = data.modjoin;
    if (data.visibility)
      this.visibility = data.visibility;
    if (data.users)
      this.updateUsers(data.users);
    if (data.auth)
      this.updateAuth(data.auth);
  }
  /**
   *
   * @param {Set} arr
   * @returns {void}
   */
  updateUsers(data) {
    for (const user of data) {
      if (!user)
        continue;
      if (!this.users.has(user))
        this.users.add(user.slice(1));
    }
  }
  send(data) {
    super.send(data, this.id);
  }
  /**
   *
   * @param {Map<string, Set>} auth
   */
  updateAuth(data) {
    for (let i in data) {
      if (!this.auth.has(i)) {
        this.auth.set(i, /* @__PURE__ */ new Set());
      }
      for (const user of data[i]) {
        if (!this.auth.get(i)?.has(user)) {
          this.auth.get(i)?.add(user);
        }
      }
    }
  }
}
//# sourceMappingURL=rooms.js.map
