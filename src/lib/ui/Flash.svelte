<script>
	export let context = 'info';
	export let title = 'Heads Up!';
	export let message = '';
</script>

<div class="alert alert-{context||'info'}" role="alert">
  <h4 class="alert-heading">{title}</h4>
  <p>{message}</p>
</div>
