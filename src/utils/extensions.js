"use strict";

class UtilMap extends Map {
    toJSON() {
		return Array.from(this);
	}
}
class UtilSet extends Set {
    toJSON() {
        return Array.from(this);
    }
}

exports.Map = UtilMap;
exports.Set = UtilSet;