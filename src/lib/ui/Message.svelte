<script>
	export let context = 'muted';
	export let title = 'Heads Up!';
	export let message = '';
</script>

<div class="mb-3 p-3 border border-{context} rounded w-50" role="alert">
  <div class="text-{context} fw-bold"><i class="bi bi-info-circle fs-3 me-2"></i> {title}</div>
  <p class="text-{context}">{message}</p>
</div>
