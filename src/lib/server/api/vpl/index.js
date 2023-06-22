import { camelCase } from 'lodash-es';

import metadata from './metadata.json';

import root from './root/index.js';
import all from './all/index.js';
import list from './list/index.js';
import create from './create/index.js';
import connect from './connect/index.js';
import destroy from './destroy/index.js';
import disconnect from './disconnect/index.js';
import change from './change/index.js';


class Vpl {
	get metadata() {
		return metadata;
	}
	get actions() {
		return Object.getOwnPropertyNames( Reflect.getPrototypeOf( this ) ).filter(o=>!['has', 'metadata', 'constructor', 'actions'].includes(o));
	}
	has(action) {
		return this.actions.includes(camelCase(action));
	}

	get root() {
		return root;
	}
	get all() {
		return all;
	}
	get list() {
		return list;
	}
	get create() {
		return create;
	}
	get destroy() {
		return destroy;
	}
	get connect() {
		return connect;
	}
	get disconnect() {
		return disconnect;
	}
	get change() {
		return change;
	}

}

export {Vpl};
