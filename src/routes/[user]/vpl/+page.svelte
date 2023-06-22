<script>

	import api from '$lib/api.js';

	import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
	import { writable, get } from 'svelte/store';
	import { cloneDeep, flatten } from 'lodash-es';

	import View from './containers/View.svelte'; // a view of nodes
	import Source from '$lib/ui/Source.svelte'; // a view of nodes
	import Message from '$lib/ui/Message.svelte'; // a view of nodes

	import Workspace from './containers/Workspace.svelte';
	import {bus} from './lib/stores.js';

	// if (import.meta.hot) {
 //   import.meta.hot.dispose(data => {
 //     console.log(`do cleanup!`);
 //   })
 //   import.meta.hot.accept(() => {
 //     console.log(`adjust side effects!`);
	// 	 // window.location = window.location.href;
 //   })
 // }


 const location = writable(1);

	class System {

		async root(){
			const result = (await api.vpl.root()).data.find(o=>o.kind=="node")?.data;
			return result;
		}

		async all(parent){
			const result = (await api.vpl.all(parent)).data.find( (o) => o.kind == "nodes" )?.data;
			return result;
		}

		async nodes(parent){
			// NOTE: a node is a vertex, but it also has inouts and outputs

			// GET SERIALIZED STRUCTURE FROM DATABASE call api.vpl.* functions from here...
			// HYDRATE with corresponding class, this will also add writables

			const result = (await api.vpl.all(parent)).data.find( (o) => o.kind == "dump" )?.data;

			return result;
		}
		async edges(parent){
			// GET SERIALIZED STRUCTURE FROM DATABASE call api.vpl.* functions from here...
			// HYDRATE with corresponding class, this will also add writables
			return [];
		}

		async anchors(id){
			// this should be alinked list: vertex.input = x-y-color-context...
			const input = [
				// NOTE: this function follows a linked list...
				// ...(await api.vpl.list(id, 'input')) .data.find( (o) => o.kind == "array" )?.data;
			];
			const output = [
				// ...(await api.vpl.list(id, 'output')) .data.find( (o) => o.kind == "array" )?.data;
			];



			// {id:'a',  source:'q', output:'z',  destination:'w', input:'b', color:"gold", instance:false }
			return {input, output};
		}




		create(){
			// call api.vpl.* functions from here...
		}

		destroy(){
			// call api.vpl.* functions from here...
		}

		disconnect(){
			// call api.vpl.* functions from here...
		}

		connect(){
			// call api.vpl.* functions from here...
		}
	}

	// pass this down into all components
	const system = new System();
	setContext('system', system);















	setContext('bus', bus);
	setContext('debug', true);


	// ELIMINARRRRRRRR THIS DOEN NOT BELONG HERE WORRKSPACE ISS NOW RESPONSIBLE FOR LOADING NODES
	const nodes = [

		{ id: 'q',   name: writable('Grand Parent'), left:writable(101),  top: writable(111),
			outputs:[
				{id:'z', name:'in', top:writable(0), left:writable(0)},
		  ],
			inputs:[
				{id:'x', name:'out',   top:writable(0), left:writable(0)},
				{id:'c', name:'color', top:writable(0), left:writable(0)}
		  ],
		},

		{ id: 'w',  name: writable('Parent 1'), left:writable(501), top: writable(222),
		  outputs:[
				{id:'v', name:'in', top:writable(0), left:writable(0)},
			],
			inputs:[
				{id:'b', name:'out',   top:writable(0), left:writable(0)},
			],
		},

 	];
	// ELIMINARRRRRRRR THIS DOEN NOT BELONG HERE WORRKSPACE ISS NOW RESPONSIBLE FOR LOADING NODES
  const edges = [
		{id:'a',  source:'q', output:'z',  destination:'w', input:'b', color:"gold", instance:false },

  ];

	function spice(){
		edges.forEach(edge => {
			if(edge.instance){
				// noop
			}else{
				edge.source = nodes.find(o=>o.id==edge.source);
				edge.destination = nodes.find(o=>o.id==edge.destination);
				edge.output = edge.source.outputs.find(o=>o.id==edge.output);
				edge.input = edge.destination.inputs.find(o=>o.id==edge.input);
				edge.color = writable(edge.color);
				edge.instance = true;
			}
		});
	}
	spice();


	const actions = {

		create(node){
			console.log(`Created node!!!!!!`, node);
			nodes.push(node);
			nodes.c++
		},
		destroy(id){
			const connections = edges.filter(o=>o.source.id==id||o.destination.id==id);

			connections.forEach(({id})=>edges.splice(edges.findIndex(o=>o.id==id), 1));
			const index = nodes.findIndex(o=>o.id==id)
			nodes.splice(index,1);
			nodes.c++;
			edges.c++;
		},
		disconnect(id){
			const index = edges.findIndex(o=>o.id==id)
			edges.splice(index,1);
			edges.c++;
		},
		connect(connection){
			console.log({connection:cloneDeep(connection)});
			edges.push(connection)
			edges.c++;
			spice();
		},
	};

	const stop = bus.subscribe(([name, parameters]) => {
		console.log({name, parameters});
		actions[name]?actions[name](parameters):0;
	});

	beforeUpdate(() => {
		console.info('beforeUpdate: the component is about to update');
	});

	onMount(async () => {
		const root = await system.root();
		$location = root.id;
	});

	onDestroy(() => {
		console.info('DESTROY!');
		stop()

	});

	afterUpdate(() => {
		console.info('afterUpdate: the component just updated');
	});

