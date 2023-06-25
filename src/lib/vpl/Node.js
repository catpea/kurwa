import { readable, writable, get } from 'svelte/store';
import { cloneDeep, flatten } from 'lodash-es';

const writableHandler = {
	get({node, keys, writables}, prop, receiver) {

		if (keys.includes(prop)) {
			const keyword = '$';
			const surrogate = prop+keyword;
			const descriptor = node.descriptor(prop);
			const readonly = descriptor.set===undefined;

			const isSurrogate = prop.endsWith(keyword);
	    if(isSurrogate) return node[surrogate];

			const isRegistered = writables[prop];
			if(isRegistered) return writables[prop];

	 		const kind = readonly?readable:writable;
			if(readonly) console.log(`Node ${prop} is read only.`);
		  if(!node[surrogate]) node[surrogate] = kind( node[prop] );
			const handler = value => { console.log(`UN-THROTTLED: Updated ${prop} of node.id=${node.id} to:`, value); node[prop]=value; };
		  if(!readonly) node.destructible({id:surrogate, destroy:node[surrogate].subscribe(handler) });
			writables[prop] = node[surrogate];
	  	return node[surrogate];
  	}

	}
}


export default class Node {
	monitor = writable(0);
	#pojo = {};
	#writables = {};

	async load(pojo){
		//NOTE: you can upgrade edges from here to use a database but that would be inefficient (ie you can use await in this method)
		this.#pojo = pojo;
		this.monitor.update(o=>o+1);
		Object.entries(this.#writables).forEach(([key,value])=>{
			console.log(`Announced changes to record=${this.#pojo.id}.${key}`);
			value.update?value.update(o=>o):null
		})
	}

	unsubscribe=[];

	destructible(trash){
		this.unsubscribe.push(trash);
	}
	destroy(){
  	this.unsubscribe.map(o=>o.destroy())
	}
	descriptor(property){
		return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), property);
	}

	get writable() {
		console.error('AUTOWRITABBLES DO NOT WORK, when they are destructed into the top of a component, but later updated elsewhere, they do not update in the component when used with $xxx syntax. WARNING: this means that data sent from the database doews not update the GUI.');
		return new Proxy({node: this, keys:Object.keys(this.#pojo), writables:this.#writables}, writableHandler);
	}
	get state(){
		return cloneDeep(this.#pojo);
	}
	update(){

	}

	//////////////////////////////////////////////////////////////////////////////////////

	get id(){
		return this.#pojo.id;
	}

	get owner(){
		return this.#pojo.owner
	}
	// set owner(value){
	// 	this.#pojo.owner = value;
	// }

	get parent(){
		return this.#pojo.parent
	}
	set parent(value){
		//TODO: verify
		this.#pojo.parent = value;
	}

	get created(){
		return new Date(this.#pojo.created);
	}
	set created(date){
		//TODO: verify
		this.#pojo.created = date.toISOString();
	}

	get updated(){
		return new Date(this.#pojo.updated);
	}
	set updated(date){
		//TODO: verify
		this.#pojo.updated = date.toISOString();
	}

	get revision(){
		return this.#pojo.revision
	}
	set revision(value){
		if(value <= this.#pojo.revision) throw new Error('Revision can only be incremented.');
		this.#pojo.revision = value;
	}

	get cache(){
		return JSON.parse(this.#pojo.cache||'{}');
	}
	set cache(value){
		//TODO: verify
		this.#pojo.cache = JSON.stringify(value);
	}

	get data(){
		return JSON.parse(this.#pojo.data||'{}');
	}
	set data(value){
		//TODO: verify
		this.#pojo.data = JSON.stringify(value);
	}

	get tags(){
		return new Set(JSON.parse(this.#pojo.tags||'[]'))
	}
	set tags(value){
		//TODO: verify
		this.#pojo.tags =  JSON.stringify(Array.from(value));
	}



	get name(){
		return this.#pojo.name;
	}
	set name(value){
		//TODO: verify
		this.#pojo.name = value;
	}



	get type(){
		return this.#pojo.type;
	}
	set type(value){
		//TODO: verify
		this.#pojo.type = value;
	}



	get description(){
		return this.#pojo.description;
	}
	set description(value){
		//TODO: verify
		this.#pojo.description = value;
	}



	get left(){
		return this.#pojo.left;
	}
	set left(value){
		//TODO: verify
		this.#pojo.left = value;
	}



	get top(){
		return this.#pojo.top;
	}
	set top(value){
		//TODO: verify
		this.#pojo.top = value;
	}



	get order(){
		return this.#pojo.order;
	}
	set order(value){
		//TODO: verify
		this.#pojo.order = value;
	}


	get input(){
		const data = JSON.parse(this.#pojo.input||'[]');
		data.forEach(o=>o.top=writable(o.top))
		data.forEach(o=>o.left=writable(o.left))
		console.log('RETURNING INPOUT', data);
			return data;
		}
		set input(value){
		const clean = cloneDeep(value);
		clean.forEach(o=>o.top=get(o.top))
		clean.forEach(o=>o.left=get(o.left))
			this.#pojo.input = JSON.stringify(clean);
		console.log('SET input', this.#pojo.input);
		}
	get output(){
		const data = JSON.parse(this.#pojo.output||'[]');
		data.forEach(o=>o.top=writable(o.top))
		data.forEach(o=>o.left=writable(o.left))
			return data;
		}
		set output(value){
		const clean = cloneDeep(value);
		clean.forEach(o=>o.top=get(o.top))
		clean.forEach(o=>o.left=get(o.left))
			this.#pojo.output = JSON.stringify(clean);
		console.log('SET output', this.#pojo.output);
		}




	get properties(){
			return JSON.parse(this.#pojo.properties||'{}');
		}
		set properties(value){
			//TODO: verify
			this.#pojo.properties = JSON.stringify(value);
		}


	get values(){
			return JSON.parse(this.#pojo.values||'{}');
		}
		set values(value){
			//TODO: verify
			this.#pojo.values = JSON.stringify(value);
		}







	get edges(){
		// {id:'a',  source:'q', output:'z',  destination:'w', input:'b', color:"gold", instance:false }
		// const data = JSON.parse(this.#pojo.edges||'[]');
		// data.forEach(edge => {

		// thse will need system.node()
		// 	edge.source = nodes.find(o=>o.id==edge.source);
		// 	edge.destination = nodes.find(o=>o.id==edge.destination);

		// anchor id
		// 	edge.output = edge.source.outputs.find(o=>o.id==edge.output);
		// 	edge.input = edge.destination.inputs.find(o=>o.id==edge.input);

		// 	edge.color = writable(edge.color);
		// }
			return [];
		}

		set edges(value){
			//TODO: verify
			this.#pojo.edges = JSON.stringify(value);
		}











	get extends(){
			return JSON.parse(this.#pojo.extends||'[]');
		}
		set extends(value){
			//TODO: verify
			this.#pojo.extends = JSON.stringify(value);
		}




	get validate(){
		return JSON.parse(this.#pojo.validate||'function validate(input){ return null; }');
	}
	set validate(fn){
		//TODO: verify
		this.#pojo.validate = fn.toString();
	}
	get program(){
		return JSON.parse(this.#pojo.program||'function program(input){ return null; }');
	}
	set program(fn){
		//TODO: verify
		this.#pojo.program = fn.toString();
	}
	get test(){
		return JSON.parse(this.#pojo.test||'function test(input){ return null; }');
	}
	set test(fn){
		//TODO: verify
		this.#pojo.test = fn.toString();
	}



}
