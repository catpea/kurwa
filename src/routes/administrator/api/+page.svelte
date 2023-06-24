<script>
	import JSON5 from 'json5'
	import {omit, pick, startCase, camelCase, isEmpty, first} from 'lodash-es';

	import * as validators from '$lib/validators.js';

	import Source from '$lib/ui/Source.svelte';
	import Flash from '$lib/ui/Flash.svelte';
	import Message from '$lib/ui/Message.svelte';
	import Form from './ui/Form.svelte';

	import { deserialize } from '$app/forms';

	export let data;
	 //console.log({data});


	let selectedComponent = {}; // @hmr:keep
	let recentRequest = {}
	let recentResponse = {}

	const apiCall = `
		const result = await Account(user).signOut();
		return result;
	`;

	const apiResponse = `
    return {
			code: 'TOO_BORK',
			flash: {},
		}
	`.replace(/( |\t)+/g,' ');

	function exampleJavaScript(selectedComponent){
		const args = [];
		for (const {name, variable} of selectedComponent.schema) {
			args.push(`${name}`)
		}

		let code = `import api from '$lib/api.js';\n`;
		code += `const result = await api.${selectedComponent.category}.${camelCase(selectedComponent.name)}(${args.join(', ')});`
		code += `const result = (await api.${selectedComponent.category}.${camelCase(selectedComponent.name)}(${args.join(', ')})).data.find(o=>o.kind=='...')?.data`
		// code += `  songs.set(last((await api.dance.getSongs(id)).data.filter(o=>o.kind='songs').map(o=>o.data)));`
		// code += `\nimport {execute} from '$lib/server/api/index.js';\nconst result = await execute({category:'${selectedComponent.category}', action:'${selectedComponent.name}', input:[${args.join(', ')}]});`
		// code += `\nconst result = await api(user).${selectedComponent.category}.${camelCase(selectedComponent.name)}(${args.join(', ')});`
		return code;
	}


	async function performTest({category, action, input}){
		const request = { category, action, input };
		recentRequest = request;
		const response = await fetch('?/api', { method: 'POST', body: JSON.stringify(request) });
		const result = deserialize(await response.text());
		recentResponse = result.data;
	}




</script>

<svelte:head>
	<title>API</title>
	<meta name="description" content="System API Overview" />
</svelte:head>

