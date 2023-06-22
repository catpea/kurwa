<script>
	import {isEmpty} from 'lodash-es';
	import {page} from '$app/stores';
	import {user} from '$lib/stores/user.js';

	async function dropdown(node){
		const { Dropdown } = await import('bootstrap/dist/js/bootstrap.esm.min.js');
		const dropdown = new Dropdown(node);
	}

	//console.log($page);
	$: locator = $page?.route?.id || "";

</script>

<nav class="navbar navbar-expand-lg fixed-top bg-body-tertiary shadow ">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">VPL <sup class="text-muted">dev</sup></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

				<li class="nav-item"> <a class="nav-link" class:active={locator.startsWith('/@meow/vpl')} href="/@meow/vpl">VPL <sup>app</sup></a> </li>
				<li class="nav-item border-start border-danger-subtle"> <a class="nav-link" class:active={locator.startsWith('/administrator')} href="/administrator">System Administrator</a> </li>
				<li class="nav-item"> <a class="nav-link" class:active={locator.startsWith('/administrator/fw')} href="/administrator/fw"><i class="bi bi-fire"></i> Firewall</li>
				<li class="nav-item"> <a class="nav-link" class:active={locator.startsWith('/administrator/api')} href="/administrator/api"><i class="bi bi-journal-code"></i> API Workbench</li>
				<li class="nav-item"> <a class="nav-link" class:active={locator.startsWith('/administrator/gui')} href="/administrator/gui"><i class="bi bi-pip"></i> GUI Explorer</li>
				<li class="nav-item"> <a class="nav-link" class:active={locator.startsWith('/administrator/tables')} href="/administrator/tables"><i class="bi bi-table"></i> Database Tables</li>



      </ul>

			{#if !isEmpty($user)}
				<a class="navbar-text text-decoration-none py-0" href="/{$user.username}/account">
				 	<div class="float-start pe-2"><i class="bi bi-person-circle fs-2"></i></div>
				 	<div class="float-start">
				 		<div class="fw-bold">{$user.name}</div>
						<div class="fw-light small">{$user.position}</div>
					</div>
		 		</a>
			{/if}

    </div>

  </div>
</nav>












<style>
:global(body) {
	padding-top: 5rem;
}
</style>
