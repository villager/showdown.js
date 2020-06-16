# Showdown.js
![npm](https://nodei.co/npm/showdown.js.png?downloads=true&stars=true)

## About
Showdown.js is a module that allows you to easily create a bot for Pokemon Showdown
## Instalation
```
    npm install showdown.js
```
## Example
```
'use strict'
const Base = require('showdown.js').Client;
class Client extends Base {
	constructor(options) {
		super(options);
		this.on('message', msg => {
			if (msg.content === 'ping') {
				msg.send('Pong!');
			}
		});
	}
}
let client = new Client({
	name: 'youtbotname',
	pass: 'yourpassword',
	baseRooms: ['lobby'],
	port: 8000,
	host: 'sim.smogon.com',
});
client.connect();
```