<div class="container-fluid">
	<div class="row">
		<div class="col-md-2">
			{#each data.reflect.categories as {name:category, icon} }
				<div class="card shadow mb-4">
				  <div class="card-header fw-bold">
				    <i class="bi bi-{icon} me-2"></i> API: {startCase(category)}
				  </div>
				  <ul class="list-group list-group-flush">
						{#each data.reflect.actions.filter(o=>o.category.name==category).map(o=>o.action) as component }
							{@const {name:action, icon} = component}
							{@const schema = first(data.reflect.schema.filter(o=>(o.category==category&&o.action==action))).data}
							{@const permissions = first(data.reflect.permissions.filter(o=>(o.category==category&&o.action==action))).data}
							{@const rules = first(data.reflect.rules.filter(o=>(o.category==category&&o.action==action))).data}
							{@const tests = first(data.reflect.tests.filter(o=>(o.category==category&&o.action==action))).data}
			  			<button type="button" class="list-group-item list-group-item-action" class:bg-dark-subtle={selectedComponent.action==action} on:click={()=>selectedComponent={category, action, ...component, schema, permissions, rules, tests}}><i class="bi bi-{icon} me-2" class:text-primary={selectedComponent.action==action}></i> {startCase(action)}</button>
						{:else}
							no data
						{/each}
				  </ul>
				</div>
			{:else}
				<Flash title="API System Warning" message="Library is empty." context="warning"/>
			{/each}
		</div>

		<div class="col-md-7">
			{#if !isEmpty(selectedComponent)}
				<div class="card mb-4">
					<div class="card-header text-truncate">
						 <nav aria-label="breadcrumb" class="d-inline-block">
							 <ol class="breadcrumb mb-0">
								 <li class="breadcrumb-item">{startCase(selectedComponent.category)}</li>
								 <li class="breadcrumb-item">{startCase(selectedComponent.action)}</li>
							 </ol>
						 </nav>
						 &middot; <span class="text-muted small">{selectedComponent.description}</span>
					</div>
					<div class="card-body border-bottom border-dark-subtle">
						<button type="button" class="btn btn-link float-end fs-5" on:click={()=>navigator.clipboard.writeText(exampleJavaScript(selectedComponent))}><i class="bi bi-clipboard-plus"></i></button>
						<h5 class="card-title"><Source value={exampleJavaScript(selectedComponent)}/></h5>
					</div>
				</div>
				<!-- <Source value={JSON.stringify(selectedComponent, null, 2)}/> -->
			{/if}

			<div class="row">

				<div class="col-md-6">
					{#if !isEmpty(selectedComponent)}
					  <div class="card mb-4">
							<div class="card-header">
							Invoke {selectedComponent.action}
							</div>
						  <div class="card-body">
								<Form category={selectedComponent.category} action={selectedComponent.action} schema={selectedComponent.schema} on:request={(event)=>recentRequest=event.detail} on:result={(event)=>recentResponse=event.detail.data}/>
						  </div>
					  </div>
					  <div class="card mb-4">
							<div class="card-header">
							Test {selectedComponent.action} Server Response
							</div>
						  <div class="card-body">
								 	{#each selectedComponent.tests as test}
										<button type="button" class="btn btn-outline-secondary btn-sm me-2 mb-2" on:click={()=>performTest({...pick(selectedComponent,['category', 'action']), ...pick(test,['input'])})}><i class="bi bi-hammer"></i> {startCase(test.name)}</button>
									{/each}
						  </div>
					  </div>
					{/if}
				</div>

				<div class="col-md-6">
					{#if !isEmpty(recentRequest)}
						<div class="card mb-4">
							<div class="card-header">
								 Raw Server Request
							</div>
						  <div class="card-body">
								<Source language="json" value={JSON.stringify(recentRequest, null, 2)}/>
							</div>
						</div>
					{/if}

					{#if !isEmpty(recentResponse)}
						<div class="card mb-4">
							<div class="card-header">
								 Raw Server Response
							</div>
						  <div class="card-body">
								<Source language="json" value={JSON.stringify(recentResponse, null, 2)}/>
							</div>
						</div>
					{/if}

					{#if !isEmpty(recentResponse)}
						{#each recentResponse as packet, i}

						{#if packet.kind == 'code'}
						<div class="alert alert-warning bg-text-warning bg-gradient" role="alert">
						  CODE: {packet.code}
						</div>

						{:else if packet.kind == 'flash'}
							<Flash {...packet}/>
						{:else if packet.kind == 'user'}
							<div class="card mb-4">
								<div class="card-body clearfix">
									<div class="float-start pe-2"><i class="bi bi-person-circle display-1"></i></div>
									<div class="float-start">
										<div class="fw-bold fs-3">{packet.username}</div>
										<div class="fw-bold ps-1 mb-2">{packet.email}</div>
										{#each Object.entries(omit( packet , ['kind', 'username','email'])) as [key, value], i}
											<div class="fw-light ps-1"><small class="text-muted me-1">{key}:</small> {value}</div>
										{/each}
									</div>
								</div>
							</div>
						{:else}
							<div class="card mb-4">
								<div class="card-header">
									 #{i}: {startCase(packet.kind)}
								</div>
							  <div class="card-body">
									<Source value={JSON.stringify(packet, null, 2)} language="JSON"/>
								</div>
							</div>
						{/if}

						{/each}
					{/if}
			  </div>
		  </div>
		</div>

		<div class="col-md-3">
			{#if !isEmpty(selectedComponent)}

			<div class="card mb-4">
				<div class="card-header">
				About {selectedComponent.action}
				</div>
				<div class="card-body">
					<p class="card-text">{selectedComponent.description}</p>
			  </div>
	    </div>

			<div class="card mb-4">
				<div class="card-header">
				{startCase(selectedComponent.action)} Permissions
				</div>
				<div class="card-body">
				{#if !isEmpty(selectedComponent.permissions)}
					<p class="card-text"><Source value={JSON5.stringify(selectedComponent.permissions, null, 2)}/></p>
				{:else}
					<Message context="warning" title="No Permission Information" message="The {selectedComponent.action} function does not demand any permissions."/>
				{/if}
			  </div>
	    </div>
			<div class="card mb-4">
				<div class="card-header">
				{startCase(selectedComponent.action)} Rules
				</div>
				<div class="card-body">
				{#if !isEmpty(selectedComponent.rules)}
					<p class="card-text"><Source value={JSON5.stringify(selectedComponent.rules, null, 2)}/></p>
				{:else}
					<Message context="warning" title="No Rule Information" message="The {selectedComponent.action} function does not specify any validation rules."/>
				{/if}
			  </div>
	    </div>

			<div class="card mb-4">
				<div class="card-header">
				{selectedComponent.action} Schema
				</div>
				<div class="card-body">
				{#if !isEmpty(selectedComponent.schema)}
					<p class="card-text"><Source value={JSON5.stringify(selectedComponent.schema, null, 2)}/></p>
				{:else}
					<Message context="warning" title="No Arguments" message="The {selectedComponent.action} function does not have any arguments."/>
				{/if}
			  </div>
	    </div>

		{/if}
		</div>
	</div>
</div>

<!-- <Source language="json" value={JSON.stringify(data.reflect, null, 2)}/> -->
