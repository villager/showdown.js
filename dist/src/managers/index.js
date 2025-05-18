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
var managers_exports = {};
__export(managers_exports, {
  ChatManager: () => import_chat.ChatManager,
  ConnectionManager: () => import_connection.ConnectionManager,
  FormatsManager: () => import_cache.FormatsManager,
  LoginManager: () => import_login.LoginManager,
  RoomManager: () => import_cache.RoomManager,
  SendManager: () => import_sender.SendManager,
  UserManager: () => import_cache.UserManager
});
module.exports = __toCommonJS(managers_exports);
var import_cache = require("./cache");
var import_connection = require("./connection");
var import_chat = require("./chat");
var import_login = require("./login");
var import_sender = require("./sender");
//# sourceMappingURL=index.js.map
