<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<section class="max-w-2xl mx-auto px-6 py-10 bg-white shadow-xl rounded-2xl">
	<h1 class="text-4xl font-bold text-gray-800 mb-6 text-center">Contactez-nous</h1>

	<p class="text-center text-gray-500 mb-8">Contactez-nous via ce formulaire.</p>

	<form method="POST" use:enhance class="space-y-6">
		<div class="flex flex-col">
			<label for="name" class="mb-1 text-sm font-medium text-gray-700">Nom</label>
			<input
				id="name"
				name="name"
				type="text"
				required
				class="rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
				placeholder="Jean Dupont"
			/>
		</div>

		<div class="flex flex-col">
			<label for="email" class="mb-1 text-sm font-medium text-gray-700">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				required
				class="rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
				placeholder="jean@example.com"
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
			/>
		</div>

		<div class="flex flex-col">
			<label for="message" class="mb-1 text-sm font-medium text-gray-700">Message</label>
			<textarea
				id="message"
				name="message"
				rows="5"
				required
				class="rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
				placeholder="Écrivez votre message ici..."
			></textarea>
		</div>

		<div class="flex justify-center">
			<button
				type="submit"
				class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
			>
				Envoyer
			</button>
		</div>
	</form>

	{#if form?.form.formStatus}
		<p class="mt-6 text-center font-medium text-sm">{form.form.formStatus}</p>
	{/if}
</section>