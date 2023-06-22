<script>
	import {user} from '$lib/stores/user.js';
	import Header from './Header.svelte';

	import '@popperjs/core/dist/umd/popper.min.js';

	import '$lib/bootstrap.scss';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import './styles.css';

	export let data;

</script>

<div id="app" class="app" style="margin-bottom: 10rem;">
	<Header/>

	<main>
		<slot />
	</main>

</div>
