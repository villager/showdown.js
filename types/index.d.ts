import {Map as BemaMap, Set as BemaSet} from 'bema-utils';
  
declare module 'showdown.js' {
	import {EventEmitter} from 'events';
	export const version: string;
	type AnyObject = {
		[k: string]: any;
	};
	interface Options {
		port: number,
		host: string,
		reconnect?: AnyObject,
		id?: string,
		name: string,
		pass?: string,
		[k: string]: any,
	}
	class BaseCache extends BemaMap {
		public create(id: string, arg: any): void;
		public remove(id: string): any;
		public has(id: string): boolean;
		public get(id: string): any;
	}
	class UserManager extends BaseCache {
		public remove(id: string): any;
		public create(data: any): void;
		public check(id: string): void;
		public update(id: string, data: AnyObject): void;
		public resolveName(id: string): string;
		public resolve(id: string): string;
	}
	class RoomManager extends BaseCache {
		constructor(client: Client);
		public remove(id: string): any;
		public create(data: any): void;
		public update(id: string, data: AnyObject): void;
		public resolveName(id: string): string;
		public resolve(id: string): string;
	}
	class AliasesManager extends BaseCache {
		public load(obj:AnyObject): void;
	}
	class FormatsManager extends BaseCache {
		constructor();
		public aliases: AliasesManager;
		public loadAliases(arg: AnyObject): any;
		public parseAliases(format: string): any;
		public update(formats: AnyObject): void;
	}
	class LoginManager {
		constructor();
		public challenge: string;
		public challengekeyid: string;
		public get getUrl(): string;
		private getLogin(nick: string, password: string, callback: any): void;
		public login(nick: string, password: string): void;
	}
	class BaseClient extends EventEmitter {
		constructor(options?: Options);
		public port: number;
		public host: string;
		public get id(): string;
		public _id?: string;
		[k: string]: any;
		private incrementListeners(): void;
		private decrementListeners(): void;
	}
	class ActivityManager {
		constructor(client: Client);
		private timer: TimerHandler;
		private _clear(): void;
	}
	class ConnectionManager {
		constructor(client: Client);
		private connecting: Boolean;
		private status: AnyObject;
		private closed: Boolean;
		private maxAttemps: number;
		private attemps: number;
		private activity: ActivityManager;
		private conntime: number;
		private _timer: TimerHandler;
		private time: number;
		private _clear(): void;
		private reconnect(): void;
	}
	class RoomListManager {
		constructor(client: Client);
		public isOfficial: typeof BemaSet;
		public isChat: typeof BemaSet;
		public join(rooms: string[] | string): void;
		public joinSection(section: typeof BemaSet): void;
		public check(): void;
	}
	class ChatManager {
		constructor(client: Client);
		private roomlist: RoomListManager;
		private receive(msg: string): void;
		private receiveMsg(msg: string): void;
		public parseLine(room: string, data: string, isInit: Boolean): void;
	}
	class SendManager {
		constructor(data: string | string[], msgMaxLines: number, sendFunc: Function, destroyHandler: Function);
		private data: string;
		private msgMaxLines: number;
		private sendFunc: Function;
		private status: string;
		private callback: any;
		private destroyHandler: Function;
		private err: any;
		private interval: any;
	}
	class SocketManager {
		constructor(client: Client);
		private connection: ConnectionManager;
		private chat: ChatManager;
		private socket: null | any;
		private sending: AnyObject;
		private nextSend: number;
		private maxLinesSend: number;
		private getSendId(): number;
		private setNamed(): void;
		private destroy(): void;
		private on(): void;
		private reconnect(): any;
		public send(data: string, room: string): void;
		private sendBase(data: string): SendManager;
		private reset(): void;
	}
	export class BaseUser {
		constructor();
		public avatar: string | number;
		public name: string;
		public group: string;
		public idle: Boolean;
		public status: string;
		public blockChallenges: Boolean;
		public blockPMs: Boolean;
		public get id(): string;
		public update(data: AnyObject): void;
		public toJSON(): any;
	}
 	export class Client extends BaseClient {
		constructor(options?: Options);
		private socket: SocketManager;
		public users: UserManager;
		public rooms: RoomManager;
		public formats: FormatsManager;
		public bot: BaseUser;
		private _login: LoginManager;
		public send(data: string, room: string): void;
		public connect() : any;
		public login(name: string, pass: string): void;
		public parseLine(callback: any): void;
	}
}
