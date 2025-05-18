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
var base_exports = {};
__export(base_exports, {
  BaseCache: () => BaseCache
});
module.exports = __toCommonJS(base_exports);
var import_lib = require("../../lib");
class BaseCache extends Map {
  /**
   * Create a new element in the cache
   * @param {String} id
   * @param {any} arg
   */
  create(id, arg) {
    let ID = (0, import_lib.toId)(id);
    if (this.has(ID))
      return false;
    this.set(ID, arg);
    return true;
  }
  /**
   * Remove an element from the cache
   * @param {String} id
   */
  remove(id) {
    let ID = (0, import_lib.toId)(id);
    if (!this.has(ID))
      return false;
    this.remove(ID);
    return true;
  }
  /**
   * Check if a elment exists in the cache
   * @param {String} id
   * @returns {Boolean} Returns a Boolean
   */
  has(id) {
    let ID = (0, import_lib.toId)(id);
    if (!super.has(ID))
      return false;
    return true;
  }
  /**
   * Get an element from the cache
   * @param {String} id
   * @returns {(User|Room)} Return the data from the cache
   */
  get(id) {
    let ID = (0, import_lib.toId)(id);
    if (!this.has(ID))
      return false;
    return super.get(ID);
  }
}
//# sourceMappingURL=base.js.map
