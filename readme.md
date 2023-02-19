# Showdown.js

![npm](https://nodei.co/npm/showdown.js.png?downloads=true&stars=true)

![Testing](https://github.com/villager/showdown.js/workflows/Testing/badge.svg)
[![Dependency Status](https://david-dm.org/villager/showdown.js.svg)](https://david-dm.org/villager/showdown.js)
[![devDependency Status](https://david-dm.org/villager/showdown.js/dev-status.svg)](https://david-dm.org/villager/showdown.js?type=dev)
[![style: prettier](https://img.shields.io/badge/style-prettier-ff69b4)](https://github.com/prettier/prettier)

## About

Showdown.js is a module that allows you to easily create a bot for Pokemon Showdown

## Instalation

```
    npm install showdown.js
```

## Example

```js
'use strict';
const Client = require('showdown.js').Client;

let client = new Client({
	name: 'yourbotname',
	pass: 'yourpassword',
	baseRooms: ['lobby'],
	port: 8000,
	host: 'sim.smogon.com',
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.source.send('Pong!');
	}
});
client.connect();
```