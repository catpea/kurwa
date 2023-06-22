<script>
	import { goto } from '$app/navigation';
	import { browser, building, dev, version } from '$app/environment';
	import {SIGN_IN_SUCCESS, SIGN_IN_FAILURE} from '$lib/code.js';
	import {user} from '$lib/stores/user.js';

  import Flash from '$lib/ui/Flash.svelte';
  import SignIn from '$lib/ui/auth/SignIn.svelte';
  import SignUp from '$lib/ui/auth/SignUp.svelte';

	export let data;
	export let form;

	if (browser){
		if (form){
			if(form.code == SIGN_IN_SUCCESS){
				console.log('form.user',form.user);

				user.set(form.user);
				//goto('/');
			}
		}
	}

</script>

<svelte:head>
	<title>Sign In</title>
	<meta name="description" content="Sign In Form" />
</svelte:head>


{#if form?.flash}
  <Flash {...form.flash}/>
{/if}

{#if ! form}
	<SignIn/>
{/if}

{#if form}
	{#if form.code == SIGN_IN_SUCCESS}
	Hello!
	{:else if form.code == SIGN_IN_FAILURE}
		<SignIn/>
	{/if}

{/if}


<pre><code>{JSON.stringify({form}, null, '  ')}</code></pre>
