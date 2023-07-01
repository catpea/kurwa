<script>

  import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
  import { readable, writable, get } from 'svelte/store';

  import Record from '$lib/ui/commander/Record.svelte';
  import Editor from '$lib/ui/commander/Editor.svelte';

  const system = getContext('system');
  const records = system.records;
  // $: console.log('records changed!', $records);

  let selected;

</script>

<div class="container-fluid p-5">
  <div class="row">
    <div class="col text-end p-4">
      <button type="button" class="btn btn-secondary" on:click={()=>system.all()}>Refresh</button>
    </div>
  </div>

  <div class="row g-0">
    <div class="col-4 col-xl-3 g-0">
      <div class="list-group">
        {#each Object.entries($records) as [id, node] (id)}
          <Record bind:selected {node}/>
        {/each}
      </div>
    </div>

    <div class="col-8 col-xl-9 g-0">
      {#if selected}
        {#key selected}
          <Editor {selected}/>
        {/key}
      {/if}
    </div>

  </div>

</div>
