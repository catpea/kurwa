<script>
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
  export let label;
  let enabled = false;

  function execute(){
    if(enabled){
      dispatch('click', true);
      enabled = false;
    }
  }

</script>

<div class="input-group input-group-sm mb-3">
  <div class="input-group-text transition-border" class:border-danger={enabled} class:border-secondary={!enabled}>
    <input role="switch" class="form-check-input mt-0" type="checkbox" title="check to confirm" bind:checked={enabled}>
  </div>
  <button class="btn transition-color transition-border" disabled={!enabled} class:btn-outline-danger={enabled} class:btn-outline-secondary={!enabled} type="button" on:click={execute}>{label}</button>
</div>
