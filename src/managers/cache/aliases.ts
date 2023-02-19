
import { BaseCache } from "./base";

export class AliasesManager extends BaseCache {
	/**
	 * Load the cache with your aliases format
	 * @param {AnyObject} obj
	 */
	load(obj: AnyObject) {
		if (typeof obj !== 'object') {
			// thow error
		} else {
			for (let i in obj) {
				this.create(i as ID, obj[i]);
			}
		}
	}
}
