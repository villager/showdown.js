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
var connection_exports = {};
__export(connection_exports, {
  ConnectionManager: () => ConnectionManager
});
module.exports = __toCommonJS(connection_exports);
var import_activity = require("./activity");
const DEFAULT_TRY_RECONNECT = 30 * 1e3;
class ConnectionManager {
  constructor(client) {
    this.client = client;
    this.connecting = false;
    this.status = { connected: false };
    this.closed = false;
    this.maxAttemps = client.reconnect ? client.reconnect.attemps : 3;
    this.attemps = 0;
    this.activity = new import_activity.ActivityManager(this.client);
    this.conntime = 0;
    this._timer = null;
    this.time = client.reconnect ? client.reconnect.time : DEFAULT_TRY_RECONNECT;
  }
  _clear() {
    if (!this._timer)
      return;
    clearTimeout(this._timer);
    this._timer = null;
  }
  reconnect() {
    this._clear();
    this._timer = setTimeout(() => {
      if (this.closed)
        return;
      this.client.socket.on();
      this.attemps++;
      if (this.attemps > this.maxAttemps) {
        this.activity._clear();
        this.closed = true;
        console.log(`Connection closed to ${this.client.id}`);
      }
    }, this.time);
  }
}
//# sourceMappingURL=connection.js.map
