"use strct";

class ActivityManager {
    constructor(client) {
        Object.defineProperty(this, 'client', {value: client});
		this._timer = null;
    }
	_clear() {
		if (!this._timer) return;
		clearTimeout(this._timer);
		this._timer = null;
	}    
}

module.exports = ActivityManager;