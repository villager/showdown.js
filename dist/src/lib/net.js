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
var net_exports = {};
__export(net_exports, {
  Net: () => Net,
  Network: () => Network,
  description: () => description
});
module.exports = __toCommonJS(net_exports);
var https = __toESM(require("https"));
var http = __toESM(require("http"));
var url = __toESM(require("url"));
const description = "Easy way to do request from some http/s page";
class Network {
  constructor(uri) {
    this.url = uri;
    this.protocol = url.parse(this.url).protocol;
  }
  get() {
    const net = this.protocol === "https:" ? https : http;
    return new Promise((resolve, reject) => {
      net.get(this.url, (res) => {
        res.setEncoding("utf8");
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(data);
        });
        res.on("error", (err) => {
          reject(err);
        });
      }).on("error", (err) => {
        reject(err);
      }).setTimeout(3500);
    });
  }
  async toJSON() {
    try {
      const data = await this.get();
      return JSON.parse(data);
    } catch (e) {
      return e;
    }
  }
  request(opts) {
    const net = this.protocol === "https:" ? https : http;
    const actionUrl = url.parse(this.url);
    const hostname = actionUrl.hostname;
    const options = {
      hostname,
      method: "POST"
    };
    for (let i in opts) {
      options[i] = opts[i];
    }
    if (options.data)
      delete options.data;
    if (!options.hostname)
      options.hostname = hostname;
    return new Promise((resolve, reject) => {
      let str = "";
      const req = net.request(options, (res) => {
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          str += chunk;
        });
        res.on("end", () => {
          resolve(str);
        });
      });
      req.on("error", (e) => {
        reject(e);
      });
      if (opts.data)
        req.write(opts.data);
      req.end();
    });
  }
}
function Net(uri) {
  return new Network(uri);
}
//# sourceMappingURL=net.js.map
