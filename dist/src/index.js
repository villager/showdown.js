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
var src_exports = {};
__export(src_exports, {
  ChatManager: () => import_managers.ChatManager,
  Client: () => import_client.Client,
  ConnectionManager: () => import_managers.ConnectionManager,
  FormatsManager: () => import_managers.FormatsManager,
  LoginManager: () => import_managers.LoginManager,
  MessageHandler: () => import_structures.MessageHandler,
  Net: () => import_lib.Net,
  Room: () => import_structures.Room,
  RoomManager: () => import_managers.RoomManager,
  SendManager: () => import_managers.SendManager,
  User: () => import_structures.User,
  UserManager: () => import_managers.UserManager
});
module.exports = __toCommonJS(src_exports);
var import_client = require("./client");
var import_structures = require("./structures");
var import_managers = require("./managers");
var import_lib = require("./lib");
//# sourceMappingURL=index.js.map
