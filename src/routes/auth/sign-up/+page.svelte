<script>
	import {USER_EXISTS, USER_SIGNED_UP} from '$lib/code.js';

  import Flash from '$lib/ui/Flash.svelte';
  import SignIn from '$lib/ui/auth/SignIn.svelte';
  import SignUp from '$lib/ui/auth/SignUp.svelte';

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
  <SignUp/>
{/if}

{#if form}
	{#if form.code == USER_EXISTS}
    <SignIn/>
	{:else if form.code == USER_SIGNED_UP}
    <SignIn/>
	{/if}
{/if}

<pre><code>{JSON.stringify({form}, null, '  ')}</code></pre>
