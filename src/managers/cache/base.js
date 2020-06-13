"use strict";

const Util = require('../../utils');

class BaseCache {
    constructor() {
        this.cache = Util.Map();
    }
    /**
     * @param {String} id 
     * @param {any} arg 
     */
    create(id, arg) {
        if (this.has(id)) return false;
        this.cache.set(id, arg);
    }
    /**
     * @param {String} id 
     */
    remove(id) {
        if (!this.has(id)) return false;
        this.cache.remove(id);
    }
    /**
     * @param {String} id 
     */
    has(id) {
        if (this.cache.has(id)) return false;
        return true;
    }
    /**
     * @param {String} id 
     */
    get(id) {
        if (!this.has(id)) return false;
        return this.cache.get(id);
    }
    /**
     * 
     * @param {Function} callback 
     * @param {any} thisArg 
     */
    forEach(callback, thisArg) {
        return this.cache.forEach(callback, thisArg);
    }
}
module.exports = BaseCache;