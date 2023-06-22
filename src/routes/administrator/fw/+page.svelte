<script>
  import JSON5 from 'json5'
  import {camelCase, startCase, isEmpty, isBoolean, isNumber, isString, cloneDeep, flatten} from 'lodash-es';

	import * as validators from '$lib/validators.js';

  import Source from '$lib/ui/Source.svelte';

	export let data; // { api, defense }
  $: console.dir(data.reflect);

  let selectedComponent = {} // @hmr:keep;
  let selectedCategory = {};

  let groupData = true;

  const categories = [
    {
      name: 'API Firewall Configuration',
      icon: 'fire',
      library: '',
      components:[
        { name: 'Group Permissions', data: data.reflect.permissions, unprotected:"unrestricted access, available to anonymous users"},
        { name: 'Action Validation Rules', data: data.reflect.rules, unprotected:"no packet integrity validation"},
      ]
    },


  ];

</script>

<svelte:head>
	<title>Title</title>
	<meta name="description" content="Description" />
</svelte:head>

<div class="container-fluid">
	<div class="row">

		<div class="col-12 col-md-3 col-lg-2">
      {#each categories as category}
        <div class="card shadow mb-4">
          <div class="card-header fw-bold">
            <i class="bi bi-{category.icon} me-2"></i> {startCase(category.name)}
          </div>
          <ul class="list-group list-group-flush">
            {#each category.components as component}
              <button type="button" class="list-group-item list-group-item-action" class:bg-dark-subtle={selectedComponent==component} on:click={()=>{selectedCategory=category;selectedComponent=component;}}><i class="bi bi-{component.icon} me-2" class:text-primary={selectedComponent==component}></i> {startCase(component.name)}</button>
            {/each}
          </ul>
        </div>
      {/each}
		</div>

		<div class="col-12 col-md-9 col-lg-7">
      {#if !isEmpty(selectedComponent)}
        <div class="card">

          <div class="px-2 text-end" role="button" on:click={()=>groupData=!groupData}><i class="bi fs-3" class:text-muted={!groupData} class:bi-toggle2-on={groupData} class:bi-toggle2-off={!groupData}></i></div>

          <table class="table table-sm table-borderded rounded">
          <thead>
            <tr>
            <th width="5%" scope="col"></th>
              <th width="15%" scope="col">Category</th>
              <th width="20%" scope="col">Action</th>
              <th width="100%" scope="col">Demands</th>
            </tr>
          </thead>
          <tbody>
            {#each selectedComponent.data as field, i}
              {#if groupData}
                <tr>
                  <td class="text-center">{#if field.data?.length}<i class="bi bi-key-fill text-warning fs-5"></i>{:else}<i class="bi bi-unlock-fill text-danger fs-5"></i>{/if}</td>
                  <td>{startCase(field.category)}</td>
                  <td>{startCase(field.action)}</td>
                  <td class:text-danger={field.data?.length==0} class:text-warning={field.data?.length>0} class:fw-bold={field.data?.length==0}>{field.data?.length?field.data.join(', '):selectedComponent.unprotected}</td>
                </tr>
              {:else}
                {#each field.data as entry, i}
                  <tr>
                    <td class="text-center">{#if field.data?.length}<i class="bi bi-key-fill text-warning fs-5"></i>{:else}<i class="bi bi-unlock-fill text-danger fs-5"></i>{/if}</td>
                    <td>{startCase(field.category)}</td>
                    <td>{startCase(field.action)}</td>
                    <td class="text-warning">{entry} <sup class="text-muted" class:d-none={field.data.length==1}>({i+1}/{field.data.length})<sup></td>
                  </tr>
                {:else}
                  <tr>
                    <td class="text-center"><i class="bi bi-unlock-fill text-danger fs-5"></i></td>
                    <td>{startCase(field.category)}</td>
                    <td>{startCase(field.action)}</td>
                    <td class="text-danger fw-bold">{selectedComponent.unprotected}</td>
                  </tr>
                {/each}
              {/if}
            {/each}
          </tbody>
          </table>
        </div>
        <!-- <Source language="json" value={JSON.stringify(selectedComponent, null, 2)}/> -->

      {/if}

      <!-- <Source language="json" value={JSON.stringify(data.reflect.permissions, null, 2)}/> -->
      <!-- <Source language="json" value={JSON.stringify(data.reflect.rules, null, 2)}/> -->
		</div>
		<div class="col-12 col-md-12 col-lg-3">
    Details
		</div>
	</div>
</div>
