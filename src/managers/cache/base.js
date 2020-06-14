"use strict";

const Util = require('../../utils');

class BaseCache {
    /** 
    * Base Cache
    * @constructor
    */
    constructor() {
        /** @type {Room[] | User[] | Formats[]} */
        this.cache = new Util.Map();
    }
    /**
     * Create a new element in the cache
     * @param {String} id 
     * @param {any} arg 
     */
    create(id, arg) {
        if (this.has(id)) return false;
        this.cache.set(id, arg);
    }
    /**
     * Remove an element from the cache
     * @param {String} id 
     */
    remove(id) {
        if (!this.has(id)) return false;
        this.cache.remove(id);
    }
    /**
     * Check if a elment exists in the cache
     * @param {String} id 
     * @returns {Boolean} Returns a Boolean
     */
    has(id) {
        if (this.cache.has(id)) return false;
        return true;
    }
    /**
     * Get an element from the cache
     * @param {String} id 
     * @returns {(User|Room)} Return the data from the cache
     */
    get(id) {
        if (!this.has(id)) return false;
        return this.cache.get(id);
    }
    /**
     * Make an iteration of each data
     * @param {Function} callback 
     * @param {any} thisArg 
     * @returns {Function} Returns the function forEach of the cache
     */
    forEach(callback, thisArg) {
        return this.cache.forEach(callback, thisArg);
    }
}
module.exports = BaseCache;