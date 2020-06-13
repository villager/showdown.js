
const SocketManager = require('./websocket/manager.js');
const {EventEmitter} = require('events');

const DEFAULT_SERVER = {
    port: 8000,
    host: "sim.smogon.com",
    id: "Showdown"
};

class BaseClient extends EventEmitter {
    constructor(options = {}) {
        if (!options) Object.assign(options, DEFAULT_SERVER);
        super();
        this.port = options.port;
        this.host = options.host;
        if (options.id) this._id = options.id;
        this.status = new StatusManager();
        this._login = new LoginManager();
        this.socket = new SocketManager(this);
    }
    async login(name, pass) {
        this._login(name, pass);
    }
    get id() {
        if (this._id) return this._id;
        return this.host;
    }
    incrementListeners() {
        const max = this.getMaxListeners();
        if (max !== 0) {
            this.setMaxListeners(max + 1);
        }
    }
    decrementListeners() {
        const max = this.getMaxListeners();
        if (max !== 0) {
            this.setMaxListeners(max - 1);
        }
    }
}

module.exports = BaseClient;