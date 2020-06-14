class User {
    /**
     * Class for the bot as user
     * @param {Client} client 
     */
    constructor() {
        /** @type {string} */
        this.group = ' ';
        /** @type {Boolean} */
        this.idle = false;
        /** @type {string?} */
        this.status = '';
    }
    /** 
     * Gets the bot Id
     * @return {string}
    */
    get id() {
        return this.name;
    }
    /**
     * Update Bot's info
     * @param {AnyObject} data 
     * @return {void}
     */
    update(data) {
        if (data.group) this.group = data.group;
    }
    
}
module.exports = User;