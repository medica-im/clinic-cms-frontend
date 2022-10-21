<script lang="ts">
	import type { OpenGraph } from '$lib/interfaces/openGraph.interface';

	export let opengraph: OpenGraph;
	const {
		title = null,
		image_url = null,
		image_alt = null,
		description = null,
		twitter_description = null,
		username = null
	} = opengraph;
</script>

{#if title && twitter_description}
	<meta name="twitter:card" content="summary" />
	<meta property="og:type" content="website" />
{/if}
{#if title}
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
{/if}
{#if image_url}
	<meta property="og:image" content={image_url} />
	<meta name="twitter:image" content={image_url} />
	{#if image_alt}
		<meta name="twitter:image:alt" content={image_alt} />
	{/if}
{/if}
{#if description}
	<meta name="description" content={description} />
{/if}
{#if twitter_description}
	<meta property="og:description" content={twitter_description} />
	<meta name="twitter:description" content={twitter_description} />
{/if}
{#if username}
	<meta name="twitter:site" content={username} />
{/if}