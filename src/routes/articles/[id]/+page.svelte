<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let article = null;

  const fakeArticles = [
    {
      id: '1',
      title: 'Le guide ultime de Svelte',
      image: 'https://placekitten.com/800/400',
      content: 'Svelte est un framework JavaScript moderne qui compile votre code en JS pur, pour des performances optimales.'
    },
    {
      id: '2',
      title: 'Comprendre le routing dans SvelteKit',
      image: 'https://placehold.co/800x400/EEE/31343C?text=SvelteKit',
      content: 'SvelteKit facilite la création d’apps modernes avec un routing basé sur les fichiers et une gestion des données simple.'
    }
  ];

  onMount(() => {
    const id = get(page).params.id;
    article = fakeArticles.find((a) => a.id === id);
  });
</script>

{#if article}
  <div class="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md dark:bg-zinc-900 dark:text-white">
    <h1 class="text-3xl font-bold mb-6 text-center">{article.title}</h1>
    <img
      src={article.image}
      alt="Image de l’article"
      class="rounded-xl mb-6 shadow-lg"
    />
    <p class="text-lg leading-relaxed">{article.content}</p>
    <div class="mt-8 text-center">
      <a href="/home" class="text-blue-600 hover:underline dark:text-blue-400">
        ← Retour à la liste des articles
      </a>
    </div>
  </div>
{:else}
  <p class="text-center mt-12 text-gray-500">Chargement ou article introuvable...</p>
{/if}
