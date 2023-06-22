import { camelCase } from 'lodash-es';

import metadata from './metadata.json';

import getUser from './get-user/index.js';

class System {
	get metadata() {
		return metadata;
	}
	get actions() {
		return Object.getOwnPropertyNames( Reflect.getPrototypeOf( this ) ).filter(o=>!['has', 'metadata', 'constructor', 'actions'].includes(o));
	}
	has(action) {
		return this.actions.includes(camelCase(action));
	}
	get getUser() {
		return getUser;
	}
}

export {System};
