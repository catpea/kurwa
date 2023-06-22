<script>
  import {startCase, camelCase, isEmpty, flatten} from 'lodash-es';

  import { invalidateAll, goto } from '$app/navigation';
  import { applyAction, deserialize } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

  import * as validators from '$lib/validators.js';

	export let category;
	export let action;

	export let schema;
  let input = [];

	const dispatch = createEventDispatcher();

  async function handleSubmit(event) {

    const payload = { category, action, input };

    console.log({payload});
    dispatch('request', payload)

    const response = await fetch(this.action, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    const result = deserialize(await response.text());
    console.log({result});
    dispatch('result', result)
  }

  console.log(validators);
  console.log( flatten([ 'Alphanumeric' ]).map(name=>validators[name]) );
  console.log( flatten([ 'Alphanumeric' ]).map(name=>validators[name]).every(v=>{
    const result = v( "abc");
    console.log(v, result);

    return result;
}) );


</script>


<form method="POST" action="?/api" on:submit|preventDefault={handleSubmit}>
  {#each schema as field, index}

    {#if field.control == 'string'}
      <div class="form-floating mb-3">
        <input type="string" class="form-control" class:is-valid={flatten([field.validator]) .map(name=>validators[name]) .every(validator=>validator(input[index]||"", field)) } class:is-invalid={!flatten([field.validator]) .map(name=>validators[name]) .every(validator=>validator(input[index]||"", field)) }  id="floatingInput" name={field.name} placeholder={field.name} bind:value={input[index]}>
        <label for="floatingInput">{startCase(field.name)}{#if field.required}<small class=" text-warning ms-1"><i class="bi bi-asterisk" title="Required!"></i></small>{/if}</label>
      </div>

    {:else if field.control == 'password'}
      <div class="form-floating mb-3">
        <input type="password" class="form-control" class:is-valid={flatten([field.validator]) .map(name=>validators[name]) .every(validator=>validator(input[index]||"", field)) } class:is-invalid={!flatten([field.validator]) .map(name=>validators[name]) .every(validator=>validator(input[index]||"", field)) }  id="floatingInput" name={field.name} placeholder={field.name} bind:value={input[index]}>
        <label for="floatingInput">{startCase(field.name)}{#if field.required}<small class=" text-warning ms-1"><i class="bi bi-asterisk" title="Required!"></i></small>{/if}</label>
      </div>
    {:else}
      <div class="form-floating mb-3">
        <input type="string" class="form-control" class:is-valid={flatten([field.validator]) .map(name=>validators[name]) .every(validator=>validator(input[index]||"", field)) } class:is-invalid={!flatten([field.validator]) .map(name=>validators[name]) .every(validator=>validator(input[index]||"", field)) }  id="floatingInput" name={field.name} placeholder={field.name} bind:value={input[index]}>
        <label for="floatingInput">{startCase(field.name)}{#if field.required}<small class=" text-warning ms-1"><i class="bi bi-asterisk" title="Required!"></i></small>{/if}</label>
        <!-- {flatten([field.validator]).join()} -- {flatten([field.validator]) .map(name=>validators[name]) .every(validator=>validator(input[index]||"", field)) } -->
      </div>
    {/if}
  {/each}
  <button type="submit" class="btn btn-outline-primary"><i class="bi bi-play-circle-fill"></i> Execute {category}.{camelCase(action)}</button>
  <hr>
  <small class=" text-warning ms-1"><i class="bi bi-asterisk" title="Required!"></i></small> Denotes required fields.
</form>

  <hr>
  {JSON.stringify(input)}
