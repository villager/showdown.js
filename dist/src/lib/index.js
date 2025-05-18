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
var lib_exports = {};
__export(lib_exports, {
  Net: () => import_net.Net,
  toId: () => toId
});
module.exports = __toCommonJS(lib_exports);
var import_net = require("./net");
function toId(text) {
  if (text && text.id) {
    text = text.id;
  }
  if (typeof text !== "string" && typeof text !== "number")
    return "";
  return ("" + text).toLowerCase().replace(/[^a-z0-9]+/g, "");
}
//# sourceMappingURL=index.js.map
