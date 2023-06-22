<script>
	import {PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE} from '$lib/code.js';

  import Flash from '$lib/ui/Flash.svelte';
  import Forgot from '$lib/ui/auth/Forgot.svelte';

  export let data;
  export let form;
</script>

<svelte:head>
	<title>Sign In</title>
	<meta name="description" content="Sign In Form" />
</svelte:head>

{#if form?.flash}
  <Flash {...form.flash}/>
{/if}

{#if !form}
  <Forgot/>
{/if}

{#if form}
	{#if form.code == PASSWORD_RESET_SUCCESS}

	{:else if form.code == PASSWORD_RESET_FAILURE}
	  <Forgot/>
	{/if}
{/if}

<pre><code>{JSON.stringify({form}, null, '  ')}</code></pre>
