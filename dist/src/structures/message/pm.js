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
var pm_exports = {};
__export(pm_exports, {
  PMChannel: () => PMChannel
});
module.exports = __toCommonJS(pm_exports);
var import_base = require("./base");
var import_lib = require("../../lib");
class PMChannel extends import_base.Channel {
  constructor(client, options = {}) {
    super(client, options);
    if (this.client.users.has((0, import_lib.toId)(options.user))) {
      this.user = this.client.users.get((0, import_lib.toId)(options.user));
    } else {
      this.user = options.user;
    }
  }
  send(data) {
    super.send(`/msg ${(0, import_lib.toId)(this.user)}, ${data}`);
  }
}
//# sourceMappingURL=pm.js.map
