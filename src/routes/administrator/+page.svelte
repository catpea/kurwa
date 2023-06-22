<script>


	export let data;
	let levels = 5;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<style>

</style>

<main>

<div class="container-fluid">
	<div class="row">
		<div class="col-2">

 



			<div class="card shadow mb-4">
			  <div class="card-header">
				<sup class="text-warning">level {levels--}<sup>
			  </div>
			  <ul class="list-group list-group-flush">
					<a href="" class="list-group-item list-group-item-action">Dashboard</a>
					<a href="" class="list-group-item list-group-item-action">Security</a>
					<a href="/administrator/fw" class="list-group-item list-group-item-action">Firewall</a>
			  </ul>
			</div>

			<div class="card shadow mb-4">
			  <div class="card-header">
				<sup class="text-warning">level {levels--}<sup>
			  </div>
			  <ul class="list-group list-group-flush">
					<a href="/administrator/api" class="list-group-item list-group-item-action">API Workbench</a>
					<a href="/administrator/gui" class="list-group-item list-group-item-action">GUI Explorer</a>
			  </ul>
			</div>

			<div class="card shadow mb-4">
			  <div class="card-header">
				Data Persistence <sup class="text-warning">level {levels--}<sup>
			  </div>
			  <ul class="list-group list-group-flush">
					<a href="/administrator/tables" class="list-group-item list-group-item-action">Tables</a>
			  </ul>
			</div>

			<div class="card shadow mb-4">
			  <div class="card-header">
				Data Organization <sup class="text-warning">level {levels--}<sup>
			  </div>
			  <ul class="list-group list-group-flush">
					<a href="" class="list-group-item list-group-item-action">Model</a>
					<a href="" class="list-group-item list-group-item-action">Migration</a>
					<a href="" class="list-group-item list-group-item-action">Seed</a>
			  </ul>
			</div>

		</div>
		<div class="col-9">
 		...
		</div>
	</div>
</div>

</main>
