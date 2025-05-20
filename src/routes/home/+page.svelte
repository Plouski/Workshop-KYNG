<script>
  import { onMount } from 'svelte';

  /**
   * @type {any[]}
   */
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
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      const data = await res.json();

      collections = data.data.map(item => {
        // const attrs = item.attributes;
        console.log('teststststs : ', item.cover.url);

        const coverData = item.cover.url;
        const imageUrl = coverData ? 'http://localhost:1337' + coverData : '';
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl
        };
      });

    } catch (e) {
      console.error("Erreur :", e);
    } finally {
      loading = false;
    }
  });
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 class="text-3xl font-bold text-gray-900 mb-8">Afficher une liste de collection (card grid)</h1>

  {#if loading}
    <div class="flex justify-center items-center h-40">
      <div class="animate-pulse flex space-x-2">
        <div class="h-3 w-3 bg-blue-600 rounded-full"></div>
        <div class="h-3 w-3 bg-blue-600 rounded-full"></div>
        <div class="h-3 w-3 bg-blue-600 rounded-full"></div>
      </div>
      <p class="text-gray-500 ml-4">Chargement...</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each collections as collection}
        <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group">
          <div class="relative h-48 overflow-hidden">
            {#if collection.imageUrl}
              <img 
                src={collection.imageUrl} 
                alt={collection.title}
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            {:else}
              <div class="bg-gray-200 w-full h-full flex items-center justify-center">
                <span class="text-gray-400 text-lg">Image</span>
              </div>
            {/if}
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div class="p-5 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{collection.title}</h2>
            <p class="text-gray-600 flex-1">{collection.description}</p>
            <div class="mt-4 pt-3 border-t border-gray-100">
              <button class="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Voir la collection
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
