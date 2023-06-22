<script>
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
  export let validator=(input=>!!input);
  export let value;
  export let placeholder;
  export let label;
  $:valid = validator(value);

</script>

<div class="input-group input-group-sm mb-3">
  <input type="text" class="form-control" class:border-success={valid} class:border-secondary={!valid} {placeholder} bind:value={value}>
  <button disabled={!valid} class="btn transition-border transition-color" class:btn-outline-success={valid} class:btn-outline-secondary={!valid} type="button" id="button-addon1" on:click={()=>valid?dispatch('click', value):null}>{label}</button>
</div>
