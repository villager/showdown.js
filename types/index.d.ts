declare module 'ps.js' {
	import {EventEmitter} from 'events';
	export const version: string;
	type AnyObject = {
		[k: string]: any;
	};
	interface Options {
		port: number;
		host: string;
		reconnect?: AnyObject;
		id?: string;
		name: string;
		pass?: string;
	}
	export class BaseClient extends EventEmitter {
		constructor(options?: Options);
		public login(name: string, pass: string): void;
		public get id(): string;
	}
}
