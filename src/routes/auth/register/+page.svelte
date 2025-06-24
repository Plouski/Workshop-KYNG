<script>
	let username = $state('');
	let email = $state('');
	let password = $state('');
	let error = $state('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch('http://localhost:1337/api/auth/local/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				email,
				password
			})
		});

		const data = await response.json();
		if (response.ok) {
			// Handle successful registration
			console.log('Registration successful:', data);
			localStorage.setItem('jwt', data.jwt);
			// Account created successfully
			alert('Account created successfully! Please log in.');
            //wait for 2 seconds before redirecting
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Redirect to login page
			window.location.href = '/auth/login';
		} else {
			// Handle error
			console.error('Registration failed:', data);
			error = data.error.message;
		}
	};
</script>

<main>
	<h1>Create an account</h1>
	<form method="POST" action="/" onsubmit={handleSubmit}>
		<div>
			<label for="username">Username</label>
			<input bind:value={username} type="text" id="username" name="username" required />
		</div>
		<div>
			<label for="email">Email</label>
			<input bind:value={email} type="email" id="email" name="email" required />
		</div>
		<div>
			<label for="password">Password</label>
			<input bind:value={password} type="password" id="password" name="password" required />
		</div>
		<button type="submit">Register</button>
		<p>Already have an account? <a href="/auth/login">Log in</a></p>
		{#if error}<p>{error}</p>{/if}
	</form>
</main>
