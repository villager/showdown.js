const BaseClient = require("ps.js").Client;

let commands = {
    test: function(target, room, user) {
        this.sendReply("TEST");
    }
}

class Client extends BaseClient {
    constructor(options) {
        super(options);
        this.on("parseLine", (this, room, data, isInit, splitLine) => {
            if (splitLine[0] === 'error') {
                if (isInit) return;
                console.log(splitLine[1]);
            }
        });
    }
}

let client = new Client({
    name: Utils.generateRandom(),
    rooms: ['botdevelopment']
});
client.loadCommands(commands);