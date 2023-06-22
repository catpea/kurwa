<script>
	export let context = 'info';
	export let title = 'Heads Up!';
	export let message = '';
</script>

<div class="" role="alert">
  <div class="text-{context||'info'} fw-bold"><i class="bi bi-info-circle fs-3 me-2"></i> {title}</div>
  <p>{message}</p>
</div>
