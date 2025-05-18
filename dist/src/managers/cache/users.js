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
  UserManager: () => UserManager
});
module.exports = __toCommonJS(users_exports);
var import_base = require("./base");
var import_structures = require("../../structures");
var import_lib = require("../../lib");
class UserManager extends import_base.BaseCache {
  constructor(client) {
    super();
    this.client = client;
  }
  /**
   * Remove a user from the cache
   * @param {String} user
   * @throws {Error} if the user does not exist
   */
  remove(user) {
    if (!this.has(user))
      throw Error("User doesn't exist");
    super.remove(user);
    return true;
  }
  /**
   * Create a user in the cache
   * @param {Object} data
   * @throws {Error} if the user already exist
   */
  create(data) {
    if (this.has(data.name))
      throw Error("User already exist");
    super.create((0, import_lib.toId)(data.name), new import_structures.User(data, this.client));
    return true;
  }
  check(user) {
    this.client.send(`/cmd userdetails ${user}`);
  }
  update(user, data) {
    let uid = (0, import_lib.toId)(user);
    if (!this.has(uid))
      return null;
    return this.get(uid).update(data);
  }
  /**
   * Get user's name
   * @param {String} user
   */
  resolveName(user) {
    if (!this.has(user))
      return false;
    return this.get(user).name;
  }
  /**
   * Get user's id
   * @param {String} user
   */
  resolve(user) {
    if (!this.has(user))
      return false;
    return this.get(user).id;
  }
}
//# sourceMappingURL=users.js.map
