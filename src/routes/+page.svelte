<script>
	import { onMount,onDestroy,  hasContext,getContext,setContext } from 'svelte';

	export let data;

	onMount(() => {
	});
	onDestroy(() => {
	});

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Featured Storefronts" />
</svelte:head>

<style>

</style>

<main>
	<div class="container-fluid">
		<div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 row-cols-lx-8 g-4">
			{#each data.featured as [storefront,title,text], i}
			  <div class="col">
			    <div class="card">
			      <div class="card-body">
			        <h5 class="card-title">{title}</h5>
			        <p class="card-text">{text}</p>
							<a href="@{storefront}" class="btn btn-outline-primary"><i class="bi bi-cart4"></i> {storefront}</a>
			      </div>
			    </div>
			  </div>
			{/each}
		</div>
	</div>
</main>