</script>

<svelte:head>
	<title>VPL!</title>
	<meta name="description" content="A Visual Programming Language" />
</svelte:head>


<div class="container-fluid p-5">
	<div class="row g-0">
		<div class="col g-0 border-end border-dark">
			<View location={writable(1)} scale={writable(1.5)}/>
		</div>
		<div class="col g-0">
			<Workspace {nodes} {edges} {location} scale={writable(0.2)}/>
		</div>
	</div>
	<div class="row border-top border-dark">
		<div class="col g-0">
			<Workspace {nodes} {edges} {location} scale={writable(.72)}/>
		</div>
	</div>
	<div class="row mb-5">
		<div class="col-3 text-info">
			<div class="p-2 rounded border border-dark" style="min-height: 50rem;">
			...
			</div>
		</div>
		<div class="col-9 text-info">
			<div class="p-2 rounded border border-dark" style="min-height: 50rem;">
			...
			</div>
		</div>
	</div>
</div>


<div class="container">
	<div class="row">
		<div class="col">
				<h2>Understanding the Root Node</h2>

				<Message title="Optimization" message="Root node is never rendered as an actual VPL node, because it is a placeholder (driver node to initialize  recursion)."/>

				{#await system.root()}
					<Message message="Waiting for root node..."/>
				{:then value}
					<Source language="json" value={JSON.stringify(value, null, 2)}/>
				{:catch error}
					<Message message="Something went wrong when loading the root node: {error.message}"/>
				{/await}

				<Message message="The main reason behind loading the root node, is to get it's ID, and set that as the initial VPL location. The location is now set to {$location}."/>

				<Message message="Optimization: To load all nodes that belong to root, we must scan for nodes with parent set to the id of the root."/>

				{#await system.all($location)}
					<Message message="Waiting for root node..."/>
				{:then value}
					<Source language="json" value={JSON.stringify(value, null, 2)}/>
				{:catch error}
					<Message message="Something went wrong when loading nodes: {error.message}"/>
				{/await}

				<Message title="Crazy Optimization!" message=".edges property is NOT FOR THE NODE!!! it is for it's children! For the nodes inside it!"/>

				<Message title="So, where are the edges?" message="If you need to load edges for your nodes, always look to the parent!"/>
		</div>
	</div>
</div>
