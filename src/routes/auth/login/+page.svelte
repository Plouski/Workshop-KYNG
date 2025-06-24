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

<main class="main-container">
  <div class="left-panel">
    <form class="form-box" method="POST" action="/" onsubmit={handleSubmit}>
      <h1>Welcome back</h1>
      <p>Please enter your details.</p>
      <label for="email">Email</label>
      <input bind:value={email} type="email" id="email" name="email" placeholder="Enter your email" required />
      <label for="password">Password</label>
      <input bind:value={password} type="password" id="password" name="password" placeholder="********" required />
      <button type="submit">Sign in</button>
      <div class="signup-link">
        Don't have an account? <a href="/auth/register">Sign up</a>
      </div>
      {#if error}<p style="color: #e53e3e;">{error}</p>{/if}
    </form>
  </div>
  <div class="right-panel"></div>
</main>

<style>
.main-container {
    display: flex;
    min-height: 100vh;
}
.left-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7faf9;
}
.form-box {
    background: #fff;
    padding: 2.5rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    width: 100%;
    max-width: 350px;
}
.form-box h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}
.form-box p {
    color: #6b7280;
    margin-bottom: 1.5rem;
}
.form-box label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
}
.form-box input[type="email"],
.form-box input[type="password"] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    background: #f9fafb;
}
.form-box button {
    width: 100%;
    padding: 0.75rem;
    background: #4b5e4b;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: background 0.2s;
}
.form-box button:hover {
    background: #3a4a3a;
}

.form-box .signup-link {
    text-align: center;
    color: #6b7280;
    font-size: 0.95rem;
}
.form-box .signup-link a {
    color: #4b5e4b;
    text-decoration: none;
    font-weight: 500;
}
.form-box .signup-link a:hover {
    text-decoration: underline;
}
.right-panel {
    flex: 1;
    background: #d3dbd6;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>