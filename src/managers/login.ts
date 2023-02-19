import { toId, Net } from "../lib";
import * as urlModule from 'url';
import * as util from 'util';

export class LoginManager {
    client: Client;
    challenge: string;
    challengekeyid: string;
	constructor(client: Client) {
        this.client = client;
		this.challenge = '';
		this.challengekeyid = '';
	}
	get getUrl() {
		return util.format('https://%s/~~%s/action.php', 'play.pokemonshowdown.com', toId(this.client.id));
	}
	getLogin(nick: string, pass: string, callback: any) {
		let url = urlModule.parse(this.getUrl);
		let requestOptions: AnyObject = {
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
				toId(nick) +
				'&challengekeyid=' +
				this.challengekeyid +
				'&challenge=' +
				this.challenge;
		} else {
			requestOptions.data =
				'act=login&name=' +
				toId(nick) +
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
		Net(requestOptions.hostname)
			.request(requestOptions)
			.then((str: any) => {
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
				if ((str as AnyObject).actionsuccess) {
					str = (str as AnyObject).assertion;
				} else {
					this.client.emit('renameFailure', {
						reason: 'UNKNOW',
						details: JSON.stringify(str),
					});
					return;
				}
				if (callback) callback.call(this, str);
			})
			.catch((e: any) => {
				this.client.emit('renameFailure', {
					reason: 'REQUEST',
					details: e,
				});
			});
	}
	login(name: string, pass: string) {
		this.getLogin(name, pass, (token: string) => {
			if (token) {
				this.client.send('/trn ' + name + ',0,' + token);
				this.client.emit('logged', name);
			}
		});
	}
}
