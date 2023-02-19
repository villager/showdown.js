
import { BaseCache } from "./base";
import {AliasesManager} from './aliases';
import { toId } from "../../lib";
export class FormatsManager extends BaseCache {
	/**
	 * Manager of formats
	 * @constructor
	 */
    aliases: AliasesManager;
	constructor() {
		super();
		/** @type {Map<string, AnyObject>|null} */
		this.aliases = new AliasesManager();
	}
	loadAliases(aliases: AnyObject) {
		return this.aliases.load(aliases);
	}
	parseAliases(format: string) {
		if (!format) return '';
		let f = toId(format) as ID;
		if (this.has(f)) return format;
		if (this.aliases.has(f)) format = toId(this.aliases.get(f));
		return format;
	}
	update(formats: string) {
		const formatsArr = formats.split('|');
		let commaIndex, formatData, code, name;
		for (let i = 0; i < formatsArr.length; i++) {
			commaIndex = formatsArr[i].indexOf(',');
			if (commaIndex === -1) {
				this.create(toId(formatsArr[i]) as ID, {
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
				formatData = {
					name: name,
					team: true,
					ladder: true,
					chall: true,
					disableTournaments: false,
				};
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
				this.create(toId(name) as ID, formatData);
			}
		}
	}
}
