
import { RoomChannel } from "./room";
import { PMChannel } from "./pm";
import { toId } from "../../lib";
import { User } from "../users";
export class MessageHandler {
    client: Client;
    type: string;
    content: string;
    source: RoomChannel|PMChannel;
    user: User
	constructor(client: Client, options: AnyObject = {}) {
        this.client = client;
		this.type = options.type;
		this.content = options.content;
		if (this.type === 'PM') {
			this.source = new PMChannel(client, options);
		} else {
			this.source = new RoomChannel(client, options);
		}
		if (this.client.users.has(toId(options.user) as ID)) {
			this.user = this.client.users.get(toId(options.user) as ID);
		} else {
			this.user = options.user;
		}
	}
	reply(data: string) {
		return this.source.send(data);
	}
}