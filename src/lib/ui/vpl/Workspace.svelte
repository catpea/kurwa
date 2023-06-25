<script>

  import fsm from 'svelte-fsm';

  import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
  import { readable, writable, get } from 'svelte/store';

  import View from '$lib/ui/vpl/View.svelte'; // a view of nodes
  import Commander from '$lib/ui/commander/Commander.svelte'; // a view of nodes
  import Configuration from '$lib/ui/vpl/Configuration.svelte'; // a view of nodes
  import Source from '$lib/ui/Source.svelte'; // a view of nodes
  import Message from '$lib/ui/Message.svelte'; // a view of nodes

  export let initial = 'editor';
  const location = writable(); // there is no default location, this is set by on mount where await is available;
  const system = getContext('system');

  const tabs = [
    {id:'editor', name: 'Editor', command:'edit',},
    {id:'commander', name: 'Commander', command:'command',},
    {id:'configuration', name: 'Configuration', command:'configure',},
  ];

  const state = fsm(initial, {
   editor: {},
   commander: {},
   configuration: {},
   '*': {
     edit: 'editor',
     command: 'commander',
     configure: 'configuration',
   }
  });

  onMount(async () => {
    const {id} = await system.root();
    $location = id;
  });

</script>

{#if $location}

  <div class="container-fluid">
  	<div class="row border-dark border-bottom g-0">
  		<div class="col">
  			<ul class="nav nav-tabs">
        {#each tabs as tab (tab.id)}
  			  <li class="nav-item">
  			    <button class="nav-link" on:click={()=>state[tab.command]()} class:active={tab.id==$state}>{tab.name}</button>
  			  </li>
        {/each}
  			</ul>
  		</div>
  	</div>
  </div>

  {#if $state == 'editor'}
    <div class="container-fluid p-5">
    	<div class="row g-0">
    		<div class="col g-0 border-end border-dark">
    			<View {location} z={writable(1.5)}/>
    		</div>
    		<div class="col g-0">
    			<View {location} z={writable(0.2)}/>
    		</div>
    	</div>
    	<div class="row border-top border-dark">
    		<div class="col g-0">
    			<View {location} z={writable(0.69)}/>
    		</div>
    	</div>
    	<div class="row border-top border-dark">
    		<div class="col g-0">
          <Commander {location}/>
    		</div>
    	</div>
    </div>
  {:else if $state == 'commander'}
    <Commander {location}/>
  {:else if $state == 'configuration'}
    <Configuration/>
  {/if}

{/if}
