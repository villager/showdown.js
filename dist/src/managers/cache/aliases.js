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
var aliases_exports = {};
__export(aliases_exports, {
  AliasesManager: () => AliasesManager
});
module.exports = __toCommonJS(aliases_exports);
var import_base = require("./base");
class AliasesManager extends import_base.BaseCache {
  /**
   * Load the cache with your aliases format
   * @param {AnyObject} obj
   */
  load(obj) {
    if (typeof obj !== "object") {
    } else {
      for (let i in obj) {
        this.create(i, obj[i]);
      }
    }
  }
}
//# sourceMappingURL=aliases.js.map
