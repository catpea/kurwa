<script>

  // NOTE: this component requires a #key wrapper
  // NOTE: uses JSON5 for less parsing errors

  import JSON5 from 'json5';
  import {isEmpty, pick, omit, cloneDeep} from "lodash-es";


  import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
  import { readable, writable, get } from 'svelte/store';

  import Code from '$lib/ui/code/Code.svelte';
  import Source from '$lib/ui/Source.svelte';

  const system = getContext('system');
  export let selected;

  const {id, name, description, updated, input, output, edges} = selected.writable;

  let hasError = false;
  let hasChanges = 0;
  let editMe = toEditable(selected.state);
  let saveMe;
  $: saveMe = toSaveable(editMe); // whenever editMe changes (as it is bound) update the saveMe variable.

  onMount(async () => {
    // once mounted seed the raw variable
    const tmp = selected.state;

  });

  function toEditable(data){
    if(!data) return null;
    let response = data;
    // hydrate
    response.input =  JSON.parse(response.input);
    response.output = JSON.parse(response.output);




    response.edges =  JSON.parse(response.edges);
    response = JSON.stringify(response, null, 2);

    return response;
  }

  function toSaveable(data){
    if(!data) return null;
    try {
    let response = JSON5.parse(data);
    // DE-hydrate
    response.input =  JSON.stringify(response.input);
    response.output = JSON.stringify(response.output);
    response.edges =  JSON.stringify(response.edges);
    // changed only...
    const changed = {};
    const recent = selected.state;
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        const value = response[key];
        if(recent[key] === response[key]){
          // no change
        }else{
          changed[key] = value;
        }
      }
    }
    hasChanges = Object.keys(changed).length;
    hasError = null;
    response = JSON.stringify(changed, null, 2);
    return response;
  } catch(e){
    console.error(e)
    hasError = e.message;
    return null;
  }

  }

</script>



<div class="container">

  <div class="row">
    <div class="col">
    <Code bind:value={editMe}/>
    </div>
  </div>



  {#if hasError}
    <div class="row">
      <div class="col p-3">
        <div class="alert alert-light" role="alert">
          {$name} has errors: {hasError}
        </div>
      </div>
    </div>
  {/if}

  {#if !hasError&&hasChanges}
    <div class="row">
      <div class="col p-3">
        <div class="alert alert-light" role="alert">
          {$name}<sup>(id:{$id})</sup> has {hasChanges} change{hasChanges===1?'':'s'}
        </div>
        <Source language="json" value={saveMe}/>
      </div>
    </div>
    <div class="row">
      <div class="col text-end p-3 ">
        <button type="button" class="btn btn-secondary" class:disabled={hasError||hasChanges==0} on:click={()=>system.patch($id, saveMe)}>Save</button>
      </div>
    </div>
  {/if}

</div>
