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
var activity_exports = {};
__export(activity_exports, {
  ActivityManager: () => ActivityManager
});
module.exports = __toCommonJS(activity_exports);
class ActivityManager {
  constructor(client) {
    this.client = client;
    this.date = 0;
    this._timer = null;
  }
  _clear() {
    if (!this._timer)
      return;
    clearTimeout(this._timer);
    this._timer = null;
  }
}
//# sourceMappingURL=activity.js.map
