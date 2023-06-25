






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













<!-- <div class="container">
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
</div> -->



function autoGet(key, value){
  if(value?.subscribe){
    return get(value);
  }
  return value;
}




<!-- <div class="row mb-5">
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
</div> -->
