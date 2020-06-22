'use strict';

const Utils = require('../utils');
const urlModule = require('url');
const util = require('util');
const BEMA = require('bema-utils');

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
		let url = urlModule.parse(this.getUrl);
		let requestOptions = {
			hostname: url.hostname,
			port: url.port,
			path: url.pathname,
			agent: false,
			data: '',
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
			requestOptions.data =
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
				'Content-Length': requestOptions.data.length,
			};
		}
		BEMA.Net(requestOptions.hostname)
			.request(requestOptions)
			.then(str => {
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
			})
			.catch(e => {
				this.client.emit('renameFailure', {
					reason: 'REQUEST',
					details: e,
				});
			});
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
