"use strict";

const Utils = require('../../utils');
const BaseCache = require('./base');
const AliasesManager = require('./aliases');

class FormatsManager extends BaseCache {
    /**
     * Manager of formats
     * @constructor
     */
    constructor() {
		super();
		/** @type {Map<string, AnyObject>|null} */
		this.aliases = new AliasesManager();
    }
    loadAliases(aliases) {
		return this.aliases.load(aliases);
	}
	parseAliases(format) {
		if (!format) return '';
		format = Utils.toId(format);
		if (this.has(format)) return format;
		if (this.aliases.has(format)) format = Utils.toId(aliases.get(format));
		return format;
	}
	update(formats) {
		const formatsArr = formats.split('|');
		let commaIndex, formatData, code, name;
		for (let i = 0; i < formatsArr.length; i++) {
			commaIndex = formatsArr[i].indexOf(',');
			if (commaIndex === -1) {
				this.create(Utils.toId(formatsArr[i]), {
					name: formatsArr[i],
					team: true,
					ladder: true,
					chall: true,
				});
			} else if (commaIndex === 0) {
				i++;
				continue;
			} else {
				name = formatsArr[i];
				formatData = {name: name, team: true, ladder: true, chall: true, disableTournaments: false};
				code = commaIndex >= 0 ? parseInt(name.substr(commaIndex + 1), 16) : NaN;
				if (!isNaN(code)) {
					name = name.substr(0, commaIndex);
					if (code & 1) formatData.team = false;
					if (!(code & 2)) formatData.ladder = false;
					if (!(code & 4)) formatData.chall = false;
					if (!(code & 8)) formatData.disableTournaments = true;
				} else {
					if (name.substr(name.length - 2) === ',#') {
						// preset teams
						formatData.team = false;
						name = name.substr(0, name.length - 2);
					}
					if (name.substr(name.length - 2) === ',,') {
						// search-only
						formatData.chall = false;
						name = name.substr(0, name.length - 2);
					} else if (name.substr(name.length - 1) === ',') {
						// challenge-only
						formatData.ladder = false;
						name = name.substr(0, name.length - 1);
					}
				}
				formatData.name = name;
				this.create(Utils.toId(name), formatData);
			}
		}
	}
}

module.exports = FormatsManager;