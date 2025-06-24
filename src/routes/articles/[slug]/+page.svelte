<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let article: any = null;
	let loading = true;

	onMount(async () => {
		const slug = get(page).params.slug;
		const url = `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=cover`;

		try {
			const res = await fetch(url);
			const data = await res.json();

			if (data && data.data && data.data.length > 0) {
				const a = data.data[0];

				// Pas de `attributes`, tout est déjà à la racine
				const imageUrl = a.cover?.formats?.medium?.url
					? `http://localhost:1337${a.cover.formats.medium.url}`
					: a.cover?.url
						? `http://localhost:1337${a.cover.url}`
						: '';

				article = {
					id: a.id,
					title: a.title ?? 'Sans titre',
					image: imageUrl,
					content: a.description ?? ''
				};
			} else {
				article = null;
			}
		} catch (error) {
			console.error('Erreur lors du fetch :', error);
			article = null;
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<p class="mt-10 text-center text-gray-500">Chargement...</p>
{:else if article}
	<div
		class="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-500 dark:text-white"
	>
		<h1 class="mb-6 text-center text-3xl font-bold">{article.title}</h1>
		<img src={article.image} alt="Image de l’article" class="mb-6 rounded-xl shadow-lg" />
		<p class="text-lg leading-relaxed">{article.content}</p>

		<div class="mt-8 flex items-center justify-between">
			<a href="/articles" class="text-white-600 hover:underline dark:text-pink-900">
				← Retour à la liste des articles
			</a>
			<button
				class="rounded bg-zinc-800 px-4 py-2 text-sm text-white transition hover:bg-pink-800"
				on:click={() => alert('Achat non implémenté')}
			>
				Acheter
			</button>
		</div>
	</div>
{:else}
	<p class="mt-10 text-center text-red-500">Article introuvable.</p>
{/if}
