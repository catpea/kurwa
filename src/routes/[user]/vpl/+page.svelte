<script>

	import api from '$lib/api.js';

	import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
	import { readable, writable, get } from 'svelte/store';
	import { cloneDeep, flatten } from 'lodash-es';

	import Workspace from '$lib/ui/vpl/Workspace.svelte';

  const location = writable(1);

	const writableHandler = {
		get({node, keys}, prop, receiver) {
			if (keys.includes(prop)) {
				const keyword = '$';
				const surrogate = prop+keyword;
				const descriptor = node.descriptor(prop);
				const readonly = descriptor.set===undefined;
				const isSurrogate = prop.endsWith(keyword);
		    if(isSurrogate) return node[surrogate];
		 		const kind = readonly?readable:writable;
				if(readonly) console.log(`Node ${prop} is read only.`);
			  if(!node[surrogate]) node[surrogate] = kind( node[prop] );
				const handler = value => { console.log(`UN-THROTTLED: Updated ${prop} of node.id=${node.id} to:`, value); node[prop]=value; };
			  if(!readonly) node.destructible(node[surrogate].subscribe(handler));
		  	return node[surrogate];
	  	}
		}
	}

	class Node {

		#pojo = {};

		async load(pojo){
			//NOTE: you can upgrade edges from here to use a database but that would be inefficient (ie you can use await in this method)
			this.#pojo = pojo;
		}

		unsubscribe=[];

		destructible(trash){
			this.unsubscribe.push(trash);
		}
		destroy(){
    	this.unsubscribe.map(o=>o())
		}
		descriptor(property){
			return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), property);
		}

		get writable() {
			return new Proxy({node: this, keys:Object.keys(this.#pojo)}, writableHandler);
		}
		get state(){
			return cloneDeep(this.#pojo);
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

	class System {
		cache = {}
		async hydrate(pojo){
			const miss = this.cache[pojo.id]===undefined;
			if(miss){
				this.cache[pojo.id] = new Node();
				await this.cache[pojo.id].load(pojo);
			}
			return this.cache[pojo.id];
		}



		async root(){
			const node = (await api.vpl.root()).data.find(o=>o.kind=="node")?.data;
			return await this.hydrate(node);
		}
		async node(id){
			const node = (await api.vpl.node(id)).data.find(o=>o.kind=="node")?.data;
			return await this.hydrate(node);
		}

		async all(){
			const nodes = (await api.vpl.all()).data.find( (o) => o.kind == "nodes" )?.data;
			return await Promise.all( nodes.map(async node=>await this.hydrate(node)) );
		}
		async list(parent){
			const nodes = (await api.vpl.list(parent)).data.find( (o) => o.kind == "nodes" )?.data;
			return await Promise.all( nodes.map(async node=>await this.hydrate(node)) );
		}






		async destroy(id){
			const result = await api.vpl.destroy(id);
			console.log({result});

		}


		//
		// async nodes(parent){
		// 	// NOTE: a node is a vertex, but it also has inouts and outputs
		//
		// 	// GET SERIALIZED STRUCTURE FROM DATABASE call api.vpl.* functions from here...
		// 	// HYDRATE with corresponding class, this will also add writables
		//
		// 	const result = (await api.vpl.all(parent)).data.find( (o) => o.kind == "dump" )?.data;
		//
		// 	return result;
		// }
		// async edges(parent){
		// 	// GET SERIALIZED STRUCTURE FROM DATABASE call api.vpl.* functions from here...
		// 	// HYDRATE with corresponding class, this will also add writables
		// 	return [];
		// }
		//
		// async anchors(id){
		// 	// this should be alinked list: vertex.input = x-y-color-context...
		// 	const input = [
		// 		// NOTE: this function follows a linked list...
		// 		// ...(await api.vpl.list(id, 'input')) .data.find( (o) => o.kind == "array" )?.data;
		// 	];
		// 	const output = [
		// 		// ...(await api.vpl.list(id, 'output')) .data.find( (o) => o.kind == "array" )?.data;
		// 	];
		//
		//
		//
		// 	// {id:'a',  source:'q', output:'z',  destination:'w', input:'b', color:"gold", instance:false }
		// 	return {input, output};
		// }
		//
		//
		//
		//
		// create(){
		// 	// call api.vpl.* functions from here...
		// }
		//
		// destroy(){
		// 	// call api.vpl.* functions from here...
		// }
		//
		// disconnect(){
		// 	// call api.vpl.* functions from here...
		// }
		//
		// connect(){
		// 	// call api.vpl.* functions from here...
		// }
	}

	// pass this down into all components
	const system = new System();
	setContext('system', system);
	setContext('debug', false);







	//
	// // ELIMINARRRRRRRR THIS DOEN NOT BELONG HERE WORRKSPACE ISS NOW RESPONSIBLE FOR LOADING NODES
	// const nodes = [
	//
	// 	{ id: 'q',   name: writable('Grand Parent'), left:writable(101),  top: writable(111),
	// 		outputs:[
	// 			{id:'z', name:'in', top:writable(0), left:writable(0)},
	// 	  ],
	// 		inputs:[
	// 			{id:'x', name:'out',   top:writable(0), left:writable(0)},
	// 			{id:'c', name:'color', top:writable(0), left:writable(0)}
	// 	  ],
	// 	},
	//
	// 	{ id: 'w',  name: writable('Parent 1'), left:writable(501), top: writable(222),
	// 	  outputs:[
	// 			{id:'v', name:'in', top:writable(0), left:writable(0)},
	// 		],
	// 		inputs:[
	// 			{id:'b', name:'out',   top:writable(0), left:writable(0)},
	// 		],
	// 	},
	//
 	// ];
	// // ELIMINARRRRRRRR THIS DOEN NOT BELONG HERE WORRKSPACE ISS NOW RESPONSIBLE FOR LOADING NODES
  // const edges = [
	// 	{id:'a',  source:'q', output:'z',  destination:'w', input:'b', color:"gold", instance:false },
	//
  // ];
	//
	// function spice(){
	// 	edges.forEach(edge => {
	// 		if(edge.instance){
	// 			// noop
	// 		}else{
	// 			edge.source = nodes.find(o=>o.id==edge.source);
	// 			edge.destination = nodes.find(o=>o.id==edge.destination);
	// 			edge.output = edge.source.outputs.find(o=>o.id==edge.output);
	// 			edge.input = edge.destination.inputs.find(o=>o.id==edge.input);
	// 			edge.color = writable(edge.color);
	// 			edge.instance = true;
	// 		}
	// 	});
	// }
	// spice();
	//
	//
	// const actions = {
	//
	// 	create(node){
	// 		 //console.log(`Created node!!!!!!`, node);
	// 		nodes.push(node);
	// 		nodes.c++
	// 	},
	// 	destroy(id){
	// 		const connections = edges.filter(o=>o.source.id==id||o.destination.id==id);
	//
	// 		connections.forEach(({id})=>edges.splice(edges.findIndex(o=>o.id==id), 1));
	// 		const index = nodes.findIndex(o=>o.id==id)
	// 		nodes.splice(index,1);
	// 		nodes.c++;
	// 		edges.c++;
	// 	},
	// 	disconnect(id){
	// 		const index = edges.findIndex(o=>o.id==id)
	// 		edges.splice(index,1);
	// 		edges.c++;
	// 	},
	// 	connect(connection){
	// 		 //console.log({connection:cloneDeep(connection)});
	// 		edges.push(connection)
	// 		edges.c++;
	// 		spice();
	// 	},
	// };

	onMount(async () => {
		const {id} = await system.root();
		$location = id;
	});

	onDestroy(() => {
		console.info('DESTROY!');
	});

</script>

<svelte:head>
	<title>VPL!</title>
	<meta name="description" content="A Visual Programming Language" />
</svelte:head>

<Workspace initial="commander"/>
