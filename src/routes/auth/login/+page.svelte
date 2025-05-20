<script>
	let email = $state('');
	let password = $state('');
	let error = $state('');
	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch('http://localhost:1337/api/auth/local', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				identifier: email,
				password
			})
		});

		const data = await response.json();
		if (response.ok) {
			// Handle successful login
			console.log('Login successful:', data);
			localStorage.setItem('jwt', data.jwt);
			// Redirect or update UI as needed
            window.location.href = '/';
		} else {
			// Handle error
			console.error('Login failed:', data);
			error = data.error.message;
		}
	};
</script>

<main>
    <h1>Welcome back</h1>
    <p>Please enter your details</p>
    <form method="POST" action="/" onsubmit={handleSubmit}>
        <div>
            <label for="email">Email</label>
            <input bind:value={email} type="text" id="email" name="email" required />
        </div>
        <div>
            <label for="password">Password</label>
            <input bind:value={password} type="password" id="password" name="password" required />
        </div>
        <button type="submit">Log in</button>
        <p>Don't have an account? <a href="/auth/register">Register</a></p>
        {#if error}<p>{error}</p>{/if}
    </form>
</main>
