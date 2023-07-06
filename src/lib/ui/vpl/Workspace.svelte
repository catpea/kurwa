<script>

  import fsm from 'svelte-fsm';

  import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
  import { readable, writable, get } from 'svelte/store';

  import View from '$lib/ui/vpl/View.svelte'; // a view of nodes
  import Commander from '$lib/ui/commander/Commander.svelte'; // a view of nodes
  import Configuration from '$lib/ui/vpl/Configuration.svelte'; // a view of nodes
  import Architecture from '$lib/ui/vpl/Architecture.svelte'; // a view of nodes
  import Source from '$lib/ui/Source.svelte'; // a view of nodes
  import Message from '$lib/ui/Message.svelte'; // a view of nodes

  export let initial = 'editor';

  const system = getContext('system');

  const tabs = [
    {id:'architecture', name: 'Architecture', command:'architect',},
    {id:'editor', name: 'Editor', command:'edit',},
    {id:'commander', name: 'Commander', command:'command',},
    {id:'configuration', name: 'Configuration', command:'configure',},
  ];

  const machine = fsm(initial, {
   editor: {},
   commander: {},
   configuration: {},
   '*': {
     architect: 'architecture',
     edit: 'editor',
     command: 'commander',
     configure: 'configuration',
   }
  });


  const parent = writable(); // this is the location currently being examined, this can change
  const state = writable(); // state of the location node

  $: relocate($parent); // when we change location, change state
  $: reconnect($state); // when state changes, reconnect all nodes

  let connections = [];

  async function relocate(){ // When parent changes set new state object
    if(!$parent) return console.log('relocate no parent');
    $state = (await $parent.view()).state; // .set the state; // update state to new parent
  }

  async function reconnect(){ // when parent is set, or location changed update connections.
    if(!$parent) return console.log('reconnect no parent');
    connections.map(o=>o())
    for (const edge of $parent.edges) {
      const subscription = edge.output.data.subscribe(v=>edge.input.data.set(v));
      connections.push( subscription );
    }
  }

  onMount(async () => {
    $parent = await system.root(); // .set the parent;
  });

  onDestroy(() => {
    connections.map(o=>o())
  });




</script>

{#if $parent}
  <div class="container-fluid mt-1">
  	<div class="row border-dark border-bottom g-0">
  		<div class="col">
  			<ul class="nav nav-tabs">
        {#each tabs as tab (tab.id)}
  			  <li class="nav-item">
  			    <button class="nav-link" on:click={()=>machine[tab.command]()} class:active={tab.id==$machine}>{tab.name}</button>
  			  </li>
        {/each}
  			</ul>
  		</div>
  	</div>
  </div>
  {#if $machine == 'editor'}
    <div class="container-fluid p-5">
    	<div class="row g-0">
    		<div class="col g-0 border-end border-dark">
    			<View {parent} z={writable(1.5)}/>
    		</div>
    		<div class="col g-0">
    			<View {parent} z={writable(0.2)}/>
    		</div>
    	</div>
    	<div class="row border-top border-dark">
    		<div class="col g-0">
    			<View {parent} z={writable(0.69)}/>
    		</div>
    	</div>
    	<div class="row border-top border-dark">
    		<div class="col g-0">
          <Commander {parent}/>
    		</div>
    	</div>
    </div>
  {:else if $machine == 'architecture'}
    <Architecture {parent}/>
  {:else if $machine == 'commander'}
    <Commander {parent}/>
  {:else if $machine == 'configuration'}
    <Configuration/>
  {/if}
{/if}
