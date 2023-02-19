import {Channel} from './base';
import { toId } from '../../lib';
import { User } from '../users';
export class PMChannel extends Channel {
    user: User
	constructor(client: Client, options: AnyObject = {}) {
		super(client, options);
		if (this.client.users.has(toId(options.user) as ID)) {
			this.user = this.client.users.get(toId(options.user) as ID);
		} else {
			this.user = options.user;
		}
	}
	send(data: string) {
		super.send(`/msg ${toId(this.user)}, ${data}`);
	}
}