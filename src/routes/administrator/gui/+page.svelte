<script>
	import JSON5 from 'json5'
	import {camelCase, startCase, isEmpty, isBoolean, isNumber, isString, cloneDeep, flatten} from 'lodash-es';
	import * as validators from '$lib/validators.js';

	import Flash from '$lib/ui/Flash.svelte';
	import flashSchema from '$lib/ui/Flash.schema.js';

	import Source from '$lib/ui/Source.svelte';
	import sourceSchema from '$lib/ui/Source.schema.js';

 	import SignIn from '$lib/ui/auth/SignIn.svelte';
	import signInSchema from '$lib/ui/auth/SignIn.schema.js';

	import SignUp from '$lib/ui/auth/SignUp.svelte';
	import signUpSchema from '$lib/ui/auth/SignUp.schema.js';
	import Forgot from '$lib/ui/auth/Forgot.svelte';
	import forgotSchema from '$lib/ui/auth/Forgot.schema.js';

	// REMEMBER: THESE ARE COMPONENT STORIES

	const categories = [
		{
			name: 'Core',
			icon: 'box2-heart',
			library: '',
			components:[
				{
					name: 'Flash',
					icon: 'chat-square-text',
					component: Flash,
					schema: flashSchema(),

					states: [
						{
							name: 'initial',
							description: '',
							properties: {
								title: 'Initial Message',
								message: 'This is a no context message',
								context: undefined
							}
						},
						{
							name: 'info',
							description: '',
							properties: { title: 'Info Message', message: 'This is an info message', context: 'info' }
						},
						{
							name: 'success',
							description: '',
							properties: {
								title: 'Success Message',
								message: 'This is a success message',
								context: 'success'
							}
						},
						{
							name: 'warning',
							description: '',
							properties: {
								title: 'Warning Message',
								message: 'This is a warning message',
								context: 'warning'
							}
						},
						{
							name: 'danger',
							description: '',
							properties: {
								title: 'Danger Message',
								message: 'This is a danger message',
								context: 'danger'
							}
						}
					]
				},
				{
					name: 'Source',
					icon: 'code-slash',
					component: Source,
					schema: sourceSchema(),
					states: [
						{ name: 'initial', title:'initial', description: '', properties: {language:"javascript", value:"//NOTE: this is just a comment."} },
						{ name: 'javascript-console-log', title:'JavaScript  //console.log', description: '', properties: {language:"javascript", value: " //console.log('Hello World');" } },
						{ name: 'javascript-function', title:'JavaScript function(){}', description: '', properties: {language:"javascript", value: 'function main(x){return x;}' } },
						{ name: 'json', title:'JSON Object', description: '', properties: { language:"json", value: '{"string":"Hello World", "number":42, "boolean":false}' } },
						{ name: 'xml', title:'XML Node', description: '', properties: { language:"xml", value: '<goodbye cruel="true">world</goodbye>' } },
					]
				}
			],
		},

		{
			name: 'Authentication',
			icon: 'bricks',
			library: 'auth',
			components:[
				{
					name: 'SignIn',
					icon: 'person-check',
					component: SignIn,
					schema: signInSchema(),
					states: [
						{ name: 'initial', description: '', properties: {} },
						{ name: 'fingerprint', description: '', properties: { fingerprint: true } },
						{ name: 'success', description: '', properties: {} },
						{ name: 'failure', description: '', properties: {} }
					]
				},
				{
					name: 'SignUp',
					icon: 'person-up',
					component: SignUp,
					schema: signUpSchema(),
					states: [
						{ name: 'initial', description: '', properties: {} },
						{ name: 'success', description: '', properties: {} },
						{ name: 'failure', description: '', properties: {} }
					]
				},
				{
					name: 'Forgot',
					icon: 'person-exclamation',
					component: Forgot,
					schema: forgotSchema(),
					states: [
						{ name: 'initial', description: '', properties: {} },
						{ name: 'success', description: '', properties: {} },
						{ name: 'failure', description: '', properties: {} }
					]
				}
			],
		},

	];





	let selectedCategory={};
	let selectedComponent={};
	let selectedComponentState={};
	let selectedComponentHtml=""

	function exampleJavaScript({library},{name, schema}){
		const args = [];
		const rargs = [];
		for (const {name, variable, required} of schema) {
			if(required) rargs.push(`${name}="..."`)
			args.push(`${name}="..."`)
		}
		// const code = `import Api from '$lib/server/api/index.js';\nconst result = await Api(user).${selectedFuncion.category}.${selectedFuncion.name}(${args.join(' ')});`
		const code0 = `<${'script'}>\n  import ${startCase(name).replace(/ /g,'')} from '$lib/ui/${library?`${library}/`:''}${startCase(name).replace(/ /g,'')}.svelte';\n\n</${'script'}>\n`
		const code1 = `<${startCase(name).replace(/ /g,'')} ${rargs.join(' ')}/>`
		const code2 = `<${startCase(name).replace(/ /g,'')} ${args.join(' ')}/>`

		if(code1==code2){
			return [code0, code1].join('\n');
		}else{
			return [code0, code1, code2].join('\n');
		}

	}

</script>

