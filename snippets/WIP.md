
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
