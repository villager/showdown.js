"use strict";

const request = require('request');
const Utils = require('../utils');

class LoginManager {
    constructor(client) {
        this.challenge = '';
        this.challengekeyid = '';
        Object.defineProperty(this, 'client', {value: client});
    }
	login(name, pass) {
		let options;
				/**
		 * @param {Error} error
		 * @param {string} response
		 * @param {string} body
		 */
		const callback = (error, response, body) => {
			if (body === ';') return console.log('Failed to log in, name is registered', self.id);
			if (body.length < 50) return console.log('Failed to log in: ' + body, self.id);
			if (~body.indexOf('heavy load')) {
				console.log('Failed to log in - login server is under heavy load. Retrying in one minute.', self.id);
				setTimeout(function () {
					this.login(name, pass);
				}, 60 * 1000);
				return;
			}
			if (body.substr(0, 16) === '<!DOCTYPE html>') {
				console.log('Connection error 522 - retrying in one minute', this.client.id);
				setTimeout(function () {
					this.login(name, pass);
				}, 60 * 1000);
				return;
			}
			try {
				const json = JSON.parse(body.substr(1, body.length));
				if (json.actionsuccess) {
					this.client.socket.setNamed();
                    this.client.socket.send(`/trn ${name},0,${json['assertion']}`);
                    return true;
				} else {
                    throw Error(`Could not log in ${this.client.id}`);
				}
			} catch (e) {
				this.client.socket.setNamed();
                this.client.socket.send(`/trn ${name},0,${body}`);
                return true;
			}
		}

		if (pass !== '') {
			options = {
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				url: 'http://play.pokemonshowdown.com/action.php',
				body:
					'act=login&name=' +
					encodeURIComponent(name) +
					'&pass=' +
					encodeURIComponent(pass) +
					'&challengekeyid=' +
					this.challengekeyid +
					'&challenge=' +
					this.challenge,
			};
			request.post(options, callback);
		} else {
			options = {
				url:
					'http://play.pokemonshowdown.com/action.php?act=getassertion&userid=' +
					Utils.toId(name) +
					'&challengekeyid=' +
					this.challengekeyid +
					'&challenge=' +
					this.challenge,
			};
			request(options, callback);
		}
	}
}

module.exports = LoginManager;