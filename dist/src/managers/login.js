"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var login_exports = {};
__export(login_exports, {
  LoginManager: () => LoginManager
});
module.exports = __toCommonJS(login_exports);
var import_lib = require("../lib");
var urlModule = __toESM(require("url"));
var util = __toESM(require("util"));
class LoginManager {
  constructor(client) {
    this.client = client;
    this.challenge = "";
    this.challengekeyid = "";
  }
  get getUrl() {
    return util.format("https://%s/~~%s/action.php", "play.pokemonshowdown.com", (0, import_lib.toId)(this.client.id));
  }
  getLogin(nick, pass, callback) {
    let url = urlModule.parse(this.getUrl);
    let requestOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      agent: false,
      data: ""
    };
    if (!pass) {
      requestOptions.method = "GET";
      requestOptions.path += "?act=getassertion&userid=" + (0, import_lib.toId)(nick) + "&challengekeyid=" + this.challengekeyid + "&challenge=" + this.challenge;
    } else {
      requestOptions.data = "act=login&name=" + (0, import_lib.toId)(nick) + "&pass=" + pass + "&challengekeyid=" + this.challengekeyid + "&challenge=" + this.challenge;
      requestOptions.headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": requestOptions.data.length
      };
    }
    (0, import_lib.Net)(requestOptions.hostname).request(requestOptions).then((str) => {
      if (str === ";") {
        this.client.emit("renameFailure", {
          reason: "WRONG_PASSWORD"
        });
        return;
      }
      if (str.length < 50) {
        this.client.emit("renameFailure", {
          reason: "SERVER_ERROR"
        });
        return;
      }
      if (str.includes("heavy load")) {
        this.client.emit("renameFailure", {
          reason: "HEAVY_LOAD"
        });
        return;
      }
      str = JSON.parse(str.substr(1));
      if (str.actionsuccess) {
        str = str.assertion;
      } else {
        this.client.emit("renameFailure", {
          reason: "UNKNOW",
          details: JSON.stringify(str)
        });
        return;
      }
      if (callback)
        callback.call(this, str);
    }).catch((e) => {
      this.client.emit("renameFailure", {
        reason: "REQUEST",
        details: e
      });
    });
  }
  login(name, pass) {
    this.getLogin(name, pass, (token) => {
      if (token) {
        this.client.send("/trn " + name + ",0," + token);
        this.client.emit("logged", name);
      }
    });
  }
}
//# sourceMappingURL=login.js.map
