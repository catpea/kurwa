<script>

  import fsm from 'svelte-fsm';

  import { readable, writable, get } from 'svelte/store';

  import View from '$lib/ui/vpl/View.svelte'; // a view of nodes
  import Commander from '$lib/ui/commander/Commander.svelte'; // a view of nodes
  import Source from '$lib/ui/Source.svelte'; // a view of nodes
  import Message from '$lib/ui/Message.svelte'; // a view of nodes

  export let initial = 'editor';

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

</script>

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


<div class:d-none={$state !== 'editor'} class="container-fluid p-5">
	<div class="row g-0">
		<div class="col g-0 border-end border-dark">
			<View location={writable(1)} z={writable(1.5)}/>
		</div>
		<div class="col g-0">
			<View location={writable(1)} z={writable(0.2)}/>
		</div>
	</div>
	<div class="row border-top border-dark">
		<div class="col g-0">
			<View location={writable(1)} z={writable(0.69)}/>
		</div>
	</div>
</div>

<div class:d-none={$state !== 'commander'} class="container p-5">

  <div class="row">
    <div class="col text-end g-0">
      <button type="button" class="btn btn-secondary">Refresh</button>
    </div>
  </div>

	<div class="row g-0">
		<div class="col g-0">
			Records
		</div>
		<div class="col g-0">
			Record
      <button type="button" class="btn btn-warning">Apply</button>
		</div>
	</div>

</div>

<div class:d-none={$state !== 'configuration'} class="container-fluid p-5">
	<div class="row g-0">
		<div class="col g-0">
			pane
		</div>
		<div class="col g-0">
			pane
		</div>
		<div class="col g-0">
			pane
		</div>
	</div>
	<div class="row">
		<div class="col g-0">
			status
		</div>
	</div>
</div>
