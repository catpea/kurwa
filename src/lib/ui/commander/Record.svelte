<script>

  import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
  import { readable, writable, get } from 'svelte/store';


  export let node = {};
  export let selected;

  let {id, name, description, updated} = node;

  node.monitor.subscribe(value=>{
    id = node.id;
    name = node.name;
    description = node.description;
    updated = node.updated;
  })

</script>

<button type="button" class="list-group-item list-group-item-action" class:active={selected?.id==node.id} on:click={()=>{selected=node}}>
  <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1">{name}</h5>
    <small>...</small>
  </div>
  {#if description}<p class="mb-1">{description}</p>{/if}
  <small>id:{id}</small>
</button>
