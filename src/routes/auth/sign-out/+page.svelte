<script>
	import { goto } from '$app/navigation';
	import {SIGNOUT_SUCCESS, SIGNOUT_FAILURE} from '$lib/code.js';
  import Flash from '$lib/ui/Flash.svelte';
	import {user} from '$lib/stores/user.js';

	// import { env } from '$env/dynamic/public';
	// import humanizeDuration from 'humanize-duration';
 // <span class="fw-bold">{humanizeDuration(env.PUBLIC_SESSION_COOKIE_TIMEOUT*1000)}</span>

  export let data;

	if (data){
		if(data.code == SIGNOUT_SUCCESS){
			user.set({})
			//goto('/');
		}
	}

</script>

<svelte:head>
	<title>Sign In</title>
	<meta name="description" content="Sign In Form" />
</svelte:head>

<div class="container">

	{#if data?.flash}
		<Flash {...data.flash}/>
	{/if}

	{#if data?.code == SIGNOUT_SUCCESS}
		<div class="alert alert-secondary" role="alert">
		  <h4 class="alert-heading">Well Done!</h4>
			<p>Logging out and explicitly destroying your session cookie is an essential step in protecting your online security. Without this step, the session cookie will remain uneccesairly active for a short time after you leave the website.</p>
			<p>Depending on computers between you and this server cookies can be vulnerable to interception and thus session hijacking. Which is when an attacker is able to gain access to your session token and use it to impersonate you.</p>
			<p>By logging out and destroying the session cookie as soon as possible, you are ending the potential for session hijacking and thus eliminating the chances of someone using this technique to gain access to your accounts and data.</p>
		  <hr>
		  <p class="mb-0">It is always important to remember to log out and destroy the session cookie after you are finished using any website.</p>
		</div>
	{/if}

</div>
