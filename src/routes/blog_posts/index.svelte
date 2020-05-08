<script context="module">
  import BlogPosts, {preload} from "../../components/blog_posts/BlogPosts.svelte";

  const preloading = preload();
</script>

<style>
</style>

<svelte:head>
	<title>Blog Posts</title>
</svelte:head>

<section>
	{#await preloading}
		<p>Preloading blog posts....</p>
	{:then preloaded}
		<BlogPosts {...preloaded} />
	{:catch error}
		<p>Error preloading blog posts: {error}</p>
	{/await}
</section>