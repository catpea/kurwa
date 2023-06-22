<script>
	export let action = '/auth/sign-up';
</script>

<div class="card">
	<div class="card-body">
		<form method="POST" {action}>
				<h1 class="h3 mb-3 fw-normal vw-25">Sign Up</h1>
				<div class="form-floating mb-2">
					<input name="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
					<label for="floatingInput">Email address</label>
				</div>
				<div class="form-floating mb-2">
					<input name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
					<label for="floatingPassword">Password</label>
				</div>
				<div class="checkbox mb-3">
					<label>
						<input type="checkbox" value="remember"> Remember me
					</label>
				</div>
				<button class="w-100 btn btn-lg btn-primary mb-3" type="submit">Sign Up &raquo;</button>
		</form>
	</div>
</div>
