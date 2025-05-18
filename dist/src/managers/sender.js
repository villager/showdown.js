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
var sender_exports = {};
__export(sender_exports, {
  SendManager: () => SendManager
});
module.exports = __toCommonJS(sender_exports);
class SendManager {
  constructor(data, msgMaxLines, sendFunc, destroyHandler) {
    this.data = data;
    this.msgMaxLines = msgMaxLines;
    this.sendFunc = sendFunc;
    this.status = "sending";
    this.callback = null;
    this.destroyHandler = destroyHandler;
    this.err = null;
    this.interval = null;
  }
  start() {
    let data = this.data;
    if (!(data instanceof Array)) {
      data = [data.toString()];
    } else {
      data = data.slice();
    }
    const nextToSend = () => {
      if (!data.length) {
        clearInterval(this.interval);
        this.interval = null;
        this.finalize();
        return;
      }
      const toSend = [];
      const firstMsg = data.shift();
      toSend.push(firstMsg);
      let roomToSend = "";
      if (firstMsg.indexOf("|") >= 0) {
        roomToSend = firstMsg.split("|")[0];
      }
      while (data.length > 0 && toSend.length < this.msgMaxLines) {
        const subMsg = data[0];
        if (subMsg.split("|")[0] !== roomToSend) {
          break;
        } else {
          toSend.push(subMsg.split("|").slice(1).join("|"));
          data.shift();
        }
      }
      this.sendFunc(toSend.join("\n"));
    };
    this.interval = setInterval(nextToSend.bind(this), 2e3);
    nextToSend.call(this);
  }
  finalize() {
    this.status = "finalized";
    if (typeof this.callback === "function")
      this.callback(this.err);
    if (typeof this.destroyHandler === "function")
      this.destroyHandler(this);
  }
  /**
   * @param {function} callback
   */
  then(callback) {
    if (this.status !== "sending") {
      return callback(this.err);
    } else {
      this.callback = callback;
    }
  }
  kill() {
    if (this.interval)
      clearInterval(this.interval);
    this.interval = null;
    this.err = new Error("Send Manager was killed");
    this.finalize();
  }
}
//# sourceMappingURL=sender.js.map
