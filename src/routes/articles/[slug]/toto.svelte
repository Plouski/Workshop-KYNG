<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let article = null;

	const fakeArticles = [
		{
			id: '5',
			title: 'Iphone 15',
			image:
				'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink_FMT_WHH?wid=1280&hei=492&fmt=p-jpg&qlt=80&.v=UXp1U3VDY3IyR1hNdHZwdFdOLzg1V0tFK1lhSCtYSGRqMUdhR284NTN4OHY2WXBWQWdyLzNrNnpHemdWd1VyeDFRUjVZcnNucDN6ME84Sk5KdjNoWnBRcmhuV0xiN2owaDd6ZUdJRlYrRThQVGFCY1d2Mm1kVDh4VitUQTlVdk9UOTZ6YWdIMldrRGtERWFIcmlaL0hR&traceId=1',
			content: "L'iPhone 15, sorti le 22 septembre 2023."
		},
		{
			id: '6',
			title: 'Iphone 16 PRO',
			image:
				'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink_FMT_WHH?wid=1280&hei=492&fmt=p-jpg&qlt=80&.v=UXp1U3VDY3IyR1hNdHZwdFdOLzg1V0tFK1lhSCtYSGRqMUdhR284NTN4OHY2WXBWQWdyLzNrNnpHemdWd1VyeDFRUjVZcnNucDN6ME84Sk5KdjNoWnBRcmhuV0xiN2owaDd6ZUdJRlYrRThQVGFCY1d2Mm1kVDh4VitUQTlVdk9UOTZ6YWdIMldrRGtERWFIcmlaL0hR&traceId=1',
			content: "L'iPhone 16 Pro se distingue par son écran Super Retina XDR de 6,1 pouces."
		}
	];

	onMount(() => {
		const id = get(page).params.id;
		article = fakeArticles.find((a) => a.id === id);
	});
</script>

{#if article}
	<div
		class="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-6 shadow-md dark:bg-zinc-500 dark:text-white"
	>
		<h1 class="mb-6 text-center text-3xl font-bold">{article.title}</h1>
		<img src={article.image} alt="Image de l’article" class="mb-6 rounded-xl shadow-lg" />
		<p class="text-lg leading-relaxed">{article.content}</p>

		<div class="mt-8 flex items-center justify-between">
			<a href="/home" class="text-white-600 hover:underline dark:text-pink-900">
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
	<p class="mt-12 text-center text-gray-500">Chargement ou article introuvable...</p>
{/if}
