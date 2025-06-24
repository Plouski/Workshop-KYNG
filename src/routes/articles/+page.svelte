<script>
	import { onMount } from 'svelte';

	let collections = [];

	let loading = true;

	const API_URL = 'http://localhost:1337/api/articles?populate=cover';
	const API_TOKEN = '';

	onMount(async () => {
		try {
			const res = await fetch(API_URL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${API_TOKEN}`
				}
			});

			const data = await res.json();

			collections = data.data.map((item) => {
				// Accès direct sans `attributes`
				const imageUrl =
					item.cover?.formats?.medium?.url
						? 'http://localhost:1337' + item.cover.formats.medium.url
						: item.cover?.url
						? 'http://localhost:1337' + item.cover.url
						: '';

				return {
					id: item.id,
					slug: item.slug ?? '',
					title: item.title ?? 'Sans titre',
					description: item.description ?? '',
					imageUrl
				};
			});
		} catch (e) {
			console.error('Erreur :', e);
		} finally {
			loading = false;
		}
	});
</script>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">
		Afficher une liste de collection (card grid)
	</h1>

	{#if loading}
		<div class="flex h-40 items-center justify-center">
			<div class="flex animate-pulse space-x-2">
				<div class="h-3 w-3 rounded-full bg-blue-600"></div>
				<div class="h-3 w-3 rounded-full bg-blue-600"></div>
				<div class="h-3 w-3 rounded-full bg-blue-600"></div>
			</div>
			<p class="ml-4 text-gray-500">Chargement...</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each collections as collection}
				<div
					class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
				>
					<div class="relative h-48 overflow-hidden">
						{#if collection.imageUrl}
							<img
								src={collection.imageUrl}
								alt={collection.title}
								class="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						{:else}
							<div class="flex h-full w-full items-center justify-center bg-gray-200">
								<span class="text-lg text-gray-400">Image</span>
							</div>
						{/if}
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>
					</div>

					<div class="flex flex-1 flex-col p-5">
						<h2 class="mb-2 text-xl font-semibold text-gray-800">{collection.title}</h2>
						<p class="flex-1 text-gray-600">{collection.description}</p>
						<div class="mt-4 border-t border-gray-100 pt-3">
							<a
								href={`/articles/${collection.slug}`}
								class="px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
							>
								Voir la collection
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
