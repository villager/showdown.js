declare global {
	namespace NodeJS {
		interface Global {
			Config: any;
			__version: {head: string, origin?: string, tree?: string};
			
		}
	}
};
