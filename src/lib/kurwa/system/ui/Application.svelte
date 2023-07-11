<script>

  import fsm from 'svelte-fsm';

  import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
  import { readable, writable, get } from 'svelte/store';

  import View from '$lib/kurwa/system/ui/View.svelte'; // a view of nodes
  import Architecture from '$lib/kurwa/system/ui/Architecture.svelte'; // a view of nodes
  // import Commander from '$lib/ui/commander/Commander.svelte'; // a view of nodes
  // import Configuration from '$lib/ui/vpl/Configuration.svelte'; // a view of nodes
  // import Architecture from '$lib/ui/vpl/Architecture.svelte'; // a view of nodes
  import Source from '$lib/ui/Source.svelte'; // a view of nodes
  import Message from '$lib/ui/Message.svelte'; // a view of nodes
  const cleanup = [];
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

  // Properties
  const location1 = writable(null);
  const location2 = writable(null);
  const location3 = writable(null);

  // Async Boot
  onMount(async () => {

    const view1 = await system.view();
    const view2 = await system.view();
    const view3 = await system.view();

    cleanup.push(view1.destroy, view2.destroy, view3.destroy);

    view1.location(v=>$location1=v);
    view2.location(v=>$location2=v);
    view3.location(v=>$location3=v);

  });

  onDestroy(() => {
    cleanup.map(function(o){o=>o()})
  });

</script>

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
  			<View location={location1} height={480} scale={1.5}/>
  		</div>
  		<div class="col g-0">
  			<View location={location2} height={480} scale={0.2}/>
  		</div>
  	</div>
  	<div class="row border-top border-dark">
  		<div class="col g-0">
  			<View location={location3} height={480} scale={0.69}/>
  		</div>
  	</div>
  	<div class="row border-top border-dark">
  		<div class="col g-0">
        <!-- <Commander {parent}/> -->
  		</div>
  	</div>
  </div>
{:else if $machine == 'architecture'}
  <Architecture/>
{:else if $machine == 'commander'}
  <!-- <Commander {parent}/> -->
{:else if $machine == 'configuration'}
  <!-- <Configuration/> -->
{/if}