<svelte:head>
	<title>GUI</title>
	<meta name="description" content="Graphical User Interface Manger" />
</svelte:head>


<div class="container-fluid">
	<div class="row">
		<div class="col-2">
			{#each categories as category}

				<div class="card shadow mb-4">
				  <div class="card-header fw-bold">
						<i class="bi bi-{category.icon} me-2"></i> GUI: {startCase(category.name)}
				  </div>
				  <ul class="list-group list-group-flush">
						{#each category.components as component}
							<button type="button" class="list-group-item list-group-item-action" class:bg-dark-subtle={selectedComponent==component} on:click={()=>{selectedCategory=category;selectedComponent=component; selectedComponentState=component.states[0];}}><i class="bi bi-{component.icon} me-2" class:text-primary={selectedComponent==component}></i> {startCase(component.name)}</button>
						{/each}
				  </ul>
				</div>
	    {/each}
		</div>

		<div class="col-7">
			{#if !isEmpty(selectedComponent)}

				<div class="card mb-4">
					<div class="card-header">
						 <nav aria-label="breadcrumb">
							 <ol class="breadcrumb mb-0">
								 <li class="breadcrumb-item">{startCase(selectedCategory.name)}</li>
								 <li class="breadcrumb-item">{startCase(selectedComponent.name)}</li>
							 </ol>
						 </nav>
					</div>
					<div class="card-body border-bottom border-dark-subtle">
					<button type="button" class="btn btn-link float-end fs-5" on:click={()=>navigator.clipboard.writeText(exampleJavaScript(selectedCategory, selectedComponent))}><i class="bi bi-clipboard-plus"></i></button>
						<h5 class="card-title"><Source language="xml" value={exampleJavaScript(selectedCategory, selectedComponent)}/></h5>
					</div>
				</div>

				<div class="mb-4">
					<svelte:component this={selectedComponent.component} {...selectedComponentState?selectedComponentState.properties:{}}/>
				</div>

				{#if selectedComponent.schema}
				<div class="card">
					<table class="table table-sm table-borderded rounded">
					<thead>
				    <tr>
				      <th scope="col">Property</th>
				      <th scope="col">Description</th>
				      <th scope="col">Type</th>
				      <th scope="col">Value</th>
				      <th scope="col"></th>
				    </tr>
				  </thead>
				  <tbody>
							{#each selectedComponent.schema as field, i}
							{@const {name,description,variable,control,choice,validator,required} = field}
							{@const invalid = ((required)&&(!flatten([validator]).filter(i=>i).map(name=>validators[name]).every(validator=>validator(selectedComponentState.properties[name], field))))}
						    <tr>
						      <td>{name}</td>
									<td>{description}</td>
									<td>{variable}</td>
						      <td>

										{#if control == 'select'}
											<select class="form-select form-select-sm border-0 outline-none" bind:value={selectedComponentState.properties[name]}>
												{#each choice as {name, value}}
													<option value={value} selected={selectedComponentState.properties[name]==value} >{name}</option>
												{/each}
											</select>
										{:else if control == 'string'}
											<input type="text" class="form-control form-control-sm border-0 outline-none" placeholder="(string)" bind:value={selectedComponentState.properties[name]}>
										{:else if control == 'boolean'}
											<div class="form-check form-switch">
												<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" bind:checked={selectedComponentState.properties[name]}>
											</div>
										{:else}
											<div class="px-2">
												<i class="bi bi-lock float-end pe-1"></i> <small class="text-muted">{selectedComponentState?.properties[name]}</small>
											</div>
										{/if}


									</td>
									<td><div class="text-center">{#if invalid }<i class="bi bi-x-circle text-danger"></i>{:else}<i class="bi bi-check2-circle text-success"></i>{/if}</div></td>
						    </tr>
	 						{/each}
				  </tbody>
					</table>
					<Source value={JSON5.stringify(selectedComponentState.properties, null, 2)}/>
				</div>
				{/if}

			{/if}
		</div>
			<div class="col-3">
				{#if !isEmpty(selectedComponent)}


					<div class="card shadow mb-4">
					  <div class="card-header">
							{startCase(selectedComponent.name)} States
					  </div>
					  <ul class="list-group list-group-flush">
							{#each selectedComponent.states as state}
						  	<button type="button" class="list-group-item list-group-item-action small ps-4"
								  class:bg-dark-subtle={selectedComponentState.name==state.name}
								  on:click={()=>{selectedComponentState=state}}>
									  <i class="bi text-warning" class:bi-bookmark-star={(  selectedComponentState.name==state.name)} class:bi-bookmark={!(   selectedComponentState.name==state.name)}></i> {state.title||startCase(state.name)}
								</button>
							{/each}
					  </ul>
					</div>

					<div class="card shadow mb-4">
					  <div class="card-header">
							{startCase(selectedComponent.name)} Schema
					  </div>

					  <div class="card-body">
						{#if selectedComponent.schema}
							<Source value={JSON5.stringify(selectedComponent.schema, null, 2)}/>
						{:else}
							<div class="text-danger">
							<i class="bi bi-radioactive"></i> No Schema
							</div>
						{/if}
					  </div>

					</div>


				{/if}
			</div>
	</div>
</div>
