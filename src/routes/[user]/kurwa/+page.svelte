<script>

	import { onMount,onDestroy,  beforeUpdate,afterUpdate,  hasContext,getContext,setContext } from 'svelte';
	import { readable, writable, get } from 'svelte/store';
	import { cloneDeep, flatten } from 'lodash-es';

	import System from '$lib/kurwa/System.js';
	import Application from '$lib/kurwa/system/ui/Application.svelte';

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
	<title>Kurwa</title>
	<meta name="description" content="A Visual Programming Language" />
</svelte:head>

<Application initial="editor"/>
