<script context="module">
    import {client, BOOKS} from "./_books";

    export async function preload() {
        return {
            cache: await client.query({query: BOOKS})
        };
    }
</script>
<script>
    import {restore, query} from "svelte-apollo";

    export let cache;
    restore(client, BOOKS, cache.data);

    const books = query(client, {query: BOOKS});
</script>

<ul>
  {#await $books}
    <li>Loading...</li>
  {:then result}
    {#each result.data.books as book (book.id)}
      <li>{book.name}</li>
    {:else}
      <li>No books found</li>
    {/each}
  {:catch error}
    <li>Error loading books: {error}</li>
  {/await}
</ul>