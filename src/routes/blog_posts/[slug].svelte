<script context="module">
  import {client} from "../../db/graphql/client";
  import {getPostQuery} from "../../db/graphql/queries";
  
  /** 
   * Part of the sapper framework is the optional function preload
   * (similar to getInitialProps in Next.js or asyncData in Nuxt.js.)
   * here we want to query the data for the blog post page, currently using
   * the slug of the post since it was set to the post id, investigating
   * alternative ways to store post id in metadata instead as searching 
   * by a readable slug doesnt seem like it would scale
   */
  export async function preload({ params, query }) {
    return {
      cache: await client.query({
        query: getPostQuery,
        variables: {
          id: params.slug 
        }
      })
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { setClient, restore, query } from "svelte-apollo";
  export let cache;
  restore(client, getPostQuery, cache.data);
  onMount(() => {
    setClient(client);
  });
  let blogPost = query(client, { query: getPostQuery });
  // This is necessary to use the data outside an #await block
  // You cannot use svelte:head inside an #await block, so this is a workaround.
  let blogPostResponse = $blogPost;
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }
  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }
  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }
  .content :global(ul) {
    line-height: 1.5;
  }
  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
</style>

<svelte:head>
  <title>{blogPostResponse.data.blogPost.title}</title>
</svelte:head>

<!-- Some svelte await promise logic to handle returned data -->
{#await $blogPost}
  <p>Loading...</p>
{:then response}
  <h1>{response.data.blogPost.title}</h1>
  <div class="content">
    {@html response.data.blogPost.html}
  </div>
{:catch}
  <p>Could not load post right now. Try again later.</p>
{/await}