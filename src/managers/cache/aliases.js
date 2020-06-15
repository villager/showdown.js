"use strict";

const BaseCache = require('./base');

class AliasesManager extends BaseCache {
    /**
     * Load the cache with your aliases format
     * @param {AnyObject} obj 
     */
    load(obj) {
        if (typeof obj !== 'object') {
            // thow error
        } else {
            for (let i in obj) {
                this.create(i, obj[i]);
            }
        }
    }
}

module.exports = AliasesManager;