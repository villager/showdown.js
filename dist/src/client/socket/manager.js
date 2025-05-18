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
var manager_exports = {};
__export(manager_exports, {
  SocketManager: () => SocketManager
});
module.exports = __toCommonJS(manager_exports);
var import_managers = require("../../managers");
const SockJS = require("sockjs-client");
class SocketManager {
  constructor(client) {
    this.client = client;
    this.connection = new import_managers.ConnectionManager(client);
    this.chat = new import_managers.ChatManager(client);
    this.socket = null;
    this.sending = {};
    this.nextSend = 0;
    this.maxLinesSend = 3;
  }
  getSendId() {
    return this.nextSend++;
  }
  setNamed() {
    this.connection.status.named = true;
  }
  destroy(e) {
    if (this.socket) {
      this.socket.close();
    }
    this.connection.connecting = false;
    this.socket = null;
    this.reset();
    if (e) {
      this.client.emit("disconnect", { code: e.code, message: e.reason });
    } else {
      this.client.emit("disconnect");
    }
  }
  on() {
    if (this.connection.status.connected || this.socket)
      return;
    this.connection.closed = false;
    this.socket = new SockJS(`http://${this.client.host}:${this.client.port}/showdown/`);
    this.socket.onerror = () => {
      this.destroy();
    };
    this.socket.onopen = () => {
      this.connection.connecting = false;
      this.connection.conntime = Date.now();
      this.connection.attemps = 0;
      this.client.emit("connect", this.socket);
    };
    this.socket.onclose = (e) => {
      this.destroy(e);
    };
    this.socket.onmessage = (e) => {
      let data = e.data;
      if (typeof data !== "string") {
        data = JSON.stringify(data);
      }
      this.chat.receive(data);
      this.connection.activity.date = Date.now();
    };
    this.connection.connecting = true;
    this.client.emit("connecting");
  }
  reconnect() {
    return this.connection.reconnect();
  }
  send(data, room) {
    if (!room)
      room = "";
    if (!(data instanceof Array)) {
      data = [data.toString()];
    }
    for (let i = 0; i < data.length; i++) {
      data[i] = room + "|" + data[i];
    }
    return this.sendBase(data);
  }
  /**
   * Primitive send
   * @private
   * @param {string} data
   */
  sendBase(data) {
    if (!this.socket)
      return null;
    const id = this.getSendId();
    const manager = new import_managers.SendManager(
      data,
      3,
      (msg) => {
        this.socket.send(msg);
        this.client.emit("send", msg);
      },
      () => {
        delete this.sending[id];
      }
    );
    this.sending[id] = manager;
    manager.start();
    return manager;
  }
  reset() {
    for (const k in this.sending) {
      this.sending[k].kill();
      delete this.sending[k];
    }
    this.nextSend = 0;
    this.client.rooms.clear();
    this.client.users.clear();
    this.connection.conntime = 0;
  }
}
//# sourceMappingURL=manager.js.map
