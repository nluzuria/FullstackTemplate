<script context="module">
  import {client} from "../../db/graphql/client";
  import {getPostsQuery} from "../../db/graphql/queries";

  export async function preload() {
      return {
          cache: await client.query({query: getPostsQuery})
      };
  }
</script>

<script>
  import {restore, query, setClient} from "svelte-apollo";
  import { onMount } from "svelte";

  export let cache;
  restore(client, getPostsQuery, cache.data);
  
  onMount(()=>{
    setClient(client);
  });

  let blogPosts = query(client, {query: getPostsQuery});
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<h1>Blog Posts</h1>

<ul>
  {#await $blogPosts}
    <li>Loading...</li>
  {:then result}
    {#each result.data.blogPosts as blogPost }
      <li> <!-- key={blogPost.id} onclick={(e) => {selected = blogPost.id} }> -->
	  	  <a rel="prefetch" href="blog_posts/{blogPost.id}">{blogPost.title}</a>
	    </li>
    {:else}
      <li>No blog posts found</li>
    {/each}
  {:catch error}
    <li>Error loading blog posts: {error}</li>
  {/await}
</ul>
