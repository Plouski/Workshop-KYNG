<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  let article: any = null;
  let loading = true;

  onMount(async () => {
    const id = get(page).params.id; // 'id' est en fait ton slug
    console.log('🔎 Slug de l’article depuis l’URL :', id);

    const url = `http://localhost:1337/api/articles?filters[slug][$eq]=${id}&populate=cover`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log('Réponse de Strapi :', data);

      if (data && data.data && data.data.length > 0) {
        const a = data.data[0]; // c’est un tableau
        article = {
          id: a.id,
          title: a.attributes.title,
          image: a.attributes.cover?.data?.attributes?.url
            ? `http://localhost:1337${a.attributes.cover.data.attributes.url}`
            : '',
          content: a.attributes.description,
        };
      } else {
        article = null;
      }
    } catch (error) {
      console.error('Erreur lors du fetch :', error);
    } finally {
      loading = false;
    }
  });
</script>
