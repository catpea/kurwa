<script>
	import {isEmpty} from 'lodash-es';
	import {page} from '$app/stores';
	import {user} from '$lib/stores/user.js';
	async function dropdown(node){
		const { Dropdown } = await import('bootstrap/dist/js/bootstrap.esm.min.js');
		const dropdown = new Dropdown(node);
	}
	$: locator = $page?.route?.id || "";
</script>
<nav class="navbar navbar-expand-lg fixed-bottom bg-body-tertiary shadow ">
  <div class="container-fluid">
    <a class="navbar-brand text-warning" href="/"><i class="bi bi-bezier2"></i>Kurwa <sup class="text-danger">&beta;3</sup></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">


				<li class="nav-item border-start border-danger-subtle"> <a class="nav-link" class:active={locator.startsWith('/administrator')} href="/administrator"><i class="bi bi-house-gear"></i> Administrator</a> </li>
				<li class="nav-item"> <a class="nav-link" class:text-warning={locator.startsWith('/administrator/fw')} href="/administrator/fw"><i class="bi bi-fire"></i> Firewall</li>
				<li class="nav-item"> <a class="nav-link" class:text-warning={locator.startsWith('/administrator/api')} href="/administrator/api"><i class="bi bi-journal-code"></i> API Workbench</li>
				<li class="nav-item"> <a class="nav-link" class:text-warning={locator.startsWith('/administrator/gui')} href="/administrator/gui"><i class="bi bi-pip"></i> GUI Explorer</li>
				<li class="nav-item"> <a class="nav-link" class:text-warning={locator.startsWith('/administrator/tables')} href="/administrator/tables"><i class="bi bi-table"></i> Database Tables</li>
				<li class="nav-item"> <a class="nav-link" href="https://github.com/catpea/kurwa"><i class="bi bi-git"></i> Repository</li>

				<li class="nav-item border-start border-danger-subtle"> <a class="nav-link" class:text-warning={locator.startsWith('/[user]/kurwa')} href="/@meow/kurwa">3.0.0-dev</a> </li>
				<li class="nav-item"> <a class="nav-link" class:text-warning={locator.startsWith('/[user]/vpl')} href="/@meow/vpl">2.x.x-ref</a> </li>


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
	/* padding-top: 5rem; */
}
</style>
