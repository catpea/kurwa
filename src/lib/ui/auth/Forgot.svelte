<script>
	export let action = '/auth/forgot';
</script>

<div class="card">
  <div class="card-body">
    <form method="POST" {action}>
        <h1 class="h3 mb-3 fw-normal vw-25">Forgot Password</h1>
				<div class="form-floating mb-2">
          <input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary mb-3" type="submit">Reset Password &raquo;</button>
    </form>
  </div>
</div>
