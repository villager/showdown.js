"use strict";
class UtilMap extends Map {
    toJSON() {
		return Array.from(this);
	}
}
module.exports = {
    Map: UtilMap,
};