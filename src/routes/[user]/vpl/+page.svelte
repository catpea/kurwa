<script>

	import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
	import { readable, writable, get } from 'svelte/store';
	import { cloneDeep, flatten } from 'lodash-es';

	import System from '$lib/vpl/System.js';
	import Workspace from '$lib/ui/vpl/Workspace.svelte';

	const system = new System();

	setContext('system', system);

	onMount(() => {
		system.mount();
	});
	onDestroy(() => {
		system.destroy();
	});

</script>

<svelte:head>
	<title>VPL!</title>
	<meta name="description" content="A Visual Programming Language" />
</svelte:head>

<Workspace initial="commander"/>
