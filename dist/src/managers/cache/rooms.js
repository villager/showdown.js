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
  RoomManager: () => RoomManager
});
module.exports = __toCommonJS(rooms_exports);
var import_base = require("./base");
var import_structures = require("../../structures");
var import_lib = require("../../lib");
class RoomManager extends import_base.BaseCache {
  constructor(client) {
    super();
    this.client = client;
  }
  /**
   * Create a new room in the cache
   * @param {Object} data
   * @throws {Error} If the room already exist
   */
  create(data) {
    if (this.has(data.name))
      return false;
    super.create((0, import_lib.toId)(data.name), new import_structures.Room(data, this.client));
    return true;
  }
  /**
   * Remove a room in the cache
   * @param {String} id
   * @throws {Error} Throw if the room does not exist
   */
  remove(id) {
    if (!this.has(id))
      return false;
    super.remove(id);
    return true;
  }
  /**
   * Get room's name
   * @param {String} id
   */
  resolveName(id) {
    if (!this.has(id))
      return false;
    return this.get(id).name;
  }
  /**
   * Get room's id
   * @param {String} user
   */
  resolve(user) {
    if (!this.has(user))
      return false;
    return this.get(user).id;
  }
}
//# sourceMappingURL=rooms.js.map
