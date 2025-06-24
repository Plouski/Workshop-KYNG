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
        const imageUrl =
          a.cover?.formats?.medium?.url
            ? `http://localhost:1337${a.cover.formats.medium.url}`
            : a.cover?.url
              ? `http://localhost:1337${a.cover.url}`
              : '';

        article = {
          id: a.id,
          title: a.title ?? 'Sans titre',
          image: imageUrl,
          content: a.description ?? '',
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
  <p class="text-center text-gray-500 mt-10">Chargement...</p>
{:else if article}
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">{article.title}</h1>
    {#if article.image}
      <img src={article.image} alt={article.title} class="mb-6 rounded-lg shadow-md w-full" />
    {/if}
    <div class="prose max-w-none">
      <p>{article.content}</p>
    </div>
  </div>
{:else}
  <p class="text-center text-red-500 mt-10">Article introuvable.</p>
{/if}