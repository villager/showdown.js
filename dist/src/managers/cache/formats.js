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
var formats_exports = {};
__export(formats_exports, {
  FormatsManager: () => FormatsManager
});
module.exports = __toCommonJS(formats_exports);
var import_base = require("./base");
var import_aliases = require("./aliases");
var import_lib = require("../../lib");
class FormatsManager extends import_base.BaseCache {
  constructor() {
    super();
    this.aliases = new import_aliases.AliasesManager();
  }
  loadAliases(aliases) {
    return this.aliases.load(aliases);
  }
  parseAliases(format) {
    if (!format)
      return "";
    let f = (0, import_lib.toId)(format);
    if (this.has(f))
      return format;
    if (this.aliases.has(f))
      format = (0, import_lib.toId)(this.aliases.get(f));
    return format;
  }
  update(formats) {
    const formatsArr = formats.split("|");
    let commaIndex, formatData, code, name;
    for (let i = 0; i < formatsArr.length; i++) {
      commaIndex = formatsArr[i].indexOf(",");
      if (commaIndex === -1) {
        this.create((0, import_lib.toId)(formatsArr[i]), {
          name: formatsArr[i],
          team: true,
          ladder: true,
          chall: true
        });
      } else if (commaIndex === 0) {
        i++;
        continue;
      } else {
        name = formatsArr[i];
        formatData = {
          name,
          team: true,
          ladder: true,
          chall: true,
          disableTournaments: false
        };
        code = commaIndex >= 0 ? parseInt(name.substr(commaIndex + 1), 16) : NaN;
        if (!isNaN(code)) {
          name = name.substr(0, commaIndex);
          if (code & 1)
            formatData.team = false;
          if (!(code & 2))
            formatData.ladder = false;
          if (!(code & 4))
            formatData.chall = false;
          if (!(code & 8))
            formatData.disableTournaments = true;
        } else {
          if (name.substr(name.length - 2) === ",#") {
            formatData.team = false;
            name = name.substr(0, name.length - 2);
          }
          if (name.substr(name.length - 2) === ",,") {
            formatData.chall = false;
            name = name.substr(0, name.length - 2);
          } else if (name.substr(name.length - 1) === ",") {
            formatData.ladder = false;
            name = name.substr(0, name.length - 1);
          }
        }
        formatData.name = name;
        this.create((0, import_lib.toId)(name), formatData);
      }
    }
  }
}
//# sourceMappingURL=formats.js.map
