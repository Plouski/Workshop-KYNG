<script lang="ts">
  let articles = [
    { id: '1', title: 'Article 1' },
    { id: '2', title: 'Article 2' },
    { id: '3', title: 'Article 3' }
  ];
</script>

<h1>Liste des articles</h1>

<ul>
  {#each articles as article}
    <li>
      <a href={`/articles/${article.id}`}>{article.title}</a>
    </li>
  {/each}
</ul>
