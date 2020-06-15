"use strict";

const Utils = require('../utils');

class User {
    /**
     * Class for the bot as user
     * @constructor
     */
    constructor() {
        /** @type {string | number} **/
        this.avatar = null;

        /** @type {string} */
        this.name = '';

        /** @type {string} */
        this.group = ' ';

        /** @type {Boolean} */
        this.idle = false;

        /** @type {string?} */
        this.status = '';

        /** @type {boolean} */
        this.blockChallenges = false;

        /** @type {boolean} */
        this.blockPMs = false;
    }
    /** 
     * Gets the bot Id
     * @return {string} Returns an string
    */
    get id() {
        return Utils.toId(this.name);
    }
    /**
     * Update Bot's info
     * @param {AnyObject} data 
     */
    update(data) {
        if (data.name) this.name = data.name;
        if (data.group) this.group = data.group;
    }

    /**
     * Convert local data into an object
     * @return {JSON} Retuns an object
     */
    toJSON() {
        let json = Object.create(null);
        for (const [key, value] of this) {
            if(typeof this[key] !== "function") {
                json[key] = value;
            }
        }
        return json;
    }
    
}
module.exports = User;