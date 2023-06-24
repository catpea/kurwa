<script>
	import {isEmpty} from 'lodash-es';
	import Flash from '$lib/ui/Flash.svelte';
	import Source from '$lib/ui/Source.svelte';

	export let data;
	// //console.log({data});

</script>

<svelte:head>
	<title>Database Tables</title>
	<meta name="description" content="About this app" />
</svelte:head>

{#if data?.flash}
  <Flash {...data.flash}/>
{/if}

{#if !isEmpty(data.user)}
	<h6 class="display-6">Sessions: Signed-in User</h6>
	<div class="row">
		<div class="col">
			<div class="card">

			  <!-- <div class="card-header">
			    event.locals.user, data.user
			  </div> -->

			  <ul class="list-group list-group-flush">
			    {#each Object.entries(data.user) as [k,v]}
			    <li class="list-group-item"><span class="fw-bold text-white">{k}:</span> {v}</li>
			    {/each}
			  </ul>

			</div>
		</div>
	</div>
{/if}


{#if data?.accounts?.length}
<h6 class="display-6 mt-5">Account Table</h6>
<div class="row">
	<div class="col">
		<div class="card">

			<table class="table">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
						{#each Object.keys(data.accounts[0]) as label}
			      <th scope="col">{label}</th>
			 			{/each}
			    </tr>
			  </thead>
			  <tbody>
					{#each data.accounts as account, i}
			    <tr>
			      <th scope="row">{i+1}</th>
						{#each Object.values(account) as value}
			      	<td scope="col text-break">{value}</td>
			 			{/each}
			    </tr>
					{/each}
			  </tbody>
			</table>
		</div>
	</div>
</div>
{/if}

{#if data?.users?.length}
<h6 class="display-6 mt-5">User Table</h6>
<div class="row">
	<div class="col">
		<div class="card">

			<table class="table">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
						{#each Object.keys(data.users[0]) as label}
			      <th scope="col">{label}</th>
			 			{/each}
			    </tr>
			  </thead>
			  <tbody>
					{#each data.users as user, i}
			    <tr>
			      <th scope="row">{i+1}</th>
						{#each Object.values(user) as value}
			      	<td scope="col text-break">{value}</td>
			 			{/each}
			    </tr>
					{/each}
			  </tbody>
			</table>
		</div>
	</div>
</div>
{/if}


{#if data?.sessions?.length}
<h6 class="display-6 mt-5">Session Table</h6>
<div class="row">
	<div class="col">
		<div class="card">
			<table class="table">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
						{#each Object.keys(data.sessions[0]) as label}
			      <th scope="col">{label}</th>
			 			{/each}
			    </tr>
			  </thead>
			  <tbody>
					{#each data.sessions as user, i}
			    <tr>
			      <th scope="row">{i+1}</th>
						{#each Object.values(user) as value}
			      	<td scope="col">{value}</td>
			 			{/each}
			    </tr>
					{/each}
			  </tbody>
			</table>
		</div>
	</div>
</div>
{/if}


{#if data?.nodes?.length}
<h6 class="display-6 mt-5">Node Table</h6>
<div class="row">
	<div class="col">
		<div class="card">
			<table class="table">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
						{#each Object.keys(data.nodes[0]) as label}
			      <th scope="col">{label}</th>
			 			{/each}
			    </tr>
			  </thead>
			  <tbody>
					{#each data.nodes as user, i}
			    <tr>
			      <th scope="row">{i+1}</th>
						{#each Object.values(user) as value}
			      	<td scope="col">{value}</td>
			 			{/each}
			    </tr>
					{/each}
			  </tbody>
			</table>
		</div>
	</div>
</div>
{/if}



<Source language="json" value={JSON.stringify(data, null, '  ')}/>
<!--
<pre class="m-5 p-5">
{JSON.stringify(data, null, '  ')}
</pre> -->
