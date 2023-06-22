import { camelCase } from 'lodash-es';

import metadata from './metadata.json';

import signUp from './sign-up/index.js'
import signIn from './sign-in/index.js'
import signOut from './sign-out/index.js'
import resetPassword from './reset-password/index.js'

class Account {

	get metadata() {
		return metadata;
	}

	get actions() {
		return Object.getOwnPropertyNames( Reflect.getPrototypeOf( this ) ).filter(o=>!['has', 'metadata', 'constructor', 'actions'].includes(o));
	}
	has(action) {
		return this.actions.includes(camelCase(action));
	}

	get signUp() {
		return signUp;
	}
	get signIn() {
		return signIn;
	}
	get signOut() {
		return signOut;
	}
	get resetPassword() {
		return resetPassword;
	}

}

export {Account};
