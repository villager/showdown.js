'use strict';

const Utils = require('../utils');
const https = require('https');
const urlModule = require('url');
const util = require('util');

class LoginManager {
	constructor(client) {
		this.challenge = '';
		this.challengekeyid = '';
		Object.defineProperty(this, 'client', {value: client});
	}
	get getUrl() {
		return util.format('https://%s/~~%s/action.php', 'play.pokemonshowdown.com', Utils.toId(this.client.id));
	}
	getLogin(nick, pass, callback) {
		let data = '';
		let url = urlModule.parse(this.getUrl);
		let requestOptions = {
			hostname: url.hostname,
			port: url.port,
			path: url.pathname,
			agent: false,
		};

		if (!pass) {
			requestOptions.method = 'GET';
			requestOptions.path +=
				'?act=getassertion&userid=' +
				Utils.toId(nick) +
				'&challengekeyid=' +
				this.challengekeyid +
				'&challenge=' +
				this.challenge;
		} else {
			requestOptions.method = 'POST';
			data =
				'act=login&name=' +
				Utils.toId(nick) +
				'&pass=' +
				pass +
				'&challengekeyid=' +
				this.challengekeyid +
				'&challenge=' +
				this.challenge;
			requestOptions.headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': data.length,
			};
		}

		let req = https.request(requestOptions, res => {
			res.setEncoding('utf8');
			let str = '';
			res.on('data', chunk => {
				str += chunk;
			});
			res.on('end', () => {
				console.log(str.includes('"actionsuccess": false'));
				if (str === ';') {
					this.client.emit('renameFailure', {
						reason: 'WRONG_PASSWORD',
					});
					return;
				}
				if (str.length < 50) {
					this.client.emit('renameFailure', {
						reason: 'SERVER_ERROR',
					});
					return;
				}
				if (str.includes('heavy load')) {
					this.client.emit('renameFailure', {
						reason: 'HEAVY_LOAD',
					});
					return;
				}
				str = JSON.parse(str.substr(1));
				if (str.actionsuccess) {
					str = str.assertion;
				} else {
					this.client.emit('renameFailure', {
						reason: 'UNKNOW',
						details: JSON.stringify(str),
					});
					return;
				}
				if (callback) callback.call(this, str);
			});
		});

		req.on('error', e => {
			this.client.emit('renameFailure', {
				reason: 'REQUEST',
				details: e,
			});
		});

		if (data) {
			req.write(data);
		}

		req.end();
	}
	login(name, pass) {
		this.getLogin(name, pass, token => {
			if (token) {
				this.client.socket.send('/trn ' + name + ',0,' + token);
				this.client.emit('logged', name);
			}
		});
	}
}

module.exports = LoginManager;
