<script>
	export let data;
	const page = data.page;

	const getImageUrl = (image) => {
		if (!image || !image.url) return null;
		return 'http://localhost:1337' + image.url;
	};
</script>

<style>
	.page-container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 1rem;
	}

	h1 {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 2rem;
		color: #222;
	}

	.block-card {
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		padding: 1.5rem;
		margin-bottom: 2rem;
		transition: transform 0.2s ease;
	}

	.block-card:hover {
		transform: translateY(-4px);
	}

	.block-card h2 {
		margin: 0;
		font-size: 1.5rem;
		color: #333;
	}

	.block-card p {
		margin-top: 0.5rem;
		font-size: 1rem;
		color: #555;
	}

	.block-card img {
		margin-top: 1rem;
		width: 100%;
		max-height: 400px;
		object-fit: cover;
		border-radius: 10px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	}
</style>

<div class="page-container">
	{#if page}
		<h1>Titre du page : {page.title}</h1>

		{#if page.blocks && page.blocks.length > 0}
			{#each page.blocks as block}
				{#if block.__component === 'about.about'}
					<div class="block-card">
						<h2>Titre du block : {block.title}</h2>
						<p>Description du block :{block.description}</p>

						{#if block.image}
							<img src={getImageUrl(block.image)} alt={block.image.alternativeText || block.title} />
						{/if}
					</div>
				{/if}
			{/each}
		{:else}
			<p>Aucun bloc trouvé.</p>
		{/if}
	{:else}
		<p>Chargement...</p>
	{/if}
</div>
