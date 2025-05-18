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
var client_exports = {};
__export(client_exports, {
  Client: () => Client
});
module.exports = __toCommonJS(client_exports);
var import_base = require("./base");
var import_socket = require("./socket");
var import_managers = require("../managers");
class Client extends import_base.BaseClient {
  constructor(options) {
    super(options);
    this.socket = new import_socket.SocketManager(this);
    this.users = new import_managers.UserManager(this);
    this.rooms = new import_managers.RoomManager(this);
    this.formats = new import_managers.FormatsManager();
    this._login = new import_managers.LoginManager(this);
    this.on("disconnect", (err) => {
      console.log("Bot Disconnected from " + this.host + (err ? " | " + err.code + ": " + err.message : ""));
      if (this.socket.connection.closed || this.socket.connection.connecting || this.socket.connection.status.connected)
        return;
      this.socket.reconnect();
    });
    this.reconnect = options.reconnect ?? null;
  }
  send(data, room) {
    this.socket.send(data, room);
  }
  connect() {
    return this.socket.on();
  }
  /**
   * Log into the server
   * @param {string} name
   * @param {string?} pass
   */
  login(name, pass) {
    this._login.login(name, pass);
  }
  /**
   * Event of parseLine, use callback as a function () => {}
   * @param {Function} callback
   */
  parseLine(callback) {
    this.on("parseLine", callback);
  }
  /**
   * Validations of data
   */
  $validation() {
  }
}
//# sourceMappingURL=index.js.map
