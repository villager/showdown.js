export class Channel {
    client: Client;
    content: string;
    type: string;
	constructor(client: Client, options: AnyObject = {}) {
        this.client = client;
		this.content = options.content;
		this.type = options.type;
	}
	send(data: string, room?: string) {
		return this.client.send(data, room);
	}
}