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
  BaseClient: () => BaseClient
});
module.exports = __toCommonJS(base_exports);
var import_events = require("events");
class BaseClient extends import_events.EventEmitter {
  constructor(options) {
    super();
    this.port = options.port;
    this.host = options.host;
    if (options.id)
      this._id = options.id;
    this.name = options.name ?? "";
    this.pass = options.pass ?? "";
    this.baseRooms = options.baseRooms ?? [];
  }
  get id() {
    if (this._id)
      return this._id;
    return this.host;
  }
  incrementListeners() {
    const max = this.getMaxListeners();
    if (max !== 0) {
      this.setMaxListeners(max + 1);
    }
  }
  decrementListeners() {
    const max = this.getMaxListeners();
    if (max !== 0) {
      this.setMaxListeners(max - 1);
    }
  }
}
//# sourceMappingURL=base.js.map
